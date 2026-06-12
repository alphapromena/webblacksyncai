import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-login">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-16">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight mb-3">Welcome Back</h1>
          <p className="text-muted-foreground mb-6">Log in to your BlackSync dashboard.</p>
          <p className="text-sm text-muted-foreground">Login page coming soon.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
