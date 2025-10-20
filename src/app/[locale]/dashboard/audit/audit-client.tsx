"use client";

import { useNotifications } from "@/hooks/use-user";
import { Section } from "@/components/layout/section";
import { NotificationsList } from "@/components/features/notifications-list";

type AuditClientProps = {
  empty: {
    title: string;
    description: string;
    ctaLabel?: string;
    backLabel?: string;
  };
  ctaLabel?: string;
};

export function AuditClient({ empty, ctaLabel }: AuditClientProps) {
  const { data, isLoading } = useNotifications({});

  return (
    <Section padding="lg" className="space-y-6">
      <NotificationsList
        notifications={data?.notifications}
        isLoading={isLoading}
        empty={{
          title: empty.title,
          description: empty.description,
          actionLabel: ctaLabel,
        }}
      />
    </Section>
  );
}
