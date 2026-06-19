import { Upload, Bot, PhoneCall, CalendarCheck } from "lucide-react";
import { SectionHeading, Reveal } from "@/components/ui/section";

const steps = [
  {
    icon: Upload,
    title: "Connect Your Leads",
    description: "Import from your CRM, Zillow, LendingTree, or any source via API, CSV, or webhook. Takes 2 minutes.",
  },
  {
    icon: Bot,
    title: "AI Builds Your Agent",
    description: "Describe what you need in plain English. BlackSync's AI writes your scripts, configures objection handling, and sets up your qualification flow — no technical knowledge needed.",
  },
  {
    icon: PhoneCall,
    title: "Agent Calls & Qualifies",
    description: "Your AI agent calls leads within seconds. It handles objections, detects emotion and tone, asks qualifying questions, and builds rapport naturally.",
  },
  {
    icon: CalendarCheck,
    title: "Appointments Land in Your Calendar",
    description: "Qualified leads get booked directly into your calendar. Hot leads trigger instant SMS alerts to you. Everything syncs to your CRM automatically.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" data-testid="section-how-it-works" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 hero-gradient opacity-40" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title={<>Lead to <span className="text-accent-grad">Booked Appointment</span> in 4 Steps</>}
          lead="A clean, hands-off sequence — from raw lead to a meeting on your calendar."
        />

        <div className="relative mt-20">
          {/* connecting line across the timeline (desktop) */}
          <div
            className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <div
                  className="group relative flex h-full flex-col items-start rounded-2xl border border-card-border bg-card p-6 md:p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                  data-testid={`step-${index}`}
                >
                  {/* numbered badge sitting on the timeline */}
                  <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-card-border bg-background shadow-md">
                    <span className="font-mono text-sm font-bold tracking-tight text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <step.icon className="h-5 w-5" />
                  </div>

                  <h3 className="font-display text-lg font-semibold tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
