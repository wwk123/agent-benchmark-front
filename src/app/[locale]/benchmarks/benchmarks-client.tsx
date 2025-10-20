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
  name: string;
  benchmarkId: string;
  category: string;
  description: string;
  rubricTags: string[];
  executionStrategy: string;
  questionCount: number;
  updatedAt: string;
};

type BenchmarksClientProps = {
  defaultCategories: Category[];
  fallbackItems: ViewItem[];
  emptyMessage: string;
  searchPlaceholder: string;
  tableCopy: {
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
  filters?: BenchmarkFilters;
};

export function BenchmarksClient({
  defaultCategories,
  fallbackItems,
  emptyMessage,
  searchPlaceholder,
  tableCopy,
  filters,
}: BenchmarksClientProps) {
  const { data, isLoading, isFetching } = useBenchmarks(filters);

  const normalizedCategories = useMemo<Category[]>(() => {
    const map = new Map(defaultCategories.map((cat) => [cat.id, cat]));

    if (data?.benchmarks) {
      data.benchmarks.forEach((benchmark) => {
        const categoryId = benchmark.category || benchmark.tags?.[0]?.toLowerCase() || "general";
        if (!map.has(categoryId)) {
          map.set(categoryId, {
            id: categoryId,
            label: convertLabel(categoryId),
          });
        }
      });
    }

    return Array.from(map.values());
  }, [data?.benchmarks, defaultCategories]);

  const normalizedItems = useMemo<ViewItem[]>(() => {
    if (!data?.benchmarks) {
      return fallbackItems;
    }

    return data.benchmarks.map((benchmark) => ({
      id: benchmark.id,
      name: benchmark.title,
      benchmarkId: benchmark.benchmarkId || `${benchmark.id}@latest`,
      category: benchmark.category || benchmark.tags?.[0]?.toLowerCase() || "general",
      description: benchmark.description,
      rubricTags: benchmark.rubricTags || benchmark.tags || [],
      executionStrategy: benchmark.executionStrategy || "Hybrid execution",
      questionCount: benchmark.questionCount,
      updatedAt: formatDate(benchmark.updatedAt),
    }));
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
          searchPlaceholder={searchPlaceholder}
          tableCopy={tableCopy}
        />
      )}
    </div>
  );
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
