"use client";

import { useUserSubmissions } from "@/hooks/use-submissions";
import { Section } from "@/components/layout/section";
import { SubmissionsTable } from "@/components/features/submissions-table";

type InvitesClientProps = {
  empty: {
    title: string;
    description: string;
    ctaLabel?: string;
  };
  cta: { label: string; href: string };
};

export function InvitesClient({ empty, cta }: InvitesClientProps) {
  const { data, isLoading } = useUserSubmissions({ status: "pending", limit: 20 });

  return (
    <Section padding="lg">
      <SubmissionsTable
        submissions={data?.submissions}
        isLoading={isLoading}
        empty={{
          title: empty.title,
          description: empty.description,
          actionLabel: empty.ctaLabel ?? cta.label,
          actionHref: cta.href,
        }}
        footerAction={cta}
      />
    </Section>
  );
}
