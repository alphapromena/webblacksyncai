import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, Bot, PhoneCall, DollarSign, BarChart3, Repeat } from "lucide-react";

const comparisonData = [
  { feature: "Calls leads within 60 seconds", blacksync: true, others: false },
  { feature: "Works nights, weekends & holidays", blacksync: true, others: false },
  { feature: "Never calls in sick or quits", blacksync: true, others: false },
  { feature: "Handles 1,000+ calls per day", blacksync: true, others: false },
  { feature: "No salary, commissions, or benefits", blacksync: true, others: false },
  { feature: "Scales up or down instantly", blacksync: true, others: false },
  { feature: "Detects emotion and mirrors tone", blacksync: true, others: false },
  { feature: "Speaks 40+ languages", blacksync: true, others: false },
  { feature: "Powered by GPT-5, Claude & Gemini", blacksync: true, others: false },
];

const advantages = [
  { icon: Clock, title: "Speed to Lead", desc: "Under 60 seconds to first contact, every single time." },
  { icon: Bot, title: "Sounds Human", desc: "Trained on millions of real sales conversations." },
  { icon: PhoneCall, title: "Relentless Follow-Up", desc: "8-12 touches across calls, texts, and email." },
  { icon: DollarSign, title: "1/10th the Cost", desc: "Fraction of a human ISA, 10x the volume." },
  { icon: BarChart3, title: "Full Visibility", desc: "Every call recorded, transcribed, and scored." },
  { icon: Repeat, title: "Your Playbook", desc: "Trained on your scripts and qualifying criteria." },
];

export function WhySection() {
  return (
    <section id="why" data-testid="section-why" className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="mb-3">Why BlackSync</Badge>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            AI Colleague vs. <span className="gradient-text">Hiring Another Human</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm">
              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 p-3 border-b border-border text-xs font-medium text-muted-foreground">
                <span>Capability</span>
                <span className="text-center w-20">AI</span>
                <span className="text-center w-20">Human</span>
              </div>
              {comparisonData.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-[1fr_auto_auto] items-center gap-3 px-3 py-2.5 text-sm ${
                    i < comparisonData.length - 1 ? "border-b border-border/50" : ""
                  }`}
                  data-testid={`comparison-row-${i}`}
                >
                  <span className="text-sm">{row.feature}</span>
                  <span className="flex justify-center w-20">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </span>
                  <span className="flex justify-center w-20">
                    <XCircle className="w-4 h-4 text-muted-foreground/40" />
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {advantages.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="p-4 rounded-lg border border-border/50 bg-card/30"
                data-testid={`advantage-${index}`}
              >
                <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-2.5">
                  <item.icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
