import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import followUpBossLogo from "@assets/logos/followupboss.png";
import sierraInteractiveLogo from "@assets/logos/sierra-interactive.png";
import kvcoreLogo from "@assets/logos/kvcore.png";
import boomtownLogo from "@assets/logos/boomtown.png";
import loftyLogo from "@assets/logos/lofty.png";

const stats = [
  { value: 3.2, suffix: "x", decimals: 1, label: "More appointments booked vs. human ISAs" },
  { value: 11, suffix: "s", decimals: 0, label: "Average response time to a new lead" },
  { value: 60, suffix: "s", decimals: 0, label: "From lead capture to first live call" },
];

const testimonials = [
  {
    quote: "Our calendar went from empty Tuesdays to fully booked. BlackSync called 400 leads our team had given up on and booked 23 showings.",
    name: "Jessica M.",
    role: "Team Lead, Real Estate — Tampa FL",
    initials: "JM",
  },
  {
    quote: "We replaced two ISAs with one AI agent. Cost dropped 80%, qualified appointments tripled, and it never misses a follow-up.",
    name: "David L.",
    role: "Broker, Mortgage — Denver CO",
    initials: "DL",
  },
  {
    quote: "Set it up Monday morning. Had 6 qualified policy reviews booked by Friday. The voice is honestly indistinguishable from a real rep.",
    name: "Priya S.",
    role: "Agency Owner, Insurance — Dallas TX",
    initials: "PS",
  },
];

const trustedBy = [
  { name: "Follow Up Boss", src: followUpBossLogo, height: "h-7 md:h-8" },
  { name: "Sierra Interactive", src: sierraInteractiveLogo, height: "h-10 md:h-12" },
  { name: "kvCORE", src: kvcoreLogo, height: "h-6 md:h-7" },
  { name: "BoomTown", src: boomtownLogo, height: "h-9 md:h-10" },
  { name: "Lofty", src: loftyLogo, height: "h-7 md:h-8" },
];

function AnimatedCounter({ value, suffix, decimals }: { value: number; suffix: string; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function SocialProofSection() {
  return (
    <section
      id="social-proof"
      data-testid="section-social-proof"
      className="py-16 md:py-24 relative bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground/70 mb-5"
            data-testid="pill-results"
          >
            Results
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Real teams. Real{" "}
            <span
              className="italic"
              style={{ fontFamily: "var(--font-serif)", color: "#9E6B57" }}
            >
              booked calendars.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card/60 p-6 text-center"
              data-testid={`stat-${i}`}
            >
              <div
                className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
                style={{ color: "#3F7D58" }}
                data-testid={`stat-value-${i}`}
              >
                <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card/60 p-6 flex flex-col"
              data-testid={`card-social-testimonial-${i}`}
            >
              <blockquote className="text-sm leading-relaxed text-foreground/90 mb-5 flex-1">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold bg-accent text-accent-foreground"
                  data-testid={`avatar-testimonial-${i}`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">
            Trusted by teams using
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-60">
            {trustedBy.map((logo, i) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                className={`${logo.height} w-auto object-contain grayscale dark:invert dark:brightness-0 dark:contrast-200`}
                data-testid={`logo-trusted-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
