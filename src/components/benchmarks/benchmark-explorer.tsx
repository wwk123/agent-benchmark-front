"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type BenchmarkCategory = {
  id: string;
  label: string;
};

type BenchmarkItem = {
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

type BenchmarkExplorerProps = {
  categories: BenchmarkCategory[];
  items: BenchmarkItem[];
  emptyMessage: string;
};

export function BenchmarkExplorer({ categories, items, emptyMessage }: BenchmarkExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id ?? "all");

  const visibleItems = useMemo(() => {
    if (activeCategory === "all") {
      return items;
    }
    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  return (
    <div className="space-y-8">
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

      <div className="grid gap-6 lg:grid-cols-2">
        {visibleItems.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center text-text-muted">
            {emptyMessage}
          </div>
        ) : (
          visibleItems.map((item) => <BenchmarkCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}

function BenchmarkCard({ item }: { item: BenchmarkItem }) {
  return (
    <article className="card h-full space-y-6 p-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wide text-text-muted">
          <span className="rounded-full bg-surface-muted px-3 py-1">{item.difficulty}</span>
          <span className="rounded-full bg-surface-muted px-3 py-1">{item.channel}</span>
          <span className="rounded-full bg-surface-muted px-3 py-1">{item.duration}</span>
          <span className="rounded-full bg-surface-muted px-3 py-1">{item.rewardRange}</span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-brand-primary">{item.title}</h3>
          <p className="text-sm text-text-secondary">{item.description}</p>
        </div>
      </header>
      <ul className="flex flex-wrap gap-2 text-sm text-text-muted">
        {item.metrics.map((metric) => (
          <li
            key={metric}
            className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand-primary"
          >
            {metric}
          </li>
        ))}
      </ul>
      <footer className="flex items-center justify-between text-xs text-text-muted">
        <span className="rounded-full bg-surface-muted px-2 py-1 capitalize">{item.category}</span>
        <span>Updated · {item.updatedAt}</span>
      </footer>
    </article>
  );
}
