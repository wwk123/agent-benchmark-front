import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { GradientCard } from "@/components/ui/gradient-card";
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
  const proofs = tHome.raw("proofs") as {
    title: string;
    description: string;
    anchor: {
      title: string;
      description: string;
      links: Array<{ label: string; href: string }>;
    };
    artifacts: {
      title: string;
      description: string;
      hints: string[];
    };
    miner: {
      title: string;
      description: string;
      actions: Array<{ label: string; href: string; variant?: "primary" | "secondary" | "ghost" }>;
      note?: string;
    };
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-hero-gradient from-brand-gradient-start via-brand-gradient-mid to-brand-gradient-end" />
        <div className="absolute inset-0 -z-10 bg-grid-overlay bg-[length:140px_140px] opacity-20" />
        <div className="layout-container flex flex-col gap-12 py-20 lg:flex-row lg:items-center lg:py-28">
          <div className="flex-1 space-y-6 text-surface-contrast">
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium uppercase tracking-wide text-surface-contrast/80">
              {tHome("hero.tagline")}
            </span>
            <div className="space-y-4">
              <h1 className="font-heading text-5xl font-semibold text-surface-contrast lg:text-6xl">
                {tHome("hero.title")}
              </h1>
              <p className="max-w-2xl text-lg text-surface-contrast/80">
                {tHome("hero.subtitle")}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="shadow-cta-focus hover:shadow-brand-glow">
                <Link href="/submit">{tHome("hero.primary")}</Link>
              </Button>
              <Button
                variant="secondary"
                asChild
                size="lg"
                className="bg-surface-elevated/90 text-brand-primary shadow-cta-focus hover:bg-surface-elevated"
              >
                <Link href="/leaderboard">{tHome("hero.secondary")}</Link>
              </Button>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
            {heroMetrics.map((metric) => (
              <MetricCard key={metric.label} label={metric.label} value={metric.value} tone="inverted" />
            ))}
          </div>
        </div>
      </section>

      <Section id="features" title={tHome("features.title")} className="bg-surface">
        <div className="grid gap-6 md:grid-cols-3">
          {featureItems.map((item) => (
            <article key={item.title} className="card h-full space-y-3 p-6">
              <h3 className="font-heading text-xl font-semibold text-brand-primary">{item.title}</h3>
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
              <h3 className="font-heading text-lg font-semibold text-brand-primary">{step.title}</h3>
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
            <h3 className="font-heading text-xl font-semibold text-brand-primary">{leaderboard.title}</h3>
            <p className="max-w-2xl text-sm text-text-secondary">{leaderboard.note}</p>
          </div>
          <Button variant="secondary" asChild>
            <Link href="/leaderboard">{leaderboard.cta}</Link>
          </Button>
        </div>
      </Section>

      <Section id="proofs" title={proofs.title} description={proofs.description} className="bg-surface" padding="lg">
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <article className="card space-y-3 p-6">
              <h3 className="font-heading text-lg font-semibold text-brand-primary">{proofs.anchor.title}</h3>
              <p className="text-sm text-text-secondary">{proofs.anchor.description}</p>
              <ul className="space-y-2 text-sm text-brand-primary">
                {proofs.anchor.links.map((link) => (
                  <li key={link.href}>
                    <a
                      className="inline-flex items-center gap-1 hover:text-brand-highlight"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </article>

            <article className="card space-y-3 p-6">
              <h3 className="font-heading text-lg font-semibold text-brand-primary">{proofs.artifacts.title}</h3>
              <p className="text-sm text-text-secondary">{proofs.artifacts.description}</p>
              <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                {proofs.artifacts.hints.map((hint) => (
                  <li key={hint}>{hint}</li>
                ))}
              </ul>
            </article>
          </div>

          <GradientCard className="space-y-4 p-6">
            <div className="space-y-2">
              <h3 className="font-heading text-xl font-semibold text-surface-contrast">{proofs.miner.title}</h3>
              <p className="text-sm text-surface-contrast/90">{proofs.miner.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              {proofs.miner.actions.map((action) => (
                <Button
                  key={`${action.label}-${action.href}`}
                  asChild
                  variant={action.variant ?? "secondary"}
                  className="justify-start"
                >
                  <a href={action.href} target="_blank" rel="noopener noreferrer">
                    {action.label}
                  </a>
                </Button>
              ))}
            </div>
            {proofs.miner.note && (
              <p className="text-xs text-surface-contrast/70">{proofs.miner.note}</p>
            )}
          </GradientCard>
        </div>
      </Section>

      <Section id="submit" padding="lg">
        <div className="grid gap-8 rounded-2xl border border-brand-gradient-mid/30 bg-brand-primary p-8 text-surface-contrast shadow-brand-glow lg:grid-cols-[2fr,1fr] lg:items-center">
          <div className="space-y-4">
            <h2 className="font-heading text-3xl font-semibold text-surface-contrast lg:text-4xl">{callout.title}</h2>
            <p className="max-w-3xl text-base text-surface-contrast/80">{callout.description}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="shadow-cta-focus hover:shadow-brand-glow">
                <Link href="/submit">{callout.primary}</Link>
              </Button>
              <Button variant="tertiary" asChild size="lg" className="bg-white/15 text-surface-contrast hover:bg-white/25">
                <Link href="/workflow">{callout.secondary}</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 text-sm text-surface-contrast/90">
            <h3 className="font-heading mb-3 text-lg font-semibold text-white">{tCta("contact")}</h3>
            <p className="text-sm leading-relaxed text-surface-contrast/75">{tHome("hero.subtitle")}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
