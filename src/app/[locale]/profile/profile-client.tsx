"use client";

import { useMemo, useState } from "react";
import type { Route } from "next";
import { useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { MetricCard } from "@/components/ui/metric-card";
import { SubmissionsTable } from "@/components/features/submissions-table";
import { TransactionsList } from "@/components/features/transactions-list";
import { useUserStats, useWalletBalance, useWalletTransactions } from "@/hooks/use-user";
import { useUserSubmissions } from "@/hooks/use-submissions";

type ProfileTabCopy = {
  id: string;
  label: string;
  heading: string;
  body: string;
};

type ProfileClientProps = {
  tabs: ProfileTabCopy[];
  initialTab?: string;
};

export function ProfileClient({ tabs, initialTab }: ProfileClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(
    tabs.some((tab) => tab.id === initialTab) ? (initialTab as string) : tabs[0]?.id,
  );

  const { data: statsData } = useUserStats();
  const { data: walletBalance } = useWalletBalance();
  const {
    data: submissionsData,
    isLoading: submissionsLoading,
  } = useUserSubmissions({ limit: 10 });
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
  } = useWalletTransactions({ limit: 10 });

  const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  const overviewMetrics = useMemo(() => {
    if (!statsData || !walletBalance) {
      return [];
    }

    return [
      {
        label: "Total submissions",
        value: statsData.totalSubmissions.toString(),
        description: `${statsData.completedSubmissions} completed`,
      },
      {
        label: "Best score",
        value: statsData.bestScore !== null ? statsData.bestScore.toFixed(2) : "—",
        description: statsData.bestRank ? `Leaderboard rank #${statsData.bestRank}` : "No leaderboard rank yet",
      },
      {
        label: "Average score",
        value: statsData.averageScore.toFixed(2),
        description: `${statsData.totalSpent.toFixed(2)} RLC spent`,
      },
      {
        label: "Wallet balance",
        value: `${walletBalance.rlc.toFixed(2)} RLC`,
        description: `≈ ${walletBalance.usd.toFixed(2)} USD`,
      },
    ];
  }, [statsData, walletBalance]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    router.replace(`/profile?${params.toString()}` as Route);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={tab.id === activeTab ? "primary" : "secondary"}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {currentTab.id === "overview" && (
        <>
          <Section padding="sm" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              {overviewMetrics.map((metric) => (
                <MetricCard key={metric.label} label={metric.label} value={metric.value} orientation="vertical" />
              ))}
            </div>
          </Section>
          <Section padding="sm">
            <SubmissionsTable
              submissions={submissionsData?.submissions}
              isLoading={submissionsLoading}
              empty={{
                title: "No submissions yet",
                description: "Start a new run from the submission wizard to see it here.",
                actionLabel: "Open submission wizard",
                actionHref: "/submit",
              }}
              footerAction={{ label: "View all submissions", href: "/dashboard/submissions" }}
            />
          </Section>
        </>
      )}

      {currentTab.id === "submissions" && (
        <Section padding="sm">
          <SubmissionsTable
            submissions={submissionsData?.submissions}
            isLoading={submissionsLoading}
            empty={{
              title: "No submissions found",
              description: "Submit an agent to populate your submission history.",
              actionLabel: "Create submission",
              actionHref: "/submit",
            }}
            footerAction={{ label: "Go to dashboard archive", href: "/dashboard/submissions" }}
          />
        </Section>
      )}

      {currentTab.id === "billing" && (
        <Section padding="sm" className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-heading text-lg font-semibold text-brand-primary">Wallet snapshot</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <MetricCard
                label="Credits"
                value={`${walletBalance?.rlc.toFixed(2) ?? "0.00"} RLC`}
              />
              <MetricCard
                label="Fiat equivalent"
                value={walletBalance ? `$${walletBalance.usd.toFixed(2)}` : "$0.00"}
              />
              <MetricCard
                label="Last update"
                value={walletBalance ? new Date(walletBalance.lastUpdated).toLocaleString() : "—"}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-brand-primary">Recent transactions</h3>
            <TransactionsList
              transactions={transactionsData?.transactions}
              isLoading={transactionsLoading}
              empty={{
                title: "No transactions yet",
                description: "Payments, refunds and rewards will appear here.",
              }}
            />
          </div>
        </Section>
      )}
    </div>
  );
}
