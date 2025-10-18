import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { Link } from "@/navigation";

type SubmissionStep = {
  title: string;
  description: string;
  hint?: string;
};

type ChecklistProps = {
  title: string;
  items: string[];
  support: {
    title: string;
    description: string;
    action: { label: string; href: string };
  };
};

type SubmissionStepsProps = {
  steps: SubmissionStep[];
  checklist: ChecklistProps;
  illustration?: ReactNode;
};

export function SubmissionSteps({ steps, checklist, illustration }: SubmissionStepsProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[2fr,1fr] lg:gap-12">
      <ol className="space-y-6">
        {steps.map((step) => (
          <li key={step.title} className="card space-y-4 p-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-brand-primary">{step.title}</h3>
              <p className="text-sm text-text-secondary">{step.description}</p>
            </div>
            {step.hint && (
              <p className="rounded-xl bg-brand-accent/5 px-4 py-3 text-xs font-medium uppercase tracking-wide text-brand-primary">
                {step.hint}
              </p>
            )}
          </li>
        ))}
      </ol>

      <aside className="card space-y-6 p-6">
        {illustration && (
          <div className="rounded-xl border border-border/80 bg-surface-muted/60 p-4 backdrop-blur">
            {illustration}
          </div>
        )}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-brand-primary">{checklist.title}</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            {checklist.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 inline-block size-2 rounded-full bg-brand-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 rounded-xl border border-dashed border-brand-accent/60 bg-brand-accent/5 p-4">
          <div>
            <h4 className="text-sm font-semibold text-brand-primary">{checklist.support.title}</h4>
            <p className="text-sm text-text-secondary">{checklist.support.description}</p>
          </div>
          <Button asChild variant="secondary">
            <Link href={checklist.support.action.href}>{checklist.support.action.label}</Link>
          </Button>
        </div>
      </aside>
    </div>
  );
}
