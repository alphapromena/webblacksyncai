import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function FinalCtaSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (emailValue: string) => {
      await apiRequest("POST", "/api/leads", { name: emailValue.split("@")[0], email: emailValue });
    },
    onSuccess: () => {
      toast({ title: "You're in!", description: "Check your inbox to get started." });
      setEmail("");
    },
    onError: () => {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({ title: "Invalid email", description: "Please enter a valid work email.", variant: "destructive" });
      return;
    }
    mutation.mutate(email);
  }

  return (
    <section data-testid="section-final-cta" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4"
            data-testid="text-final-cta-headline"
          >
            Your next 10 appointments are{" "}
            <span className="gradient-text">already waiting.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed"
            data-testid="text-final-cta-subhead"
          >
            Start free. No credit card. No sales call. Live in under 5 minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="flex flex-col items-center gap-3"
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full max-w-md">
              <Input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                data-testid="input-final-cta-email"
              />
              <Button size="lg" type="submit" disabled={mutation.isPending} data-testid="button-final-cta">
                {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Get Started
                {!mutation.isPending && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground" data-testid="text-final-cta-subtext">
              No setup fees · Phone number from $3.50/mo · Cancel anytime
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
