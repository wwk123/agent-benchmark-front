import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SubmissionSteps } from "@/components/submit/submission-steps";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";

type WorkflowPageProps = {
  params: { locale: string };
};

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "tertiary" | "ghost" | "danger";
};

type OverviewItem = {
  title: string;
  description: string;
};

type StepItem = {
  title: string;
  description: string;
  hint?: string;
};

type Checklist = {
  title: string;
  items: string[];
  support: {
    title: string;
    description: string;
    action: {
      label: string;
      href: string;
    };
  };
};

type ResourceItem = {
  title: string;
  description: string;
  href: string;
};

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  void params;
  const t = await getTranslations("workflowPage");

  const hero = t.raw("hero") as {
    badge?: string;
    title: string;
    description: string;
    actions?: HeroAction[];
  };

  const overview = t.raw("overview") as {
    title: string;
    items: OverviewItem[];
  };

  const steps = t.raw("steps") as {
    title: string;
    description: string;
    list: StepItem[];
    checklist: Checklist;
  };

  const resources = t.raw("resources") as {
    title: string;
    caption?: string;
    items: ResourceItem[];
  };
  const viewResourceLabel = t("cta.viewResource");

  return (
    <>
      <PageHero
        badge={hero.badge}
        title={hero.title}
        description={hero.description}
        actions={hero.actions?.map((action) => ({
          ...action,
          variant: (action.variant as HeroAction["variant"]) ?? "primary",
        }))}
      />

      <Section id="overview" title={overview.title} className="bg-surface">
        <div className="grid gap-6 md:grid-cols-3">
          {overview.items.map((item) => (
            <article key={item.title} className="card h-full space-y-3 p-6">
              <h3 className="text-xl font-semibold text-brand-primary">{item.title}</h3>
              <p className="text-sm text-text-secondary">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="steps" title={steps.title} description={steps.description}>
        <SubmissionSteps steps={steps.list} checklist={steps.checklist} />
      </Section>

      <Section id="resources" title={resources.title} description={resources.caption} padding="sm">
        <div className="grid gap-4 md:grid-cols-3">
          {resources.items.map((item) => (
            <article key={item.title} className="card flex h-full flex-col justify-between space-y-4 p-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-brand-primary">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.description}</p>
              </div>
              <Button asChild variant="secondary">
                <Link href={item.href}>{viewResourceLabel}</Link>
              </Button>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
