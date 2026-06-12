import { motion } from "framer-motion";
import { Shield, Globe, Lock, Languages } from "lucide-react";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 py-4"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span
              className="text-xs font-medium text-muted-foreground mr-1"
              data-testid="text-works-with"
            >
              Works with
            </span>
            {integrations.map((name, i) => (
              <span
                key={name}
                className="text-xs text-muted-foreground/80"
                data-testid={`text-integration-${i}`}
              >
                {name}
                {i < integrations.length - 1 && (
                  <span className="ml-2 text-border">·</span>
                )}
              </span>
            ))}
          </div>

          <div
            className="hidden md:block w-px h-6 bg-border shrink-0"
            aria-hidden="true"
          />

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {trustBadges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground"
                data-testid={`text-trust-${badge.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <badge.icon className="w-3 h-3" />
                {badge.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
