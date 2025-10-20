"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { useSubmissionStore } from "@/stores/submission-store";
import { useCostEstimate } from "@/hooks/use-submissions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/loading-skeleton";
import { cn } from "@/lib/utils";

function formatCurrency(value: number, currency = "USD") {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function Step4ConfirmCost() {
  const {
    selectedBenchmarkId,
    benchmarkVersion,
    agentConfig,
    executionChannel,
    leaderboardOptIn,
    setCostEstimate,
    setStep,
  } = useSubmissionStore();
  const [agreed, setAgreed] = useState(false);

  const normalizedChannel = executionChannel === "auto" ? "self-miner" : executionChannel;

  const {
    data: costEstimate,
    isLoading,
    error,
  } = useCostEstimate({
    benchmarkId: selectedBenchmarkId!,
    benchmarkVersion: benchmarkVersion ?? undefined,
    agentConfig: agentConfig!,
    executionChannel: normalizedChannel,
    leaderboardOptIn,
  });

  useEffect(() => {
    if (costEstimate) {
      setCostEstimate(costEstimate);
    }
  }, [costEstimate, setCostEstimate]);

  const formattedUsd = useMemo(() => {
    if (!costEstimate?.totalUsd) return null;
    return formatCurrency(costEstimate.totalUsd, "USD");
  }, [costEstimate?.totalUsd]);

  const rateLabel = costEstimate?.exchangeRate
    ? `1 RLC ≈ ${formatCurrency(costEstimate.exchangeRate.rlcUsd, "USD")}${
        costEstimate.exchangeRate.updatedAt
          ? ` · updated ${new Date(costEstimate.exchangeRate.updatedAt).toLocaleString()}`
          : ""
      }`
    : null;

  const handleNext = () => {
    if (agreed && costEstimate) {
      setStep(5);
    }
  };

  const publishingLabel = leaderboardOptIn
    ? "Results will auto-publish to the leaderboard after audit."
    : "Leaderboard opt-out: results remain private until you manually publish.";

  return (
    <div className="space-y-10">
      {isLoading ? (
        <div className="card space-y-4 p-6 transition-transform hover:-translate-y-1">
          <Skeleton variant="text" height="24px" width="60%" />
          <Skeleton variant="rectangular" height="140px" />
        </div>
      ) : error ? (
        <div className="card p-6 transition-transform hover:-translate-y-1">
          <div className="flex items-center gap-3 text-rose-600">
            <AlertCircle className="size-5" />
            <p className="text-sm">Failed to fetch cost estimate. Please try again.</p>
          </div>
        </div>
      ) : costEstimate ? (
        <>
          <div className="card space-y-6 p-6 transition-transform hover:-translate-y-1 focus-within:-translate-y-1">
            <header className="space-y-1">
              <h3 className="font-heading text-lg font-semibold text-text-primary">Cost summary</h3>
              <p className="text-xs text-text-muted">
                Benchmark {selectedBenchmarkId}@{benchmarkVersion ?? "latest"} · Channel {normalizedChannel}
              </p>
            </header>

            <div className="space-y-3">
              <CostRow label="Computation" value={`${costEstimate.computation} RLC`} />
              <CostRow label="Storage" value={`${costEstimate.storage} RLC`} />
              <CostRow label="Network" value={`${costEstimate.network} RLC`} />
              {typeof costEstimate.leaderboardAdjustment === "number" && costEstimate.leaderboardAdjustment !== 0 && (
                <CostRow
                  label="Leaderboard publishing"
                  value={`${costEstimate.leaderboardAdjustment > 0 ? "+" : ""}${costEstimate.leaderboardAdjustment} RLC`}
                  highlight
                />
              )}

              <div className="border-t border-border pt-3">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="font-semibold text-text-primary">Estimated total</span>
                  <span className="text-2xl font-bold text-brand-primary">{costEstimate.total} RLC</span>
                </div>
                {formattedUsd && (
                  <p className="text-sm text-text-secondary">
                    ≈ {formattedUsd}
                  </p>
                )}
              </div>
            </div>

            {rateLabel && <p className="text-xs text-text-muted">{rateLabel}</p>}
          </div>

          <div className="card space-y-4 p-6 transition-transform hover:-translate-y-1 focus-within:-translate-y-1">
            <h3 className="font-heading text-lg font-semibold text-text-primary">Execution & publishing</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 size-4 text-brand-primary" />
                <span>{publishingLabel}</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 size-4 text-brand-primary" />
                <span>
                  {normalizedChannel === "iexec"
                    ? "Runs on iExec with decentralised matching and Result Anchor proof."
                    : "Runs on self-miner infrastructure with remote attestation and signed artifacts."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 size-4 text-brand-primary" />
                <span>Gas and escrow fees are prepaid; unused balances are refunded automatically.</span>
              </li>
              {costEstimate.notes?.map((note, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 size-4 text-brand-primary" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/80 bg-surface px-4 py-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="mt-0.5 size-4 rounded border-border text-brand-primary focus:ring-brand-accent"
              />
              <span className="text-sm text-text-secondary">
                I understand this estimate may change with retries or manual review, and agree to reserve the required funds.
              </span>
            </label>
          </div>
        </>
      ) : null}

      <div className="flex justify-between border-t border-border/80 pt-6">
        <Button variant="secondary" onClick={() => setStep(3)}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!agreed || !costEstimate} size="lg">
          Proceed to payment
        </Button>
      </div>
    </div>
  );
}

type CostRowProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

function CostRow({ label, value, highlight = false }: CostRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg px-3 py-2 text-sm",
        highlight ? "bg-brand-accent/10 text-brand-primary" : "text-text-secondary",
      )}
    >
      <span>{label}</span>
      <span className={highlight ? "font-semibold" : "font-medium text-text-primary"}>{value}</span>
    </div>
  );
}
