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
        />
      </Section>
    </>
  );
}
