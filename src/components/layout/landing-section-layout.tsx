import type { ReactNode } from "react";
import clsx from "clsx";

type LandingSectionLayoutProps = {
  badge?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  illustration?: ReactNode;
  align?: "start" | "center";
  className?: string;
  children?: ReactNode;
};

export function LandingSectionLayout({
  badge,
  title,
  description,
  actions,
  illustration,
  align = "center",
  className,
  children,
}: LandingSectionLayoutProps) {
  return (
    <section className={clsx("relative overflow-hidden", className)}>
      <div className="absolute inset-0 -z-10 bg-hero-gradient from-brand-gradient-start via-brand-gradient-mid to-brand-gradient-end opacity-90" />
      <div className="absolute inset-0 -z-10 bg-grid-overlay bg-[length:120px_120px] opacity-20" />
      <div
        className={clsx(
          "layout-container flex flex-col gap-12 py-16 lg:flex-row lg:gap-24",
          align === "center" ? "lg:items-center" : "lg:items-start",
        )}
      >
        <div className="flex-1 space-y-6 text-surface-contrast">
          {badge && (
            <span className="inline-flex items-center rounded-full bg-surface/10 px-4 py-1.5 text-sm font-medium uppercase tracking-wide">
              {badge}
            </span>
          )}
          <div className="space-y-4">
            {typeof title === "string" ? <h1 className="text-4xl font-semibold lg:text-5xl">{title}</h1> : title}
            {description &&
              (typeof description === "string" ? (
                <p className="max-w-2xl text-base text-surface-contrast/80 lg:text-lg">{description}</p>
              ) : (
                description
              ))}
          </div>
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
          {children}
        </div>
        {illustration && (
          <div className="flex-1">
            <div className="relative rounded-2xl border border-white/20 bg-surface-glass/60 p-8 shadow-brand-glow backdrop-blur">
              <div className="absolute inset-0 rounded-2xl border border-white/30 opacity-70" />
              <div className="relative">{illustration}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
