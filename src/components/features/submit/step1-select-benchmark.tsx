"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useBenchmarks } from "@/hooks/use-benchmarks";
import { useSubmissionStore } from "@/stores/submission-store";
import { BenchmarkCard } from "@/components/features/benchmark-card";
import { CardSkeleton } from "@/components/ui/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import type { Difficulty } from "@/types/models";
import { cn } from "@/lib/utils";

export function Step1SelectBenchmark() {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">("all");

  const { selectedBenchmarkId, selectBenchmark, setStep } = useSubmissionStore();

  const { data, isLoading } = useBenchmarks({
    search: search || undefined,
    difficulty: difficultyFilter !== "all" ? difficultyFilter : undefined,
  });

  const handleNext = () => {
    if (selectedBenchmarkId) {
      setStep(2);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search benchmarks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-surface pl-10 pr-4 text-sm focus:border-brand-primary focus:outline-none"
          />
        </div>

        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | "all")}
          className="h-10 rounded-lg border border-border bg-surface px-4 text-sm focus:border-brand-primary focus:outline-none"
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          <CardSkeleton count={4} />
        </div>
      ) : !data || data.benchmarks.length === 0 ? (
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
          {data.benchmarks.map((benchmark) => (
            <div
              key={benchmark.id}
              className={cn(
                "cursor-pointer rounded-lg transition-all",
                selectedBenchmarkId === benchmark.id && "ring-2 ring-brand-primary ring-offset-2"
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

      <div className="flex justify-end gap-3 border-t border-border pt-6">
        <Button onClick={handleNext} disabled={!selectedBenchmarkId} size="lg">
          Next: Configure Agent
        </Button>
      </div>
    </div>
  );
}
