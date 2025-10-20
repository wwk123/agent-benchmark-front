import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { LeaderboardClient } from "./leaderboard-client";

export default async function LeaderboardPage() {
  const t = await getTranslations("leaderboardPage");

  const hero = t.raw("hero") as {
    badge?: string;
    title: string;
    description: string;
    actions?: Array<{ label: string; href: string; variant?: string }>;
  };

  const filters = t.raw("filters") as {
    benchmark: {
      label: string;
      placeholder: string;
      allLabel: string;
    };
    version: {
      label: string;
      placeholder: string;
      latestLabel: string;
    };
    channel: {
      label: string;
      options: {
        all: string;
        self: string;
        iexec: string;
      };
    };
    time: {
      label: string;
      options: Record<string, string>;
    };
    resetLabel: string;
    hint: string;
    fallbackBenchmarks: Array<{ id: string; label: string }>;
  };

  const table = t.raw("table") as {
    columns: {
      rank: string;
      agent: string;
      benchmark: string;
      score: string;
      completion: string;
      lastRun: string;
      channel: string;
      proof?: string;
    };
    runUnit: string;
    fallbackRows: Array<{
      rank: number;
      agent: string;
      benchmark: string;
      score: string;
      completion: string;
      lastRun: string;
      channel: string;
      proof?: {
        anchorLabel?: string;
        anchorUrl?: string;
        artifactLabel?: string;
        artifactUrl?: string;
        dealId?: string;
        taskId?: string;
      };
    }>;
    proofFallback?: string;
    empty: {
      title: string;
      description: string;
      actionLabel?: string;
    };
  };

  const stats = t.raw("stats") as {
    title: string;
    descriptors: Array<{
      id: "participants" | "submissions" | "topScore" | "averageScore";
      label: string;
      placeholder: string;
    }>;
  };

  const summary = t.raw("summary") as {
    title: string;
    anchor: { title: string; description: string };
    artifacts: { title: string; description: string };
    explorer: { title: string; description: string };
  };

  const proofLabels = t.raw("proofLabels") as {
    anchor: string;
    artifact: string;
  };

  const legend = t.raw("legend") as {
    score: string;
    channel: {
      hybrid: string;
      iexec: string;
      self: string;
    };
  };

  const categoryTabs = t.raw("categoryTabs") as {
    categories: Array<{ id: string; label: string }>;
    leaderboards: Record<
      string,
      Array<{
        rank: number;
        agent: string;
        benchmark: string;
        score: string;
        lastRun: string;
        proof?: {
          anchorLabel?: string;
          anchorUrl?: string;
          artifactLabel?: string;
          artifactUrl?: string;
          dealId?: string;
          taskId?: string;
        };
      }>
    >;
  };

  // Transform leaderboards object into array format for CategoryLeaderboardTabs
  const categoryLeaderboardData = Object.entries(categoryTabs.leaderboards).map(
    ([categoryId, entries]) => ({
      categoryId,
      entries: entries.map((entry) => ({
        ...entry,
        reportUrl: entry.proof?.anchorUrl || entry.proof?.artifactUrl || "#",
      })),
    })
  );

  const categoryTabsFormatted = {
    categories: categoryTabs.categories.filter((cat) => cat.id !== "all"),
    data: categoryLeaderboardData,
    emptyMessage: table.empty.description,
    columns: {
      rank: table.columns.rank,
      agent: table.columns.agent,
      benchmark: table.columns.benchmark,
      score: table.columns.score,
      lastRun: table.columns.lastRun,
      report: proofLabels.anchor,
    },
    actions: {
      viewReport: proofLabels.anchor,
    },
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

      <Section id="leaderboard-table" padding="lg" className="bg-surface">
        <div className="layout-container space-y-8">
          <LeaderboardClient
            columns={table.columns}
            filtersCopy={{
              benchmark: {
                label: filters.benchmark.label,
                placeholder: filters.benchmark.placeholder,
                allLabel: filters.benchmark.allLabel,
              },
              version: filters.version,
              channel: filters.channel,
              time: {
                label: filters.time.label,
                options: filters.time.options as Record<"24h" | "7d" | "30d" | "all", string>,
              },
              resetLabel: filters.resetLabel,
              hint: filters.hint,
            }}
            statsCopy={stats}
            summaryCopy={summary}
            fallbackRows={table.fallbackRows}
            fallbackBenchmarks={filters.fallbackBenchmarks}
            runUnit={table.runUnit}
            proofFallback={table.proofFallback}
            proofLabels={proofLabels}
            emptyCopy={table.empty}
            legend={legend}
            categoryTabs={categoryTabsFormatted}
          />
        </div>
      </Section>
    </>
  );
}
