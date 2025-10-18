import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { GradientCard } from "@/components/ui/gradient-card";
import { getIllustration } from "@/lib/illustrations";

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

      <Section id="leaderboard-table" padding="lg" className="bg-surface">
        <div className="layout-container">
          <GradientCard className="space-y-6 p-8 shadow-brand-glow hover:-translate-y-1 hover:shadow-cta-focus">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-wide text-surface-contrast/80">{hero.badge}</p>
                <h2 className="text-3xl font-semibold text-surface-contrast">{hero.title}</h2>
              </div>
              <Image
                src={getIllustration("benchmarkHero", "light")}
                alt=""
                width={80}
                height={80}
                className="size-20 animate-float-slow"
              />
            </div>
            <LeaderboardTable columns={table.columns} rows={table.rows} />
          </GradientCard>
        </div>
      </Section>

      <Section id="legend" padding="sm" className="bg-surface">
        <div className="grid gap-6 lg:grid-cols-3">
          <GradientCard className="lg:col-span-2 space-y-3">
            <h3 className="text-lg font-semibold text-surface-contrast">{table.columns.score}</h3>
            <p className="text-sm text-surface-contrast/80">{legend.score}</p>
          </GradientCard>
          <GradientCard className="space-y-3">
            <h3 className="text-lg font-semibold text-surface-contrast">{table.columns.channel}</h3>
            <ul className="space-y-2 text-sm text-surface-contrast/80">
              <li>{legend.channel.hybrid}</li>
              <li>{legend.channel.iexec}</li>
              <li>{legend.channel.self}</li>
            </ul>
          </GradientCard>
        </div>
      </Section>
    </>
  );
}
