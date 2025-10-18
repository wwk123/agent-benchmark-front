"use client";

import { useMemo } from "react";
import { useBenchmarks } from "@/hooks/use-benchmarks";
import type { BenchmarkFilters } from "@/types/models";
import { BenchmarkExplorer } from "@/components/benchmarks/benchmark-explorer";
import { CardSkeleton } from "@/components/ui/loading-skeleton";

type Category = {
  id: string;
  label: string;
};

type ViewItem = {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  channel: string;
  duration: string;
  rewardRange: string;
  updatedAt: string;
  description: string;
  metrics: string[];
};

type BenchmarksClientProps = {
  defaultCategories: Category[];
  fallbackItems: ViewItem[];
  emptyMessage: string;
  filters?: BenchmarkFilters;
};

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "Beginner",
  medium: "Intermediate",
  hard: "Advanced",
};

export function BenchmarksClient({
  defaultCategories,
  fallbackItems,
  emptyMessage,
  filters,
}: BenchmarksClientProps) {
  const { data, isLoading, isFetching } = useBenchmarks(filters);

  const normalizedCategories = useMemo<Category[]>(() => {
    const map = new Map(defaultCategories.map((cat) => [cat.id, cat]));

    if (data?.benchmarks) {
      data.benchmarks.forEach((benchmark) => {
        const primaryTag = benchmark.tags?.[0];
        if (primaryTag) {
          const id = primaryTag.toLowerCase();
          if (!map.has(id)) {
            map.set(id, {
              id,
              label: convertLabel(primaryTag),
            });
          }
        }
      });
    }

    return Array.from(map.values());
  }, [data?.benchmarks, defaultCategories]);

  const normalizedItems = useMemo<ViewItem[]>(() => {
    if (!data?.benchmarks) {
      return fallbackItems;
    }

    return data.benchmarks.map((benchmark) => {
      const primaryTag = benchmark.tags?.[0]?.toLowerCase() ?? "general";
      const difficulty = DIFFICULTY_LABEL[benchmark.difficulty] ?? benchmark.difficulty;
      const channel =
        benchmark.executionChannels.length > 0
          ? benchmark.executionChannels
              .map((chan) => (chan === "self-miner" ? "Self-miner" : chan === "iexec" ? "iExec" : "Hybrid"))
              .join(" / ")
          : "Hybrid";
      const rewardRange = formatRewardRange(benchmark.estimatedCost.selfMiner, benchmark.estimatedCost.iexec);

      return {
        id: benchmark.id,
        title: benchmark.title,
        category: primaryTag,
        difficulty,
        channel,
        duration: `≈ ${benchmark.questionCount} tasks`,
        rewardRange,
        updatedAt: formatDate(benchmark.updatedAt),
        description: benchmark.description,
        metrics: benchmark.tags.length > 0 ? benchmark.tags : ["ResultAnchor ready"],
      };
    });
  }, [data?.benchmarks, fallbackItems]);

  const showSkeleton = (isLoading || isFetching) && !data?.benchmarks?.length;

  return (
    <div className="space-y-8">
      {showSkeleton ? (
        <CardSkeleton count={3} />
      ) : (
        <BenchmarkExplorer
          categories={normalizedCategories}
          items={normalizedItems}
          emptyMessage={emptyMessage}
        />
      )}
    </div>
  );
}

function formatRewardRange(selfMinerCost: number, iexecCost: number) {
  if (selfMinerCost && iexecCost) {
    const min = Math.min(selfMinerCost, iexecCost).toFixed(1);
    const max = Math.max(selfMinerCost, iexecCost).toFixed(1);
    return `${min} - ${max} RLC`;
  }
  if (selfMinerCost) {
    return `${selfMinerCost.toFixed(1)} RLC`;
  }
  if (iexecCost) {
    return `${iexecCost.toFixed(1)} RLC`;
  }
  return "—";
}

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

function convertLabel(tag: string) {
  return tag
    .split(/[-_]/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
