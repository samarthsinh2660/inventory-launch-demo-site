import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { LoginDialog } from "@/components/ui/login-dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Shield, 
  Wrench, 
  Zap, 
  TrendingUp, 
  Database,
  Clock,
  CheckCircle 
} from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

const Index = () => {
  const features = [
    {
      icon: <Bell className="w-8 h-8 text-[hsl(var(--feature-alerts))]" />,
      title: "Real-time Stock Alerts",
      description: "Automatically detects low stock, creates in-app notifications, and resolves them when stock is refilled. Notifications update current stock dynamically.",
      variant: "alerts" as const
    },
    {
      icon: <Shield className="w-8 h-8 text-[hsl(var(--feature-validation))]" />,
      title: "Robust Inventory Validation", 
      description: "Prevents negative stock on manual and manufacturing outs. Ensures entries are only created at the product's assigned location_id.",
      variant: "validation" as const
    },
    {
      icon: <Wrench className="w-8 h-8 text-[hsl(var(--feature-manufacturing))]" />,
      title: "Manufacturing with Product Formulas",
      description: "Supports BOM/recipes via ProductFormula, deducts components with validations, and blocks operations when components are insufficient.",
      variant: "manufacturing" as const
    },
    {
      icon: <Zap className="w-8 h-8 text-[hsl(var(--feature-api))]" />,
      title: "API-first, Secure Foundation",
      description: "Auth via JWT. Consistent REST endpoints for inventory, alerts, notifications, and formulas. Fits easily into frontend apps.",
      variant: "api" as const
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)]">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Database className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Basic Tech</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                Free Trial Available
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Advanced
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  {" "}Inventory{" "}
                </span>
                Management
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Enterprise-grade inventory management system with real-time alerts, 
                robust validation, and manufacturing support. Built for modern businesses.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <LoginDialog>
                <Button size="lg" className="bg-primary hover:bg-primary-glow shadow-[var(--shadow-glow)]">
                  Start Free Trial
                </Button>
              </LoginDialog>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Inventory Management Dashboard" 
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Powerful Features for Modern Inventory Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our system provides enterprise-level functionality with clean architecture 
            and robust error handling for reliable operations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant={feature.variant}
            />
          ))}
        </div>
      </section>

      {/* Additional Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <TrendingUp className="w-12 h-12 text-primary" />
            <h3 className="text-xl font-semibold">Clear Error Handling</h3>
            <p className="text-muted-foreground">
              Uses RequestError with specific error codes. Errors are propagated cleanly 
              to the frontend—no masking by generic messages.
            </p>
          </div>
          
          <div className="space-y-4">
            <Database className="w-12 h-12 text-primary" />
            <h3 className="text-xl font-semibold">Data Integrity</h3>
            <p className="text-muted-foreground">
              MySQL-backed schema, controlled updates, and clear audit trails for 
              inventory operations with dashboard visibility.
            </p>
          </div>
          
          <div className="space-y-4">
            <Shield className="w-12 h-12 text-primary" />
            <h3 className="text-xl font-semibold">Clean Architecture</h3>
            <p className="text-muted-foreground">
              Separation of concerns with controllers, services, and repositories. 
              Improves performance and testability.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center space-y-8 bg-card/50 backdrop-blur-sm rounded-2xl p-12 border">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to Transform Your Inventory Management?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of businesses using Basic Tech to streamline their inventory operations.
            Start your free trial today and experience the difference.
          </p>
          <LoginDialog>
            <Button size="lg" className="bg-primary hover:bg-primary-glow shadow-[var(--shadow-glow)] text-lg px-8">
              Get Started - Free Trial
            </Button>
          </LoginDialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-border/20">
        <div className="text-center text-muted-foreground">
          <p>&copy; 2025 Basic Tech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
