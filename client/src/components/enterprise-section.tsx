import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const enterpriseSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid work email"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().optional(),
  industry: z.string().min(1, "Please select an industry"),
  teamSize: z.string().min(1, "Please select team size"),
  monthlyLeads: z.string().min(1, "Please select monthly lead volume"),
  useCase: z.string().optional(),
  referralSource: z.string().min(1, "Please select how you heard about us"),
});

type EnterpriseForm = z.infer<typeof enterpriseSchema>;

const bulletPoints = [
  "Dedicated account manager",
  "Custom AI voice persona",
  "Multi-team deployment",
  "Full workflow automation",
  "Weekly performance reviews",
  "SLA-backed uptime guarantee",
  "Available in US, Australia, Canada, UAE & Gulf",
];

export function EnterpriseSection() {
  const { toast } = useToast();

  const form = useForm<EnterpriseForm>({
    resolver: zodResolver(enterpriseSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phone: "",
      industry: "",
      teamSize: "",
      monthlyLeads: "",
      useCase: "",
      referralSource: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: EnterpriseForm) => {
      await apiRequest("POST", "/api/enterprise-leads", {
        ...data,
        phone: data.phone?.trim() || undefined,
        useCase: data.useCase?.trim() || undefined,
      });
    },
    onSuccess: () => {
      toast({
        title: "Got it!",
        description: "We'll be in touch within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <section id="enterprise" data-testid="section-enterprise" className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="secondary" className="mb-3" data-testid="badge-enterprise">Enterprise</Badge>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3" data-testid="text-enterprise-headline">
              Built for teams that <span className="gradient-text">scale.</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed" data-testid="text-enterprise-subhead">
              For brokerages, agencies, and teams that need unlimited capacity, white-glove onboarding, and enterprise-grade infrastructure.
            </p>
            <div className="space-y-3">
              {bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-3" data-testid={`text-enterprise-bullet-${index}`}>
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <Card className="card-glow">
              <CardContent className="p-5 md:p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" data-testid="input-enterprise-first-name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Smith" data-testid="input-enterprise-last-name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@company.com" data-testid="input-enterprise-email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company / Team Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Realty Group" data-testid="input-enterprise-company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+1 555 123 4567" data-testid="input-enterprise-phone" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-enterprise-industry">
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="real-estate">Real Estate</SelectItem>
                              <SelectItem value="insurance">Insurance</SelectItem>
                              <SelectItem value="mortgage">Mortgage & Lending</SelectItem>
                              <SelectItem value="property-management">Property Management</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="home-services">Home Services</SelectItem>
                              <SelectItem value="auto-pc">Auto & P&C</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="teamSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Size</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-enterprise-team-size">
                                <SelectValue placeholder="Select team size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-5">1-5</SelectItem>
                              <SelectItem value="6-20">6-20</SelectItem>
                              <SelectItem value="21-50">21-50</SelectItem>
                              <SelectItem value="50+">50+ / Brokerage</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="monthlyLeads"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Lead Volume</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-enterprise-monthly-leads">
                                <SelectValue placeholder="Select volume" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under-100">Under 100</SelectItem>
                              <SelectItem value="100-500">100 - 500</SelectItem>
                              <SelectItem value="500-2000">500 - 2,000</SelectItem>
                              <SelectItem value="2000+">2,000+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="useCase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What do you want to automate?</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={3}
                              placeholder="e.g. follow up calls, appointment setting..."
                              data-testid="textarea-enterprise-use-case"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="referralSource"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How Did You Hear About Us?</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-enterprise-referral">
                                <SelectValue placeholder="Select one" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="google">Google</SelectItem>
                              <SelectItem value="linkedin">LinkedIn</SelectItem>
                              <SelectItem value="referral">Referral</SelectItem>
                              <SelectItem value="social-media">Social Media</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={mutation.isPending} data-testid="button-submit-enterprise">
                      {mutation.isPending ? "Submitting..." : (
                        <>Get My Custom Plan <ArrowRight className="w-4 h-4 ml-2" /></>
                      )}
                    </Button>
                    <p className="text-[11px] text-muted-foreground text-center">
                      No commitment required. Response within 24 business hours.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
