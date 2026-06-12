import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Check, Zap, CreditCard, Puzzle } from "lucide-react";

const plans = [
  {
    name: "Solo Agent",
    price: "$98",
    originalPrice: "$125",
    discountNote: "Save $27/mo · Limited launch pricing",
    period: "/mo",
    tag: "Self-Serve",
    features: [
      "1 AI voice agent",
      "AI agent builder",
      "Calendar booking",
      "500 outbound calls/mo",
      "Unlimited SMS & email",
      "Call recordings + transcripts",
      "Zapier/webhook",
      "Email support",
    ],
    popular: false,
    checkoutUrl: "https://buy.stripe.com/fZudR2g325kJgRh3i0eUU0v",
    cta: "Get Started",
  },
  {
    name: "Team",
    price: "$296",
    originalPrice: "$399",
    discountNote: "Save $103/mo · Limited launch pricing",
    period: "/mo",
    tag: "Most Popular",
    features: [
      "Up to 5 AI voice agents",
      "Everything in Solo",
      "Emotion detection + tone mirroring",
      "Native CRM sync",
      "Custom objection handling",
      "Round-robin",
      "Advanced analytics",
      "Priority support",
    ],
    popular: true,
    checkoutUrl: "https://buy.stripe.com/8x200c2ccaF3dF5g4MeUU0w",
    cta: "Get Started",
  },
  {
    name: "Enterprise",
    price: "Custom",
    originalPrice: null,
    discountNote: null,
    period: "",
    tag: "White Glove",
    features: [
      "Unlimited agents",
      "Unlimited calls",
      "Dedicated account manager",
      "Custom AI voice persona",
      "Full CRM + workflow",
      "White-label",
      "Custom AI training",
      "Weekly reviews",
      "API access & SLA",
    ],
    popular: false,
    checkoutUrl: null,
    cta: "Talk to Sales",
  },
];

const credits = [
  {
    amount: "500 Credits",
    price: "$197",
    detail: "~500 minutes",
    highlight: false,
  },
  {
    amount: "1,000 Credits",
    price: "$350",
    detail: "Best value",
    highlight: true,
  },
  {
    amount: "3,000 Credits",
    price: "$800",
    detail: "High-volume",
    highlight: false,
  },
];

const addons = [
  {
    title: "Expert Dev Build",
    description:
      "Our team builds your entire AI agent from scratch — scripts, objection flows, CRM connections, calendar routing, and testing. You describe what you need, we deliver a production-ready agent.",
    pricing: "One-time fee",
    icon: Zap,
  },
  {
    title: "Workflow Automation",
    description:
      "We design and build your full automation pipeline — lead routing, follow-up sequences, CRM updates, notifications, and multi-step workflows using Zapier, Make.com, or native integrations.",
    pricing: "One-time fee",
    icon: Puzzle,
  },
  {
    title: "CRM Sync + Agentic AI",
    description:
      "Deep two-way CRM integration with agentic AI that autonomously updates records, triggers actions, and manages lead status across your entire pipeline without manual intervention.",
    pricing: "Contact for pricing",
    icon: CreditCard,
  },
];

export function PricingSection() {
  function handlePlanClick(plan: (typeof plans)[0]) {
    if (plan.checkoutUrl) {
      window.location.href = plan.checkoutUrl;
    } else {
      document
        .getElementById("enterprise")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section
      id="pricing"
      data-testid="section-pricing"
      className="py-16 md:py-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="mb-3" data-testid="badge-pricing">
            Pricing
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Less Than a <span className="gradient-text">Part-Time ISA</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            No hidden fees. Cancel anytime. Phone number from $3.50/mo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card
                className={`relative h-full ${plan.popular ? "card-glow border-primary/30" : ""}`}
                data-testid={`card-pricing-${index}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge data-testid="badge-most-popular">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-5 md:p-6 flex flex-col h-full">
                  <div className="mb-5">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3
                        className="text-base font-semibold"
                        data-testid={`text-plan-name-${index}`}
                      >
                        {plan.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs"
                        data-testid={`badge-plan-tag-${index}`}
                      >
                        {plan.tag}
                      </Badge>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                      <span
                        className="text-3xl font-bold"
                        data-testid={`text-plan-price-${index}`}
                      >
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-muted-foreground text-sm">
                          {plan.period}
                        </span>
                      )}
                      {plan.originalPrice && (
                        <span
                          className="text-base text-muted-foreground line-through"
                          data-testid={`text-plan-original-price-${index}`}
                        >
                          {plan.originalPrice}
                        </span>
                      )}
                    </div>
                    {plan.discountNote && (
                      <p
                        className="text-xs text-primary font-medium mt-1.5"
                        data-testid={`text-plan-discount-${index}`}
                      >
                        {plan.discountNote}
                      </p>
                    )}
                  </div>
                  <ul className="flex-1 space-y-2.5 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handlePlanClick(plan)}
                    data-testid={`button-pricing-${plan.name.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3
              className="text-xl md:text-2xl font-bold tracking-tight mb-2"
              data-testid="text-credits-title"
            >
              Call Credits
            </h3>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
              Credits power your outbound calls. Buy once, use anytime. Unused
              credits roll over.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {credits.map((credit, index) => (
              <Card
                key={credit.amount}
                className={`relative ${credit.highlight ? "card-glow border-primary/30" : ""}`}
                data-testid={`card-credit-${index}`}
              >
                {credit.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge data-testid="badge-best-value">Best Value</Badge>
                  </div>
                )}
                <CardContent className="p-5 text-center">
                  <p
                    className="font-semibold text-base mb-1"
                    data-testid={`text-credit-amount-${index}`}
                  >
                    {credit.amount}
                  </p>
                  <p
                    className="text-2xl font-bold mb-1"
                    data-testid={`text-credit-price-${index}`}
                  >
                    {credit.price}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {credit.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3
              className="text-xl md:text-2xl font-bold tracking-tight mb-2"
              data-testid="text-addons-title"
            >
              Add-Ons
            </h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {addons.map((addon, index) => (
              <Card key={addon.title} data-testid={`card-addon-${index}`}>
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <addon.icon className="w-5 h-5 text-primary shrink-0" />
                    <h4
                      className="font-semibold text-sm"
                      data-testid={`text-addon-title-${index}`}
                    >
                      {addon.title}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground flex-1 mb-3">
                    {addon.description}
                  </p>
                  <Badge
                    variant="outline"
                    className="self-start"
                    data-testid={`badge-addon-pricing-${index}`}
                  >
                    {addon.pricing}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <p className="text-xs text-muted-foreground text-center mt-8">
          * Prices are in USD
        </p>
      </div>
    </section>
  );
}
