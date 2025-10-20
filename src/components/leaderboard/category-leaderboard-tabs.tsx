"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { ExternalLink } from "lucide-react";

type CategoryTab = {
  id: string;
  label: string;
};

type LeaderboardEntry = {
  rank: number;
  agent: string;
  benchmark: string;
  score: string;
  lastRun: string;
  reportUrl: string;
};

type CategoryLeaderboardData = {
  categoryId: string;
  entries: LeaderboardEntry[];
};

type CategoryLeaderboardTabsProps = {
  categories: CategoryTab[];
  data: CategoryLeaderboardData[];
  emptyMessage: string;
  columns: {
    rank: string;
    agent: string;
    benchmark: string;
    score: string;
    lastRun: string;
    report: string;
  };
  actions: {
    viewReport: string;
  };
};

export function CategoryLeaderboardTabs({
  categories,
  data,
  emptyMessage,
  columns,
  actions,
}: CategoryLeaderboardTabsProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id ?? "");

  const activeData = data.find((d) => d.categoryId === activeCategory);
  const entries = activeData?.entries ?? [];

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "primary" : "secondary"}
            onClick={() => setActiveCategory(category.id)}
            className="transition-all"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Leaderboard Table */}
      {entries.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface p-12 text-center">
          <p className="text-text-muted">{emptyMessage}</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface-elevated">
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">
                  {columns.rank}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">
                  {columns.agent}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">
                  {columns.benchmark}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">
                  {columns.score}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">
                  {columns.lastRun}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">
                  {columns.report}
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr
                  key={`${entry.agent}-${entry.rank}`}
                  className={`border-b border-border last:border-b-0 transition-colors hover:bg-surface-elevated/50 ${
                    index % 2 === 0 ? "bg-surface" : "bg-surface-elevated/30"
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {entry.rank <= 3 && (
                        <span className="text-lg">
                          {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉"}
                        </span>
                      )}
                      <span className="font-semibold text-text-primary">{entry.rank}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-text-primary">{entry.agent}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-text-secondary">
                      {entry.benchmark}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-brand-primary/10 px-2 py-1 text-sm font-semibold text-brand-primary">
                      {entry.score}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-text-secondary">{entry.lastRun}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={entry.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-brand-primary hover:underline"
                    >
                      {actions.viewReport}
                      <ExternalLink className="size-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
