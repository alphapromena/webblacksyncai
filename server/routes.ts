import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertEnterpriseLeadSchema } from "@shared/schema";
import Stripe from "stripe";

const PRICE_MAP: Record<string, { amount: number; name: string }> = {
  solo: { amount: 9800, name: "Solo Agent - $98/mo" },
  team: { amount: 29600, name: "Team - $296/mo" },
};

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2025-04-30.basil" as Stripe.LatestApiVersion });
}

const TWENTY_BASE_URL = "https://blacksync.twenty.com/rest";

const INDUSTRY_LABELS: Record<string, string> = {
  "real-estate": "Real Estate",
  insurance: "Insurance",
  mortgage: "Mortgage & Lending",
  "mortgage-lending": "Mortgage & Lending",
  "property-management": "Property Management",
  "property-mgmt": "Property Management",
  healthcare: "Healthcare",
  "home-services": "Home Services",
  "auto-pc": "Auto & P&C",
  other: "Other",
};

function industryLabel(value: string | undefined | null): string {
  const v = (value ?? "").trim();
  if (!v) return "";
  return INDUSTRY_LABELS[v.toLowerCase()] ?? v;
}

function splitName(fullName: string | undefined | null): {
  firstName: string;
  lastName: string;
} {
  const trimmed = (fullName ?? "").trim();
  if (!trimmed) return { firstName: "", lastName: "" };
  const parts = trimmed.split(/\s+/);
  const firstName = parts.shift() ?? "";
  const lastName = parts.join(" ");
  return { firstName, lastName };
}

async function syncLeadToTwenty(input: {
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  company?: string | null;
  industry?: string | null;
  teamSize?: string | null;
  useCase?: string | null;
}): Promise<void> {
  const apiKey = process.env.TWENTY_API_KEY;
  if (!apiKey) {
    console.error("Twenty CRM sync skipped: TWENTY_API_KEY is not set");
    return;
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const firstName =
    input.firstName?.trim() || splitName(input.name).firstName || input.email;
  const lastName = input.lastName?.trim() || splitName(input.name).lastName || "";
  const phone = input.phone?.trim() || "";
  const company = input.company?.trim() || "";
  const industry = industryLabel(input.industry);
  const teamSize = input.teamSize?.trim() || "";
  const useCase = input.useCase?.trim() || "";

  try {
    const personBody: Record<string, unknown> = {
      name: { firstName, lastName },
      emails: { primaryEmail: input.email },
    };
    if (phone) {
      personBody.phones = { primaryPhoneNumber: phone };
    }
    const personRes = await fetch(`${TWENTY_BASE_URL}/people`, {
      method: "POST",
      headers,
      body: JSON.stringify(personBody),
    });
    if (!personRes.ok) {
      const body = await personRes.text();
      console.error(
        `Twenty CRM person create failed (${personRes.status}): ${body}`
      );
    }
  } catch (error) {
    console.error("Twenty CRM person create error:", error);
  }

  // Opportunity name: "[industry] - [company or email]"
  const opportunityLabel = company || input.email;
  const opportunityName = industry
    ? `${industry} - ${opportunityLabel}`
    : opportunityLabel;

  let opportunityId: string | null = null;
  try {
    const opportunityRes = await fetch(`${TWENTY_BASE_URL}/opportunities`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: opportunityName,
        stage: "NEW",
      }),
    });
    if (!opportunityRes.ok) {
      const body = await opportunityRes.text();
      console.error(
        `Twenty CRM opportunity create failed (${opportunityRes.status}): ${body}`
      );
    } else {
      const data = await opportunityRes.json();
      opportunityId =
        data?.data?.createOpportunity?.id ?? data?.data?.id ?? null;
    }
  } catch (error) {
    console.error("Twenty CRM opportunity create error:", error);
  }

  // Attach a note with the qualifying details (team size, use case, phone).
  const noteLines: string[] = [];
  if (input.name?.trim()) noteLines.push(`**Name:** ${input.name.trim()}`);
  noteLines.push(`**Email:** ${input.email}`);
  if (phone) noteLines.push(`**Phone:** ${phone}`);
  if (company) noteLines.push(`**Company:** ${company}`);
  if (industry) noteLines.push(`**Industry:** ${industry}`);
  if (teamSize) noteLines.push(`**Team size:** ${teamSize}`);
  if (useCase) noteLines.push(`**Wants to automate:** ${useCase}`);

  if (teamSize || useCase) {
    try {
      const markdown = noteLines.join("\n");
      const noteRes = await fetch(`${TWENTY_BASE_URL}/notes`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: `Lead details${industry ? ` — ${industry}` : ""}`,
          bodyV2: { markdown },
        }),
      });
      if (!noteRes.ok) {
        const body = await noteRes.text();
        console.error(`Twenty CRM note create failed (${noteRes.status}): ${body}`);
      } else if (opportunityId) {
        const noteData = await noteRes.json();
        const noteId = noteData?.data?.createNote?.id ?? noteData?.data?.id ?? null;
        if (noteId) {
          const linkRes = await fetch(`${TWENTY_BASE_URL}/noteTargets`, {
            method: "POST",
            headers,
            body: JSON.stringify({ noteId, targetOpportunityId: opportunityId }),
          });
          if (!linkRes.ok) {
            const body = await linkRes.text();
            console.error(
              `Twenty CRM note link failed (${linkRes.status}): ${body}`
            );
          }
        }
      }
    } catch (error) {
      console.error("Twenty CRM note create error:", error);
    }
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/leads", async (req, res) => {
    try {
      const parsed = insertLeadSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }
      const lead = await storage.createLead(parsed.data);
      void syncLeadToTwenty({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        industry: lead.industry,
        teamSize: lead.teamSize,
        useCase: lead.useCase,
      });
      return res.status(201).json(lead);
    } catch (error) {
      return res.status(500).json({ error: "Failed to save lead" });
    }
  });

  app.post("/api/enterprise-leads", async (req, res) => {
    try {
      const parsed = insertEnterpriseLeadSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }
      const lead = await storage.createEnterpriseLead(parsed.data);
      void syncLeadToTwenty({
        name: `${lead.firstName} ${lead.lastName}`.trim(),
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        industry: lead.industry,
        teamSize: lead.teamSize,
        useCase: lead.useCase,
      });
      return res.status(201).json(lead);
    } catch (error) {
      return res.status(500).json({ error: "Failed to save enterprise lead" });
    }
  });

  app.post("/api/checkout", async (req, res) => {
    try {
      const { priceId } = req.body;
      const plan = PRICE_MAP[priceId as string];
      if (!plan) {
        return res.status(400).json({ error: "Invalid plan" });
      }

      const stripe = getStripe();
      if (!stripe) {
        return res.status(503).json({ error: "Stripe is not configured yet" });
      }

      const origin = `${req.protocol}://${req.get("host")}`;
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price_data: {
              currency: "usd",
              recurring: { interval: "month" },
              product_data: { name: plan.name },
              unit_amount: plan.amount,
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/?checkout=success`,
        cancel_url: `${origin}/?checkout=cancel`,
        subscription_data: {
          trial_period_days: 7,
        },
      });

      return res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe checkout error:", error.message);
      return res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  return httpServer;
}
