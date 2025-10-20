"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { BenchmarkTable, type BenchmarkTableItem } from "./benchmark-table";
import { Search } from "lucide-react";

type BenchmarkCategory = {
  id: string;
  label: string;
};

type BenchmarkExplorerProps = {
  categories: BenchmarkCategory[];
  items: BenchmarkTableItem[];
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
};

export function BenchmarkExplorer({
  categories,
  items,
  emptyMessage,
  searchPlaceholder,
  tableCopy,
}: BenchmarkExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id ?? "all");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleItems = useMemo(() => {
    let result = activeCategory === "all" ? items : items.filter((item) => item.category === activeCategory);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.benchmarkId.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.rubricTags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [activeCategory, items, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-muted" aria-hidden="true" />
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface-elevated py-3 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "primary" : "secondary"}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Benchmark Table */}
      <BenchmarkTable
        items={visibleItems}
        emptyMessage={emptyMessage}
        columns={tableCopy.columns}
        actions={tableCopy.actions}
      />
    </div>
  );
}
