import type { ReactNode } from "react";
import clsx from "clsx";

type SectionProps = {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
};

const paddingMap: Record<Required<SectionProps>["padding"], string> = {
  sm: "py-10 md:py-12",
  md: "py-16 md:py-20",
  lg: "py-20 md:py-24",
};

export function Section({
  id,
  title,
  description,
  className,
  padding = "md",
  children,
}: SectionProps) {
  return (
    <section id={id} className={clsx(paddingMap[padding], className)}>
      <div className="layout-container space-y-8">
        {(title || description) && (
          <header className="max-w-3xl space-y-3">
            {typeof title === "string" ? <h2>{title}</h2> : title}
            {typeof description === "string" ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
