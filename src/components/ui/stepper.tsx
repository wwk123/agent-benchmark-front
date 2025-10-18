import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepStatus = "pending" | "current" | "completed" | "error";

export type Step = {
  label: string;
  description?: string;
  status: StepStatus;
  icon?: ReactNode;
};

export type StepperProps = {
  steps: Step[];
  orientation?: "horizontal" | "vertical";
  className?: string;
};

const STATUS_CONFIG: Record<
  StepStatus,
  {
    iconBg: string;
    iconBorder: string;
    iconText: string;
    labelText: string;
    lineColor: string;
  }
> = {
  pending: {
    iconBg: "bg-surface",
    iconBorder: "border-border",
    iconText: "text-text-muted",
    labelText: "text-text-secondary",
    lineColor: "bg-border",
  },
  current: {
    iconBg: "bg-brand-primary",
    iconBorder: "border-brand-primary",
    iconText: "text-white",
    labelText: "text-brand-primary font-semibold",
    lineColor: "bg-border",
  },
  completed: {
    iconBg: "bg-emerald-500",
    iconBorder: "border-emerald-500",
    iconText: "text-white",
    labelText: "text-text-primary",
    lineColor: "bg-emerald-500",
  },
  error: {
    iconBg: "bg-rose-500",
    iconBorder: "border-rose-500",
    iconText: "text-white",
    labelText: "text-rose-600 font-medium",
    lineColor: "bg-border",
  },
};

/**
 * Stepper - Multi-step progress indicator for wizards and workflows
 *
 * @example
 * ```tsx
 * <Stepper
 *   steps={[
 *     { label: "Select Benchmark", status: "completed" },
 *     { label: "Configure Agent", status: "current", description: "Set up parameters" },
 *     { label: "Review & Submit", status: "pending" }
 *   ]}
 *   orientation="horizontal"
 * />
 * ```
 */
export function Stepper({ steps, orientation = "horizontal", className }: StepperProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <nav
      aria-label="Progress"
      className={cn(
        isHorizontal ? "flex items-start" : "flex flex-col",
        className
      )}
    >
      {steps.map((step, index) => {
        const config = STATUS_CONFIG[step.status];
        const isLast = index === steps.length - 1;

        return (
          <div
            key={`${step.label}-${index}`}
            className={cn(
              "flex",
              isHorizontal
                ? "flex-1 flex-col items-center"
                : "items-start gap-4"
            )}
          >
            {/* Step Icon and Connecting Line Container */}
            <div
              className={cn(
                "flex items-center",
                isHorizontal ? "w-full flex-col" : "flex-col"
              )}
            >
              {/* Step Icon */}
              <div className="relative flex items-center">
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    config.iconBg,
                    config.iconBorder
                  )}
                  aria-current={step.status === "current" ? "step" : undefined}
                >
                  {step.status === "completed" ? (
                    <Check className={cn("size-5", config.iconText)} aria-hidden="true" />
                  ) : step.icon ? (
                    <div className={cn(config.iconText)}>{step.icon}</div>
                  ) : (
                    <span className={cn("text-sm font-semibold", config.iconText)}>
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Connecting Line */}
                {!isLast && (
                  <div
                    className={cn(
                      isHorizontal
                        ? "absolute left-[calc(50%+1.25rem)] top-5 h-0.5 w-[calc(100vw-2.5rem)]"
                        : "absolute left-5 top-[calc(50%+1.25rem)] h-[calc(100%-2.5rem)] w-0.5",
                      config.lineColor,
                      "transition-colors"
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Step Content */}
              <div
                className={cn(
                  "text-center",
                  isHorizontal ? "mt-3 w-full" : "ml-4 mt-0"
                )}
              >
                <p className={cn("text-sm font-medium", config.labelText)}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="mt-1 text-xs text-text-muted">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
