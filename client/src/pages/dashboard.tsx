import { Navbar } from "@/components/navbar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-dashboard">
      <Navbar />
      <div className="flex items-center justify-center pt-24">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight mb-3">Welcome to BlackSync</h1>
          <p className="text-muted-foreground">Your dashboard is being prepared. Check back soon.</p>
        </div>
      </div>
    </div>
  );
}
