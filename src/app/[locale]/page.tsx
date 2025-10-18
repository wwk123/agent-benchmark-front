import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/ui/metric-card";
import { Section } from "@/components/layout/section";

type HomePageProps = {
  params: { locale: string };
};

type Metric = {
  label: string;
  value: string;
};

type FeatureItem = {
  title: string;
  description: string;
};

type WorkflowStep = FeatureItem;

export default async function HomePage({ params }: HomePageProps) {
  void params;
  const tHome = await getTranslations("home");
  const tCta = await getTranslations("cta");

  const heroMetrics = tHome.raw("hero.metrics") as Metric[];
  const featureItems = tHome.raw("features.items") as FeatureItem[];
  const workflowSteps = tHome.raw("workflow.steps") as WorkflowStep[];
  const callout = tHome.raw("callout") as FeatureItem & { primary: string; secondary: string };
  const leaderboard = tHome.raw("leaderboard") as FeatureItem & {
    cta: string;
    note: string;
  };

  return (
    <>
      <section className="relative overflow-hidden bg-surface">
        <div className="layout-container flex flex-col gap-12 py-20 lg:flex-row lg:items-center lg:py-28">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center rounded-full bg-brand-accent/10 px-4 py-2 text-sm font-medium text-brand-accent">
              {tHome("hero.tagline")}
            </span>
            <div className="space-y-4">
              <h1>{tHome("hero.title")}</h1>
              <p className="max-w-2xl text-lg text-text-secondary">{tHome("hero.subtitle")}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#submit">{tHome("hero.primary")}</Link>
              </Button>
              <Button variant="secondary" asChild size="lg">
                <Link href="#leaderboard">{tHome("hero.secondary")}</Link>
              </Button>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
            {heroMetrics.map((metric) => (
              <MetricCard key={metric.label} label={metric.label} value={metric.value} />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-brand-accent/5 via-transparent to-brand-primary/5" />
      </section>

      <Section id="features" title={tHome("features.title")}>
        <div className="grid gap-6 md:grid-cols-3">
          {featureItems.map((item) => (
            <article key={item.title} className="card h-full space-y-3 p-6">
              <h3 className="text-xl font-semibold text-brand-primary">{item.title}</h3>
              <p className="text-sm text-text-secondary">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="workflow" title={tHome("workflow.title")} description={tHome("workflow.caption")}>
        <ol className="grid gap-6 md:grid-cols-5">
          {workflowSteps.map((step, index) => (
            <li key={step.title} className="card h-full space-y-3 p-5">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-accent/15 text-base font-semibold text-brand-primary">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-brand-primary">{step.title}</h3>
              <p className="text-sm text-text-secondary">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="leaderboard"
        title={leaderboard.title}
        description={leaderboard.description}
        padding="sm"
      >
        <div className="card flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-brand-primary">{leaderboard.title}</h3>
            <p className="max-w-2xl text-sm text-text-secondary">{leaderboard.note}</p>
          </div>
          <Button variant="secondary" asChild>
            <Link href="#leaderboard">{leaderboard.cta}</Link>
          </Button>
        </div>
      </Section>

      <Section id="submit" padding="lg">
        <div className="card grid lg:grid-cols-[2fr,1fr] lg:items-center gap-8 p-8 bg-brand-primary text-surface-contrast">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold lg:text-4xl">{callout.title}</h2>
            <p className="max-w-3xl text-base text-surface-contrast/80">{callout.description}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#submit">{callout.primary}</Link>
              </Button>
              <Button variant="tertiary" asChild size="lg">
                <Link href="#workflow">{callout.secondary}</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 text-sm text-surface-contrast/90">
            <h3 className="mb-3 text-lg font-semibold text-white">{tCta("contact")}</h3>
            <p className="text-sm leading-relaxed text-surface-contrast/75">
              {tHome("hero.subtitle")}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
