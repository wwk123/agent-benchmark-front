"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export type BenchmarkTableItem = {
  id: string;
  name: string;
  benchmarkId: string;
  category: string;
  description: string;
  rubricTags: string[];
  executionStrategy: string;
  questionCount: number;
  updatedAt: string;
};

type BenchmarkTableProps = {
  items: BenchmarkTableItem[];
  emptyMessage: string;
  columns: {
    name: string;
    benchmarkId: string;
    category: string;
    description: string;
    rubricTags: string;
    executionStrategy: string;
    questionCount: string;
    updatedAt: string;
    actions: string;
  };
  actions: {
    viewLeaderboard: string;
    viewRubric: string;
  };
};

export function BenchmarkTable({ items, emptyMessage, columns, actions }: BenchmarkTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface-muted">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {columns.name}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {columns.benchmarkId}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {columns.category}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {columns.description}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {columns.rubricTags}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {columns.executionStrategy}
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {columns.questionCount}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {columns.updatedAt}
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {columns.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b border-border/50 transition-colors hover:bg-surface-muted/50 ${
                  index % 2 === 0 ? "bg-surface/50" : "bg-transparent"
                }`}
              >
                {/* Name */}
                <td className="p-4">
                  <div className="font-medium text-brand-primary">{item.name}</div>
                </td>

                {/* Benchmark ID */}
                <td className="p-4">
                  <code className="rounded bg-surface-muted px-2 py-1 text-xs font-mono text-text-secondary">
                    {item.benchmarkId}
                  </code>
                </td>

                {/* Category */}
                <td className="p-4">
                  <span className="inline-flex rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary">
                    {item.category}
                  </span>
                </td>

                {/* Description */}
                <td className="p-4 max-w-xs">
                  <p className="line-clamp-2 text-sm text-text-secondary">{item.description}</p>
                </td>

                {/* Rubric Tags */}
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {item.rubricTags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex rounded-md border border-brand-primary/30 bg-brand-primary/10 px-2 py-0.5 text-xs text-brand-primary"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.rubricTags.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 text-xs text-text-muted">
                        +{item.rubricTags.length - 3}
                      </span>
                    )}
                  </div>
                </td>

                {/* Execution Strategy */}
                <td className="p-4">
                  <span className="text-xs text-text-secondary">{item.executionStrategy}</span>
                </td>

                {/* Question Count */}
                <td className="p-4 text-center">
                  <span className="inline-flex items-center justify-center rounded-full bg-surface-muted px-3 py-1 text-sm font-semibold text-text-primary">
                    {item.questionCount}
                  </span>
                </td>

                {/* Updated At */}
                <td className="p-4">
                  <span className="text-xs text-text-muted">{item.updatedAt}</span>
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="whitespace-nowrap text-xs"
                      asChild
                    >
                      <Link href={`/leaderboard?benchmark=${item.benchmarkId}`}>
                        {actions.viewLeaderboard}
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="whitespace-nowrap text-xs"
                      asChild
                    >
                      <a
                        href={`#rubric-${item.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1"
                      >
                        {actions.viewRubric}
                        <ExternalLink className="size-3" />
                      </a>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
