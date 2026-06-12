import { BentoGridShowcase } from "@/components/ui/bento-grid-showcase";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Phone,
  Calendar,
  Clock,
  Globe,
  Sparkles,
  Zap,
  CheckCircle2,
  PhoneIncoming,
  PhoneOutgoing,
} from "lucide-react";

function Tile({
  children,
  className = "",
  testId,
}: {
  children: React.ReactNode;
  className?: string;
  testId?: string;
}) {
  return (
    <div
      data-testid={testId}
      className={`relative h-full w-full rounded-3xl border border-border bg-card p-6 overflow-hidden hover-elevate active-elevate-2 transition-all ${className}`}
    >
      {children}
    </div>
  );
}

function IntegrationTile() {
  const integrations = [
    "Follow Up Boss",
    "Sierra CRM",
    "kvCORE",
    "Calendly",
    "Zapier",
    "Make.com",
    "Zillow",
    "LendingTree",
    "HubSpot",
    "Salesforce",
    "Google Cal",
    "Twilio",
  ];
  return (
    <Tile testId="bento-integration" className="flex flex-col">
      <Badge variant="outline" className="self-start mb-4">
        <Sparkles className="w-3 h-3 mr-1" /> Integrations
      </Badge>
      <h3 className="text-2xl font-bold tracking-tight mb-2">
        Plugs into your <span className="gradient-text">whole stack</span>
      </h3>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        Native two-way sync with the tools your team already runs on — leads in,
        appointments out, everything logged.
      </p>
      <div className="grid grid-cols-2 gap-2 mt-auto">
        {integrations.map((name) => (
          <div
            key={name}
            className="text-xs font-medium px-3 py-2 rounded-lg bg-background border border-border text-center text-foreground/80"
            data-testid={`integration-${name.toLowerCase().replace(/\s|\./g, "-")}`}
          >
            {name}
          </div>
        ))}
      </div>
    </Tile>
  );
}

function TrackersTile() {
  const calls = [
    { name: "Maria S.", status: "qualified", time: "now" },
    { name: "James K.", status: "booked", time: "1m" },
    { name: "Daniel R.", status: "calling", time: "live" },
  ];
  return (
    <Tile testId="bento-trackers" className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <PhoneOutgoing className="w-4 h-4 text-primary" />
          <h4 className="font-semibold text-sm">Live Call Activity</h4>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      </div>
      <div className="space-y-2 mt-1">
        {calls.map((call) => (
          <div
            key={call.name}
            className="flex items-center justify-between p-2 rounded-lg bg-background border border-border"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold">
                {call.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-xs font-semibold">{call.name}</p>
                <p className="text-[10px] text-muted-foreground capitalize">
                  {call.status}
                </p>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground">{call.time}</span>
          </div>
        ))}
      </div>
    </Tile>
  );
}

function StatisticTile() {
  return (
    <Tile testId="bento-statistic" className="flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-4 h-4 text-primary" />
        <h4 className="font-semibold text-sm">Appointments Booked</h4>
      </div>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-5xl font-bold tracking-tight gradient-text">
          847
        </span>
        <span className="text-xs font-medium text-emerald-600">+34% MoM</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">This month, across all agents</p>
      <div className="flex items-end gap-1.5 mt-auto h-12 pt-3">
        {[28, 42, 35, 58, 49, 71, 65, 82, 76, 91, 85, 100].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-primary/70"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </Tile>
  );
}

function FocusTile() {
  return (
    <Tile testId="bento-focus" className="flex flex-col items-center justify-center text-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
          <Clock className="w-7 h-7 text-primary" />
        </div>
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      <p className="text-4xl font-bold tracking-tight mt-3">11s</p>
      <p className="text-xs font-semibold text-foreground mt-1">Avg Response Time</p>
      <p className="text-[11px] text-muted-foreground mt-1 max-w-[180px]">
        From lead capture to first dial — beat every human ISA.
      </p>
    </Tile>
  );
}

function ProductivityTile() {
  const langs = ["English", "Spanish", "Arabic", "Mandarin", "French", "Portuguese", "Hindi", "+33"];
  return (
    <Tile testId="bento-productivity" className="flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="w-4 h-4 text-primary" />
        <h4 className="font-semibold text-sm">40+ Languages</h4>
      </div>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
        Your AI speaks your leads' language — natively.
      </p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {langs.map((lang) => (
          <span
            key={lang}
            className="text-[10px] font-medium px-2 py-1 rounded-md bg-background border border-border"
          >
            {lang}
          </span>
        ))}
      </div>
    </Tile>
  );
}

function ShortcutsTile() {
  const shortcuts = [
    { icon: PhoneIncoming, label: "Capture lead", meta: "From any source" },
    { icon: Sparkles, label: "AI builds agent", meta: "In plain English" },
    { icon: Phone, label: "Auto-dial in 11s", meta: "Qualify + objections" },
    { icon: CheckCircle2, label: "Booked to calendar", meta: "Synced to CRM" },
  ];
  return (
    <Tile testId="bento-shortcuts" className="flex flex-col">
      <div className="flex items-center gap-2 mb-1">
        <Zap className="w-4 h-4 text-primary" />
        <h4 className="font-semibold text-sm">The BlackSync Flow</h4>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        From cold lead to booked appointment — fully automated, end to end.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-auto">
        {shortcuts.map((s, i) => (
          <div
            key={s.label}
            className="relative p-3 rounded-xl bg-background border border-border"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-md bg-primary/15 flex items-center justify-center">
                <s.icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground">
                0{i + 1}
              </span>
            </div>
            <p className="text-xs font-semibold leading-tight">{s.label}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{s.meta}</p>
          </div>
        ))}
      </div>
    </Tile>
  );
}

export function PlatformBentoSection() {
  return (
    <section
      data-testid="section-platform-bento"
      className="py-16 md:py-24 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <Badge variant="secondary" className="mb-3">Platform</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
            Everything you need to{" "}
            <span className="gradient-text">scale outbound</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Native integrations, live call tracking, sub-12-second response times,
            and a fully automated lead-to-appointment flow — in one platform.
          </p>
        </motion.div>

        <BentoGridShowcase
          integration={<IntegrationTile />}
          trackers={<TrackersTile />}
          statistic={<StatisticTile />}
          focus={<FocusTile />}
          productivity={<ProductivityTile />}
          shortcuts={<ShortcutsTile />}
        />
      </div>
    </section>
  );
}
