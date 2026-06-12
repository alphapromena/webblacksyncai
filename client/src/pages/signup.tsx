import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-signup">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-16">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight mb-3">Create Your Account</h1>
          <p className="text-muted-foreground mb-6">Pick a plan and get started in minutes.</p>
          <p className="text-sm text-muted-foreground">Sign up page coming soon.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
