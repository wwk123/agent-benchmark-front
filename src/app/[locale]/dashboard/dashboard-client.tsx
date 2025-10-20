"use client";

import { useMemo } from "react";
import { useUserStats, useWalletBalance } from "@/hooks/use-user";
import { useUserSubmissions } from "@/hooks/use-submissions";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { Section } from "@/components/layout/section";
import type { Submission } from "@/types/models";
import { SubmissionsTable } from "@/components/features/submissions-table";

type MetricCopy = {
  id: string;
  label: string;
  value: string;
  description: string;
};

type DashboardClientProps = {
  overviewCopy: {
    metrics: MetricCopy[];
  };
  submissionsCopy: {
    title: string;
    items: Array<{ id: string; name: string; status: string; updatedAt: string; channel: string }>;
    cta: { label: string; href: string };
  };
  actionsCopy: {
    title: string;
    items: Array<{ label: string; description: string; href: string }>;
    ctaLabel: string;
  };
  treasuryCopy: {
    title: string;
    description: string;
    entries: Array<{ id: string; label: string; value?: string }>;
    note?: string;
  };
  submissionsEmptyCopy: {
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
  };
};

export function DashboardClient({
  overviewCopy,
  submissionsCopy,
  actionsCopy,
  treasuryCopy,
  submissionsEmptyCopy,
}: DashboardClientProps) {
  const { data: statsData } = useUserStats();
  const { data: balanceData } = useWalletBalance();
  const {
    data: submissionsData,
    isLoading: submissionsLoading,
  } = useUserSubmissions({ limit: 5 });

  const metrics = useMemo(() => {
    return overviewCopy.metrics.map((metric) => {
      switch (metric.id) {
        case "activeSubmissions": {
          if (statsData) {
            const active = Math.max(
              statsData.totalSubmissions - statsData.completedSubmissions,
              0,
            );
            return {
              ...metric,
              value: `${active}`,
              description: `${statsData.completedSubmissions} completed · ${statsData.totalSubmissions} total`,
            };
          }
          break;
        }
        case "creditBalance": {
          if (balanceData) {
            return {
              ...metric,
              value: `${balanceData.rlc.toFixed(2)} RLC`,
              description: `≈ ${balanceData.usd.toFixed(2)} USD`,
            };
          }
          break;
        }
        case "successRate": {
          if (statsData && statsData.totalSubmissions > 0) {
            const rate = (statsData.completedSubmissions / statsData.totalSubmissions) * 100;
            return {
              ...metric,
              value: `${rate.toFixed(0)}%`,
              description: `Average score ${statsData.averageScore.toFixed(2)} · Best ${statsData.bestScore ?? "—"}`,
            };
          }
          break;
        }
        default:
          break;
      }
      return { ...metric };
    });
  }, [overviewCopy.metrics, statsData, balanceData]);

  const recentItems = useMemo(() => {
    if (!submissionsData?.submissions) return undefined;
    return submissionsData.submissions.map(mapSubmissionToOverviewItem);
  }, [submissionsData?.submissions]);

  const treasuryEntries = treasuryCopy.entries.map((entry) => {
    if (entry.id === "availableCredits" && balanceData) {
      return {
        ...entry,
        value: `${balanceData.rlc.toFixed(2)} RLC`,
      };
    }
    if (entry.id === "outstandingInvoices" && statsData) {
      return {
        ...entry,
        value: `${Math.max(statsData.totalSubmissions - statsData.completedSubmissions, 0)} pending`,
      };
    }
    return entry;
  });

  return (
    <>
      <DashboardOverview
        metrics={metrics}
        recentSubmissions={{
          title: submissionsCopy.title,
          items: recentItems ?? submissionsCopy.items,
          cta: submissionsCopy.cta,
        }}
        actions={actionsCopy}
      />

      <Section id="recent-submissions" padding="sm">
        <SubmissionsTable
          submissions={submissionsData?.submissions}
          isLoading={submissionsLoading}
          empty={submissionsEmptyCopy}
          footerAction={submissionsCopy.cta}
        />
      </Section>

      <Section id="treasury" padding="lg" className="bg-surface">
        <div className="card space-y-6 p-6">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-brand-primary">{treasuryCopy.title}</h2>
            <p className="mt-2 text-sm text-text-secondary">{treasuryCopy.description}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {treasuryEntries.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-border/60 bg-surface-elevated p-4 shadow-sm">
                <p className="text-sm font-medium text-text-secondary">{entry.label}</p>
                <p className="text-xl font-semibold text-brand-primary">{entry.value ?? "—"}</p>
              </div>
            ))}
          </div>
          {treasuryCopy.note && (
            <p className="text-xs text-text-muted">{treasuryCopy.note}</p>
          )}
        </div>
      </Section>
    </>
  );
}

function mapSubmissionToOverviewItem(submission: Submission) {
  const timestamp = submission.completedAt || submission.startedAt || submission.createdAt;
  const formattedTime = timestamp ? new Date(timestamp).toLocaleString() : "—";

  return {
    id: submission.id,
    name: submission.benchmarkTitle,
    status: submission.status,
    updatedAt: formattedTime,
    channel: submission.executionChannel === "self-miner" ? "Self-miner" : "iExec",
  };
}
