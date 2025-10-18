"use client";

import clsx from "clsx";

type LeaderboardRow = {
  rank: number;
  agent: string;
  benchmark: string;
  score: string;
  completion: string;
  lastRun: string;
  channel: string;
};

type LeaderboardTableProps = {
  columns: {
    rank: string;
    agent: string;
    benchmark: string;
    score: string;
    completion: string;
    lastRun: string;
    channel: string;
  };
  rows: LeaderboardRow[];
};

const channelBadgeClassMap: Record<string, string> = {
  Hybrid: "bg-brand-accent/15 text-brand-primary",
  混合: "bg-brand-accent/15 text-brand-primary",
  "iExec": "bg-brand-highlight/15 text-brand-highlight",
  self: "bg-text-muted/10 text-text-muted",
};

export function LeaderboardTable({ columns, rows }: LeaderboardTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface-contrast shadow-card">
      <table className="min-w-full divide-y divide-border/70">
        <thead className="bg-surface-muted/80">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
            <th className="px-6 py-3">{columns.rank}</th>
            <th className="px-6 py-3">{columns.agent}</th>
            <th className="px-6 py-3">{columns.benchmark}</th>
            <th className="px-6 py-3">{columns.score}</th>
            <th className="px-6 py-3">{columns.completion}</th>
            <th className="px-6 py-3">{columns.lastRun}</th>
            <th className="px-6 py-3">{columns.channel}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60 text-sm text-text-secondary">
          {rows.map((row) => (
            <tr key={`${row.rank}-${row.agent}`} className="transition-colors hover:bg-surface-muted/60">
              <td className="px-6 py-4 font-semibold text-brand-primary">{row.rank}</td>
              <td className="px-6 py-4">
                <div className="font-medium text-text-primary">{row.agent}</div>
              </td>
              <td className="px-6 py-4">{row.benchmark}</td>
              <td className="px-6 py-4 font-semibold text-brand-primary">{row.score}</td>
              <td className="px-6 py-4">{row.completion}</td>
              <td className="px-6 py-4">{row.lastRun}</td>
              <td className="px-6 py-4">
                <span
                  className={clsx(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                    channelBadgeClassMap[row.channel] ?? "bg-surface-muted text-text-muted",
                  )}
                >
                  {row.channel}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
