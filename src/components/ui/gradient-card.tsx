import type { ReactNode } from "react";
import clsx from "clsx";

type GradientCardProps = {
  children: ReactNode;
  className?: string;
  highlight?: boolean;
};

export function GradientCard({ children, className, highlight = false }: GradientCardProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-card-gradient p-6 text-surface-contrast shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-strong",
        highlight && "shadow-brand-glow",
        className,
      )}
    >
      <div className="absolute inset-0 opacity-20 blur-2xl transition-opacity duration-500 hover:opacity-40" />
      <div className="relative">{children}</div>
    </div>
  );
}
