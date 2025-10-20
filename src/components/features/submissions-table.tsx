"use client";

import { Link } from "@/navigation";
import type { Submission } from "@/types/models";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { TableSkeleton } from "@/components/ui/loading-skeleton";
import { cn } from "@/lib/utils";

type SubmissionsTableProps = {
  submissions?: Submission[];
  isLoading?: boolean;
  empty: {
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
  };
  footerAction?: {
    label: string;
    href: string;
  };
};

export function SubmissionsTable({ submissions, isLoading = false, empty, footerAction }: SubmissionsTableProps) {
  if (isLoading) {
    return <TableSkeleton rows={6} columns={6} />;
  }

  if (!submissions || submissions.length === 0) {
    return (
      <EmptyState
        title={empty.title}
        description={empty.description}
        action={
          empty.actionLabel && empty.actionHref
            ? {
                label: empty.actionLabel,
                onClick: () => {
                  window.open(empty.actionHref, "_blank", "noopener,noreferrer");
                },
              }
            : undefined
        }
        illustrationKey="sparkles"
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <table className="min-w-full divide-y divide-border/80">
        <thead className="bg-surface-muted/80">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
            <th className="px-6 py-3">Submission</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Benchmark</th>
            <th className="px-6 py-3">Score</th>
            <th className="px-6 py-3">Channel</th>
            <th className="px-6 py-3 text-right">Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70 text-sm text-text-secondary">
          {submissions.map((submission) => (
            <tr key={submission.id} className="transition-colors hover:bg-surface-muted/60">
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <Link href={`/submissions/${submission.id}`} className="font-semibold text-text-primary hover:text-brand-primary">
                    #{submission.id.slice(0, 8)}
                  </Link>
                  <p className="text-xs text-text-muted">{formatCost(submission.cost)}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={submission.status} />
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <p className="font-medium text-text-primary">{submission.benchmarkTitle}</p>
                  {submission.benchmarkVersion && (
                    <p className="text-xs text-text-muted">v{submission.benchmarkVersion}</p>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-brand-primary">
                {submission.score !== null ? submission.score.toFixed(2) : "—"}
              </td>
              <td className="px-6 py-4">
                <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-medium", badgeClassForChannel(submission.executionChannel))}>
                  {formatChannel(submission.executionChannel)}
                </span>
              </td>
              <td className="px-6 py-4 text-right text-xs text-text-muted">
                {formatTimestamp(submission.completedAt || submission.startedAt || submission.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {footerAction && (
        <div className="border-t border-border/80 bg-surface px-6 py-3 text-right">
          <Button variant="ghost" asChild>
            <Link href={footerAction.href}>{footerAction.label}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

function formatTimestamp(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function formatChannel(channel: Submission["executionChannel"]) {
  if (channel === "self-miner") return "Self-miner";
  if (channel === "iexec") return "iExec";
  return channel;
}

function badgeClassForChannel(channel: Submission["executionChannel"]) {
  return channel === "iexec"
    ? "bg-brand-highlight/15 text-brand-highlight"
    : "bg-brand-accent/15 text-brand-primary";
}

function formatCost(cost: number) {
  return `${cost.toFixed(2)} RLC`;
}
