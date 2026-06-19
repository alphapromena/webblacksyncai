import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Lead destination. Defaults to the BlackSync GoHighLevel Inbound Webhook so the
// forms work on any static host with no backend. Override per-environment with
// VITE_LEADS_WEBHOOK_URL (e.g. to point at Zapier/Make or a different CRM).
const DEFAULT_LEADS_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/0LKIRgZlaDDW51j4Uzd5/webhook-trigger/91b7c2b2-45fe-45cb-b90a-77d9a37a42a1";

const LEADS_WEBHOOK_URL =
  (import.meta.env.VITE_LEADS_WEBHOOK_URL as string | undefined) ||
  DEFAULT_LEADS_WEBHOOK_URL;

const LEAD_ENDPOINTS = ["/api/leads", "/api/enterprise-leads"];

// Normalize a lead payload so CRMs that expect first/last name + email + phone
// (like GoHighLevel "Create Contact") map cleanly regardless of which form sent it.
function normalizeLead(url: string, data: any) {
  const d = { ...(data ?? {}) };
  if (d.name && !d.firstName) {
    const parts = String(d.name).trim().split(/\s+/);
    d.firstName = parts[0];
    d.lastName = parts.slice(1).join(" ") || undefined;
  }
  d.fullName = d.name ?? [d.firstName, d.lastName].filter(Boolean).join(" ");
  d.source = "blacksync.ai";
  d.formType = url.includes("enterprise") ? "enterprise" : "lead";
  d.submittedAt = new Date().toISOString();
  return d;
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Route lead submissions to the CRM webhook when configured (static-host friendly).
  if (
    LEADS_WEBHOOK_URL &&
    method.toUpperCase() === "POST" &&
    LEAD_ENDPOINTS.includes(url)
  ) {
    // no-cors: webhook providers don't return CORS headers; the POST still
    // delivers (GHL parses the JSON body). We can't read the response, so we
    // treat delivery as success. (Content-Type is dropped in no-cors mode.)
    await fetch(LEADS_WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(normalizeLead(url, data)),
      mode: "no-cors",
      keepalive: true,
    });
    return new Response(null, { status: 200 });
  }

  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
