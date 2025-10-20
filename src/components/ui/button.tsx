import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  asChild?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

const variantClassMap: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-primary text-surface-contrast shadow-card hover:bg-brand-primary-muted focus-visible:ring-2 focus-visible:ring-brand-accent",
  secondary:
    "border border-border bg-surface-elevated text-brand-primary hover:border-border-strong focus-visible:ring-2 focus-visible:ring-brand-accent",
  tertiary:
    "bg-surface-muted text-brand-primary hover:bg-surface-elevated focus-visible:ring-2 focus-visible:ring-brand-accent",
  ghost:
    "text-brand-primary hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-brand-accent",
  danger:
    "bg-status-danger text-surface-contrast hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-status-danger",
};

const sizeClassMap: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-base",
};

// Loading Spinner Component
function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={twMerge("h-4 w-4 animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  block = false,
  asChild = false,
  loading = false,
  icon,
  iconPosition = "left",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const composed = twMerge(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-60",
    sizeClassMap[size],
    variantClassMap[variant],
    block && "w-full",
    className,
  );

  const content = (
    <>
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === "left" && icon}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </>
  );

  if (asChild) {
    return (
      <Slot
        className={clsx(composed)}
        aria-disabled={isDisabled || undefined}
        {...props}
      >
        {content}
      </Slot>
    );
  }

  return (
    <button className={clsx(composed)} disabled={isDisabled} {...props}>
      {content}
    </button>
  );
}
