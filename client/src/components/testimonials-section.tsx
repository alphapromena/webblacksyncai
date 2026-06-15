import { Star, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/section";

const reviews = [
  { quote: "45-minute response times down to under 11 seconds.", name: "James R.", role: "Team Lead · Phoenix AZ" },
  { quote: "Set it up in minutes — no coding, no consultants.", name: "Sarah T.", role: "Realtor · Austin TX" },
  { quote: "8 appointments booked in the first 48 hours.", name: "Marcus K.", role: "Broker · Atlanta GA" },
];

function StarTile({ size = "w-5 h-5", icon = "w-3 h-3" }: { size?: string; icon?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-[4px] bg-[#00b67a] ${size}`}>
      <Star className={`${icon} text-white`} fill="white" strokeWidth={0} />
    </span>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" data-testid="section-testimonials" className="py-14 md:py-20 relative">
      <div className="absolute inset-0 hero-gradient opacity-30" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarTile key={i} size="w-6 h-6" icon="w-3.5 h-3.5" />
              ))}
              <span className="ml-2 text-base font-semibold text-foreground">4.9<span className="text-muted-foreground font-normal">/5</span></span>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Rated by verified outbound teams
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.06}>
              <div
                className="h-full rounded-xl border border-card-border bg-card px-4 py-4 shadow-sm"
                data-testid={`card-testimonial-${i}`}
              >
                <div className="mb-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarTile key={s} size="w-4 h-4" icon="w-2.5 h-2.5" />
                  ))}
                </div>
                <p className="text-sm leading-snug text-foreground/90">"{r.quote}"</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                  <span className="font-semibold text-foreground">{r.name}</span>
                  <span className="truncate">· {r.role}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5" />
            Last names partially hidden to protect our clients' privacy.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
