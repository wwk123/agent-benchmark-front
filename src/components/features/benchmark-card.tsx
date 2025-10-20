/**
 * BenchmarkCard - Display benchmark information in card format
 * Based on approved Stage 2 plan
 */

import type { Route } from "next";
import type { ReactNode } from "react";
import { Clock, FileText, Shield } from "lucide-react";
import type { Benchmark } from "@/types/models";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

export type BenchmarkCardProps = {
  benchmark: Benchmark;
  className?: string;
  illustration?: ReactNode;
};

const DIFFICULTY_CONFIG = {
  easy: {
    label: "Easy",
    color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  },
  medium: {
    label: "Medium",
    color: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  },
  hard: {
    label: "Hard",
    color: "bg-rose-500/20 text-rose-300 border-rose-500/40",
  },
} as const;

export function BenchmarkCard({ benchmark, className, illustration }: BenchmarkCardProps) {
  const difficultyConfig = DIFFICULTY_CONFIG[benchmark.difficulty];
  const detailRoute = `/benchmarks/${benchmark.id}` as Route;

  return (
    <article
      className={cn(
        "card group relative h-full space-y-4 overflow-hidden p-6 transition-shadow hover:shadow-card-strong",
        className
      )}
    >
      {illustration && (
        <div className="pointer-events-none absolute -right-6 -top-10 hidden size-32 animate-float-slow opacity-70 blur-sm sm:block">
          {illustration}
        </div>
      )}
      {/* Header with Difficulty Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-1">
          <h3 className="font-heading text-xl font-semibold text-brand-primary group-hover:text-brand-accent transition-colors">
            <Link href={detailRoute}>
              {benchmark.title}
            </Link>
          </h3>
          <p className="text-xs text-text-muted font-mono">
            {benchmark.benchmarkId}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium",
            difficultyConfig.color
          )}
        >
          {difficultyConfig.label}
        </span>
      </div>

      {/* Description */}
      <p className="line-clamp-2 text-sm text-text-secondary">
        {benchmark.description}
      </p>

      {/* Stats Row */}
      <div className="flex items-center gap-4 text-sm text-text-muted">
        <div className="flex items-center gap-1.5">
          <FileText className="size-4" aria-hidden="true" />
          <span>{benchmark.questionCount} questions</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="size-4" aria-hidden="true" />
          <span>
            {`~${Math.ceil(benchmark.questionCount / 10)}-${Math.ceil(benchmark.questionCount / 5)} hrs`}
          </span>
        </div>
      </div>

      {/* Rubric Tags */}
      {benchmark.rubricTags && benchmark.rubricTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {benchmark.rubricTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-md bg-brand-primary/10 border border-brand-primary/30 px-2 py-1 text-xs text-brand-primary font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Execution Strategy */}
      <div className="flex items-start gap-2 text-xs text-text-secondary">
        <Shield className="size-4 shrink-0 mt-0.5" aria-hidden="true" />
        <span>{benchmark.executionStrategy}</span>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-2 rounded-lg bg-surface-muted p-3">
        <p className="text-xs font-medium text-text-secondary">Estimated Cost:</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {benchmark.executionChannels.includes("self-miner") && (
            <div>
              <span className="text-text-muted">Self-Miner: </span>
              <span className="font-semibold text-text-primary">
                {benchmark.estimatedCost.selfMiner} RLC
              </span>
            </div>
          )}
          {benchmark.executionChannels.includes("iexec") && (
            <div>
              <span className="text-text-muted">iExec: </span>
              <span className="font-semibold text-text-primary">
                {benchmark.estimatedCost.iexec} RLC
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button variant="secondary" size="sm" className="flex-1" asChild>
          <Link href={detailRoute}>
            View Details
          </Link>
        </Button>
        <Button size="sm" className="flex-1" asChild>
          <Link href={{ pathname: "/submit", query: { benchmark: benchmark.id } }}>
            Submit Agent
          </Link>
        </Button>
      </div>
    </article>
  );
}
