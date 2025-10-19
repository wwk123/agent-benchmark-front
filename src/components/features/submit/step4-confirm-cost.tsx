"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { useSubmissionStore } from "@/stores/submission-store";
import { useCostEstimate } from "@/hooks/use-submissions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/loading-skeleton";

export function Step4ConfirmCost() {
  const { selectedBenchmarkId, agentConfig, executionChannel, setCostEstimate, setStep } = useSubmissionStore();
  const [agreed, setAgreed] = useState(false);

  const { data: costEstimate, isLoading, error } = useCostEstimate({
    benchmarkId: selectedBenchmarkId!,
    agentConfig: agentConfig!,
    executionChannel: executionChannel === "auto" ? "self-miner" : executionChannel,
  });

  useEffect(() => {
    if (costEstimate) {
      setCostEstimate(costEstimate);
    }
  }, [costEstimate, setCostEstimate]);

  const handleNext = () => {
    if (agreed && costEstimate) {
      setStep(5);
    }
  };

  return (
    <div className="space-y-10">
      {isLoading ? (
        <div className="card p-6 space-y-4 transition-transform hover:-translate-y-1 focus-within:-translate-y-1">
          <Skeleton variant="text" height="24px" width="50%" />
          <Skeleton variant="rectangular" height="120px" />
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
          <div className="card p-6 space-y-4 transition-transform hover:-translate-y-1 focus-within:-translate-y-1">
            <h3 className="text-lg font-semibold text-text-primary">Cost Breakdown</h3>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Computation</span>
                <span className="font-medium text-text-primary">{costEstimate.computation} RLC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Storage</span>
                <span className="font-medium text-text-primary">{costEstimate.storage} RLC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Network</span>
                <span className="font-medium text-text-primary">{costEstimate.network} RLC</span>
              </div>

              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-text-primary">Total</span>
                  <span className="text-2xl font-bold text-brand-primary">{costEstimate.total} RLC</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 space-y-4 transition-transform hover:-translate-y-1 focus-within:-translate-y-1">
            <h3 className="text-lg font-semibold text-text-primary">Important Notice</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex gap-2">
                <span>•</span>
                <span>Costs are estimates and may vary based on actual execution</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Execution time depends on benchmark complexity</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Funds will be deducted from your wallet balance</span>
              </li>
            </ul>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 size-4 rounded border-border"
              />
              <span className="text-sm text-text-secondary">
                I understand and agree to pay the estimated cost for this submission
              </span>
            </label>
          </div>
        </>
      ) : null}

      <div className="flex justify-between border-t border-border/80 pt-6">
        <Button variant="secondary" onClick={() => setStep(3)}>Back</Button>
        <Button onClick={handleNext} disabled={!agreed || !costEstimate} size="lg">
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
}
