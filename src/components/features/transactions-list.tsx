"use client";

import { ExternalLink, Wallet } from "lucide-react";
import type { WalletTransaction } from "@/types/models";
import { ListSkeleton } from "@/components/ui/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TransactionsListProps = {
  transactions?: WalletTransaction[];
  isLoading?: boolean;
  empty: {
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
  };
};

export function TransactionsList({ transactions, isLoading = false, empty }: TransactionsListProps) {
  if (isLoading) {
    return <ListSkeleton count={4} />;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState
        title={empty.title}
        description={empty.description}
        action={
          empty.actionLabel && empty.actionHref
            ? {
                label: empty.actionLabel,
                onClick: () => {
                  window.open(empty.actionHref, "_blank", "noopener,noreferrer");
                },
              }
            : undefined
        }
        illustrationKey="sparkles"
      />
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3">
          <div className="flex gap-3">
            <div className={cn("mt-1 rounded-full bg-brand-accent/15 p-2", iconColor(tx.type))}>
              <Wallet className="size-4" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-text-primary">
                {formatAmount(tx.amount, tx.currency)} · {tx.type.toUpperCase()}
              </p>
              <p className="text-xs text-text-muted">{tx.description}</p>
              <p className="text-xs text-text-muted">
                {formatTimestamp(tx.completedAt || tx.createdAt)} · {tx.status.toUpperCase()}
              </p>
            </div>
          </div>

          {tx.txHash && (
            <Button asChild variant="ghost" size="sm">
              <a href={`https://explorer.iex.ec/bellecour/task/${tx.txHash}`} target="_blank" rel="noopener noreferrer">
                Explorer
                <ExternalLink className="ml-1 size-3.5" />
              </a>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

function formatAmount(amount: number, currency: WalletTransaction["currency"]) {
  return `${amount} ${currency}`;
}

function formatTimestamp(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function iconColor(type: WalletTransaction["type"]) {
  switch (type) {
    case "deposit":
    case "reward":
      return "text-emerald-600";
    case "withdraw":
    case "payment":
      return "text-rose-600";
    default:
      return "text-brand-primary";
  }
}
