"use client";

import { useWalletTransactions } from "@/hooks/use-user";
import { Section } from "@/components/layout/section";
import { TransactionsList } from "@/components/features/transactions-list";

type SecurityClientProps = {
  empty: {
    title: string;
    description: string;
    ctaLabel?: string;
  };
};

export function SecurityClient({ empty }: SecurityClientProps) {
  const { data, isLoading } = useWalletTransactions({ limit: 15 });

  return (
    <Section padding="lg">
      <TransactionsList
        transactions={data?.transactions}
        isLoading={isLoading}
        empty={{
          title: empty.title,
          description: empty.description,
          actionLabel: empty.ctaLabel,
        }}
      />
    </Section>
  );
}
