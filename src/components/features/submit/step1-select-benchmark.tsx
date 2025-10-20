"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import { useBenchmarks, useBenchmarkDetail } from "@/hooks/use-benchmarks";
import { useSubmissionStore } from "@/stores/submission-store";
import { BenchmarkCard } from "@/components/features/benchmark-card";
import { CardSkeleton, Skeleton } from "@/components/ui/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import type { Difficulty } from "@/types/models";
import { cn } from "@/lib/utils";

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export function Step1SelectBenchmark() {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">("all");

  const {
    selectedBenchmarkId,
    selectBenchmark,
    benchmarkVersion,
    setBenchmarkVersion,
    leaderboardOptIn,
    setLeaderboardOptIn,
    setStep,
  } = useSubmissionStore();

  const { data, isLoading } = useBenchmarks({
    search: search || undefined,
    difficulty: difficultyFilter !== "all" ? difficultyFilter : undefined,
    limit: 20,
  });

  const {
    data: benchmarkDetail,
    isLoading: isBenchmarkDetailLoading,
  } = useBenchmarkDetail(selectedBenchmarkId ?? "", {
    enabled: Boolean(selectedBenchmarkId),
  });

  useEffect(() => {
    if (!benchmarkDetail) return;

    const availableVersions = benchmarkDetail.versions.map((version) => version.version);
    const defaultVersion = benchmarkDetail.currentVersion ?? availableVersions[0];

    if (defaultVersion && (!benchmarkVersion || !availableVersions.includes(benchmarkVersion))) {
      setBenchmarkVersion(defaultVersion);
    }
  }, [benchmarkDetail, benchmarkVersion, setBenchmarkVersion]);

  const handleNext = () => {
    if (selectedBenchmarkId && benchmarkVersion) {
      setStep(2);
    }
  };

  const versionOptions = benchmarkDetail?.versions ?? [];
  const disableNext = !selectedBenchmarkId || !benchmarkVersion;

  const filteredBenchmarks = useMemo(() => data?.benchmarks ?? [], [data?.benchmarks]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search benchmarks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-surface pl-10 pr-4 text-sm transition focus:border-brand-accent focus:outline-none focus:shadow-cta-focus"
          />
        </div>

        <select
          value={difficultyFilter}
          onChange={(event) => setDifficultyFilter(event.target.value as Difficulty | "all")}
          className="h-10 rounded-lg border border-border bg-surface px-4 text-sm text-text-primary transition focus:border-brand-accent focus:outline-none focus:shadow-brand-glow"
        >
          <option value="all">All difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          <CardSkeleton count={4} />
        </div>
      ) : filteredBenchmarks.length === 0 ? (
        <EmptyState
          variant="search"
          title="No benchmarks found"
          description="Try adjusting your search or filters"
          action={{
            label: "Clear filters",
            onClick: () => {
              setSearch("");
              setDifficultyFilter("all");
            },
          }}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredBenchmarks.map((benchmark) => (
            <div
              key={benchmark.id}
              className={cn(
                "cursor-pointer rounded-xl bg-surface-elevated/90 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-strong",
                selectedBenchmarkId === benchmark.id && "ring-2 ring-brand-primary ring-offset-2",
              )}
              role="button"
              tabIndex={0}
              onClick={() => selectBenchmark(benchmark.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectBenchmark(benchmark.id);
                }
              }}
            >
              <BenchmarkCard benchmark={benchmark} />
            </div>
          ))}
        </div>
      )}

      {selectedBenchmarkId && (
        <div className="space-y-4 rounded-2xl border border-border/70 bg-surface p-6">
          <div className="flex flex-wrap gap-4 md:items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-text-primary" htmlFor="benchmark-version">
                Benchmark version *
              </label>
              {isBenchmarkDetailLoading ? (
                <Skeleton variant="rectangular" height="44px" />
              ) : versionOptions.length > 0 ? (
                <select
                  id="benchmark-version"
                  value={benchmarkVersion ?? ""}
                  onChange={(event) => setBenchmarkVersion(event.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-surface px-4 text-sm text-text-primary transition focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                >
                  {versionOptions.map((version) => (
                    <option key={version.version} value={version.version}>
                      v{version.version} · {new Date(version.releaseDate).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-sm text-text-muted">No historical versions, defaulting to latest.</p>
              )}
            </div>

            <label className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={leaderboardOptIn}
                onChange={(event) => setLeaderboardOptIn(event.target.checked)}
                className="size-4 rounded border-border text-brand-primary focus:ring-brand-accent"
              />
              <span className="flex-1">
                Publish to leaderboard after audit
              </span>
            </label>
          </div>

          {benchmarkDetail && (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-text-primary">Scoring breakdown</p>
                <p className="text-xs text-text-muted">
                  Target score: {benchmarkDetail.scoringRules.passingScore} / {benchmarkDetail.scoringRules.maxScore}
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {benchmarkDetail.scoringRules.breakdown.map((item) => (
                  <div key={item.category} className="rounded-xl border border-border bg-surface-elevated px-4 py-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-text-primary">{item.category}</p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-accent/15 px-2 py-0.5 text-xs font-semibold text-brand-primary">
                        <Check className="size-3" /> {item.weight}%
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-text-muted">{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-text-muted">
                <span className="rounded-full bg-surface-elevated/80 px-3 py-1">
                  Difficulty: {benchmarkDetail.difficulty ? DIFFICULTY_LABELS[benchmarkDetail.difficulty as Difficulty] : "N/A"}
                </span>
                <span className="rounded-full bg-surface-elevated/80 px-3 py-1">
                  Tasks: {benchmarkDetail.questionCount ?? "—"}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end gap-3 border-t border-border/80 pt-6">
        <Button onClick={handleNext} disabled={disableNext} size="lg">
          Next: Configure Agent
        </Button>
      </div>
    </div>
  );
}
