import { Shield, Lock, Languages } from "lucide-react";

const integrations = [
  "Follow Up Boss",
  "Sierra CRM",
  "kvCORE",
  "Calendly",
  "Zapier",
  "Make.com",
  "Zillow",
  "LendingTree",
];

const trustBadges = [
  { label: "SOC 2", icon: Shield },
  { label: "HIPAA Ready", icon: Lock },
  { label: "GDPR", icon: Lock },
  { label: "40+ Languages", icon: Languages },
];

export function TrustStrip() {
  return (
    <section
      data-testid="section-trust-strip"
      className="border-y border-border bg-muted/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          {/* Integrations marquee */}
          <div className="flex items-center gap-4 w-full lg:flex-1 min-w-0">
            <span
              className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground shrink-0"
              data-testid="text-works-with"
            >
              Works with
            </span>
            <div className="relative flex-1 min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex w-max animate-marquee items-center gap-3">
                {[...integrations, ...integrations].map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="inline-flex shrink-0 items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm"
                    data-testid={`text-integration-${i}`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className="hidden lg:block w-px h-8 bg-border shrink-0"
            aria-hidden="true"
          />

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 shrink-0">
            {trustBadges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80"
                data-testid={`text-trust-${badge.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <badge.icon className="w-3.5 h-3.5 text-primary" />
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
