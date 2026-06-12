import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Upload, Bot, PhoneCall, CalendarCheck } from "lucide-react";

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
    <section id="how-it-works" data-testid="section-how-it-works" className="py-16 md:py-20 relative">
      <div className="absolute inset-0 hero-gradient opacity-30" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="mb-3">How It Works</Badge>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Lead to <span className="gradient-text">Booked Appointment</span> in 4 Steps
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="text-center p-5 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm"
              data-testid={`step-${index}`}
            >
              <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                <step.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-primary font-semibold uppercase tracking-wider">
                Step {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-sm font-semibold mt-1 mb-1.5">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
