import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-6">
          This page doesn't exist.
        </p>
        <a href="/">
          <Button variant="outline" data-testid="button-go-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </a>
      </div>
    </div>
  );
}
