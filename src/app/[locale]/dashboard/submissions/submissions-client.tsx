"use client";

import { useState } from "react";
import { useUserSubmissions } from "@/hooks/use-submissions";
import { SubmissionsTable } from "@/components/features/submissions-table";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

type DashboardSubmissionsClientProps = {
  empty: {
    title: string;
    description: string;
    ctaLabel?: string;
    backLabel?: string;
  };
  cta: { label: string; href: string };
};

export function DashboardSubmissionsClient({ empty, cta }: DashboardSubmissionsClientProps) {
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const {
    data: submissionsData,
    isLoading,
  } = useUserSubmissions({ status: statusFilter, limit: 25 });

  const primaryCtaLabel = empty.ctaLabel ?? cta.label;
  const primaryCtaHref = cta.href;

  return (
    <Section padding="lg" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span>Filter by status:</span>
          <select
            value={statusFilter ?? "all"}
            onChange={(event) => {
              const value = event.target.value;
              setStatusFilter(value === "all" ? undefined : value);
            }}
            className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-text-primary focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="queued">Queued</option>
            <option value="running">Running</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div className="flex gap-2">
          {empty.backLabel && (
            <Button variant="secondary" asChild>
              <a href="/dashboard">{empty.backLabel}</a>
            </Button>
          )}
          <Button variant="primary" asChild>
            <a href={primaryCtaHref}>{primaryCtaLabel}</a>
          </Button>
        </div>
      </div>

      <SubmissionsTable
        submissions={submissionsData?.submissions}
        isLoading={isLoading}
        empty={{
          title: empty.title,
          description: empty.description,
          actionLabel: primaryCtaLabel,
          actionHref: primaryCtaHref,
        }}
      />
    </Section>
  );
}
