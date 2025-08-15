import { cn } from "@/lib/utils";
import { Card } from "./card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "alerts" | "validation" | "manufacturing" | "api";
  className?: string;
}

const variantStyles = {
  alerts: "border-[hsl(var(--feature-alerts))] bg-[hsl(var(--feature-alerts))]/5",
  validation: "border-[hsl(var(--feature-validation))] bg-[hsl(var(--feature-validation))]/5", 
  manufacturing: "border-[hsl(var(--feature-manufacturing))] bg-[hsl(var(--feature-manufacturing))]/5",
  api: "border-[hsl(var(--feature-api))] bg-[hsl(var(--feature-api))]/5"
};

export function FeatureCard({ 
  icon, 
  title, 
  description, 
  variant = "api",
  className 
}: FeatureCardProps) {
  return (
    <Card className={cn(
      "p-6 border transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-105",
      variantStyles[variant],
      className
    )}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}