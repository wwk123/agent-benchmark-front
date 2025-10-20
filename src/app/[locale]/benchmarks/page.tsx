import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { BenchmarksClient } from "./benchmarks-client";

type BenchmarkCategory = {
  id: string;
  label: string;
};

type BenchmarkItem = {
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

export default async function BenchmarksPage() {
  const t = await getTranslations("benchmarks");

  const hero = t.raw("hero") as {
    badge?: string;
    title: string;
    description: string;
    actions?: Array<{ label: string; href: string; variant?: string }>;
  };

  const filters = t.raw("filters") as {
    label: string;
    categories: BenchmarkCategory[];
  };

  const items = t.raw("items") as BenchmarkItem[];
  const empty = t("empty");
  const searchPlaceholder = t("searchPlaceholder");

  const table = t.raw("table") as {
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

  return (
    <>
      <PageHero
        badge={hero.badge}
        title={hero.title}
        description={hero.description}
        actions={hero.actions?.map((action) => ({
          ...action,
          variant: (action.variant as "primary" | "secondary" | "tertiary" | "ghost" | "danger") ?? "primary",
        }))}
      />

      <Section
        id="catalog"
        title={filters.label}
        description={t("catalogDescription")}
        padding="md"
      >
        <BenchmarksClient
          defaultCategories={filters.categories}
          fallbackItems={items}
          emptyMessage={empty}
          searchPlaceholder={searchPlaceholder}
          tableCopy={table}
        />
      </Section>
    </>
  );
}
