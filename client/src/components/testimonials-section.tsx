import { Quote } from "lucide-react";
import { SectionHeading, Reveal } from "@/components/ui/section";

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
    <section id="testimonials" data-testid="section-testimonials" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 hero-gradient opacity-40" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Results"
          title={<>Agents <span className="text-accent-grad">Love Their AI Colleague</span></>}
          lead="Real teams, real pipelines, real appointments — within days of going live."
        />

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <Reveal key={t.name} delay={index * 0.06}>
              <figure
                className="group relative flex h-full flex-col rounded-2xl border border-card-border bg-card p-7 md:p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                data-testid={`card-testimonial-${index}`}
              >
                <Quote
                  className="w-10 h-10 text-primary/25 mb-6"
                  fill="currentColor"
                  strokeWidth={0}
                  aria-hidden="true"
                />
                <blockquote className="font-display text-xl md:text-2xl font-medium leading-snug tracking-tight text-foreground text-pretty mb-7 flex-1">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-auto flex items-center justify-between gap-4 border-t border-card-border/60 pt-5">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-primary font-semibold">
                    {t.metric}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
