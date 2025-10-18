import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";

export default async function LeaderboardPage() {
  const t = await getTranslations("leaderboardPage");

  const hero = t.raw("hero") as {
    badge?: string;
    title: string;
    description: string;
    actions?: Array<{ label: string; href: string; variant?: string }>;
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
    };
    rows: Array<{
      rank: number;
      agent: string;
      benchmark: string;
      score: string;
      completion: string;
      lastRun: string;
      channel: string;
    }>;
  };

  const legend = t.raw("legend") as {
    score: string;
    channel: {
      hybrid: string;
      iexec: string;
      self: string;
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

      <Section id="leaderboard-table" padding="md">
        <LeaderboardTable columns={table.columns} rows={table.rows} />
      </Section>

      <Section id="legend" padding="sm">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface-contrast p-6 shadow-card lg:col-span-2">
            <h3 className="text-lg font-semibold text-brand-primary">{table.columns.score}</h3>
            <p className="mt-2 text-sm text-text-secondary">{legend.score}</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface-contrast p-6 shadow-card space-y-3">
            <h3 className="text-lg font-semibold text-brand-primary">{table.columns.channel}</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>{legend.channel.hybrid}</li>
              <li>{legend.channel.iexec}</li>
              <li>{legend.channel.self}</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
