import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "We went from 45-minute response times to under 11 seconds. Our lead-to-appointment rate jumped 3x in the first week.",
    name: "James R.",
    role: "Team Lead, Phoenix AZ",
    metric: "11s response time",
  },
  {
    quote: "I described what I needed in plain English and BlackSync built my agent in minutes. No coding, no consultants, no hassle.",
    name: "Sarah T.",
    role: "Realtor, Austin TX",
    metric: "Built in minutes",
  },
  {
    quote: "8 appointments booked in the first 48 hours. My AI agent works nights, weekends, and holidays — and never calls in sick.",
    name: "Marcus K.",
    role: "Broker, Atlanta GA",
    metric: "8 appts in 48hrs",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" data-testid="section-testimonials" className="py-16 md:py-20 relative">
      <div className="absolute inset-0 hero-gradient opacity-30" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="mb-3">Results</Badge>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Agents <span className="gradient-text">Love Their AI Colleague</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-5 rounded-lg border border-border/50 bg-card/30"
              data-testid={`card-testimonial-${index}`}
            >
              <Badge variant="secondary" className="mb-3 text-xs">{t.metric}</Badge>
              <blockquote className="text-sm leading-relaxed mb-4">"{t.quote}"</blockquote>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
