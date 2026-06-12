import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Home, Shield, Landmark, Building2, HeartPulse, Car } from "lucide-react";

const industries = [
  {
    name: "Real Estate",
    tagline: "AI ISA for Agents & Brokerages",
    description:
      "Calls every lead in 60 seconds, qualifies buyers and sellers, books showings, and follows up until they transact.",
    icon: Home,
    gradient: "from-amber-700 to-amber-900",
  },
  {
    name: "Insurance",
    tagline: "AI SDR for Agents & Carriers",
    description:
      "Prospects for new policies, re-engages lapsed customers, handles renewals, and books consultations across all lines.",
    icon: Shield,
    gradient: "from-stone-500 to-stone-700",
  },
  {
    name: "Mortgage & Lending",
    tagline: "AI Loan Officer Assistant",
    description:
      "Pre-qualifies borrowers, nurtures rate shoppers, follows up on incomplete apps, and keeps your pipeline warm.",
    icon: Landmark,
    gradient: "from-yellow-700 to-yellow-900",
  },
];

const moreIndustries = [
  { icon: Building2, name: "Commercial RE" },
  { icon: HeartPulse, name: "Health Insurance" },
  { icon: Car, name: "Auto & P&C" },
];

export function ProductsSection() {
  return (
    <section id="industries" data-testid="section-products" className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="mb-3">Industries</Badge>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Built for <span className="gradient-text">High-Value Sales</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Trained on millions of real conversations in your industry.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="h-full card-glow" data-testid={`card-product-${index}`}>
                <CardContent className="p-5 md:p-6">
                  <div className={`w-10 h-10 rounded-md bg-gradient-to-br ${industry.gradient} flex items-center justify-center mb-4`}>
                    <industry.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-0.5">{industry.name}</h3>
                  <p className="text-xs text-primary font-medium mb-2">{industry.tagline}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{industry.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <span className="text-xs text-muted-foreground">Also:</span>
          {moreIndustries.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/50 bg-card/30 text-xs text-muted-foreground"
              data-testid={`badge-industry-${item.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
