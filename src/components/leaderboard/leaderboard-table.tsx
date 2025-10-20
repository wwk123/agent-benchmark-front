"use client";

import clsx from "clsx";

type LeaderboardProof = {
  anchorLabel?: string;
  anchorUrl?: string;
  artifactLabel?: string;
  artifactUrl?: string;
  dealId?: string;
  taskId?: string;
};

type LeaderboardRow = {
  rank: number;
  agent: string;
  benchmark: string;
  score: string;
  completion: string;
  lastRun: string;
  channel: string;
  proof?: LeaderboardProof;
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
    proof?: string;
  };
  rows: LeaderboardRow[];
  proofFallback?: string;
};

const channelBadgeClassMap: Record<string, string> = {
  Hybrid: "bg-brand-accent/15 text-brand-primary",
  混合: "bg-brand-accent/15 text-brand-primary",
  "iExec": "bg-brand-highlight/15 text-brand-highlight",
  "iExec Network": "bg-brand-highlight/15 text-brand-highlight",
  "iExec network": "bg-brand-highlight/15 text-brand-highlight",
  "Self-Miner": "bg-text-muted/10 text-text-muted",
  "Self-miner": "bg-text-muted/10 text-text-muted",
  self: "bg-text-muted/10 text-text-muted",
};

export function LeaderboardTable({ columns, rows, proofFallback }: LeaderboardTableProps) {
  return (
  <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-card">
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
            {columns.proof && <th className="px-6 py-3">{columns.proof}</th>}
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
              {columns.proof && (
                <td className="px-6 py-4">
                  {row.proof ? (
                    <div className="space-y-2 text-xs leading-relaxed text-text-secondary">
                      {row.proof.anchorUrl && (
                        <a
                          className="inline-flex items-center gap-1 text-brand-primary hover:text-brand-highlight"
                          href={row.proof.anchorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {row.proof.anchorLabel ?? row.proof.anchorUrl}
                        </a>
                      )}
                      {row.proof.artifactUrl && (
                        <a
                          className="inline-flex items-center gap-1 text-brand-primary hover:text-brand-highlight"
                          href={row.proof.artifactUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {row.proof.artifactLabel ?? row.proof.artifactUrl}
                        </a>
                      )}
                      {(row.proof.dealId || row.proof.taskId) && (
                        <div className="space-y-1 text-text-muted">
                          {row.proof.dealId && <div>dealId: {row.proof.dealId}</div>}
                          {row.proof.taskId && <div>taskId: {row.proof.taskId}</div>}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-text-muted">{proofFallback ?? "—"}</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
