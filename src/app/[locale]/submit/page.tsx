import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SubmissionWizard } from "@/components/features/submit/submission-wizard";
import { GradientCard } from "@/components/ui/gradient-card";
import { getIllustration } from "@/lib/illustrations";

export default async function SubmitPage() {
  const t = await getTranslations("submitPage");

  const hero = t.raw("hero") as {
    badge?: string;
    title: string;
    description: string;
    actions?: Array<{ label: string; href: string; variant?: string }>;
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

      <Section id="submission-wizard" padding="lg" className="bg-surface">
        <GradientCard className="space-y-8 p-8">
          <SubmissionWizard />
          <Image
            src={getIllustration("submissionFlow", "light")}
            alt=""
            width={340}
            height={240}
            className="mx-auto w-full max-w-sm animate-float-slow object-contain"
          />
        </GradientCard>
      </Section>
    </>
  );
}
