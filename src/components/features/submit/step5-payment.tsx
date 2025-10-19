"use client";

import { useState } from "react";
import type { Route } from "next";
import { useRouter } from "@/navigation";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useSignMessage } from "wagmi";
import { useSubmissionStore } from "@/stores/submission-store";
import { useCreateSubmission } from "@/hooks/use-submissions";
import { Button } from "@/components/ui/button";

type PaymentState = "idle" | "signing" | "submitting" | "success" | "error";

export function Step5Payment() {
  const router = useRouter();
  const [state, setState] = useState<PaymentState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { signMessageAsync } = useSignMessage();
  const { selectedBenchmarkId, agentConfig, executionChannel, costEstimate, setSubmissionId, reset } = useSubmissionStore();
  const createSubmission = useCreateSubmission();

  const handleSubmit = async () => {
    if (!selectedBenchmarkId || !agentConfig || !costEstimate) return;

    try {
      setState("signing");
      setErrorMessage("");

      const timestamp = Date.now();
      const message = `Submit to benchmark ${selectedBenchmarkId}\nCost: ${costEstimate.total} RLC\nChannel: ${executionChannel}\nTimestamp: ${timestamp}`;

      const signature = await signMessageAsync({ message });

      setState("submitting");

      const result = await createSubmission.mutateAsync({
        benchmarkId: selectedBenchmarkId,
        agentConfig,
        executionChannel: executionChannel === "auto" ? "self-miner" : executionChannel,
        signature,
      });

      setSubmissionId(result.submissionId);
      setState("success");

      setTimeout(() => {
        reset();
        const submissionRoute = `/submissions/${result.submissionId}` as Route;
        router.push(submissionRoute);
      }, 1500);

    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to create submission");
    }
  };

  return (
    <div className="space-y-6">
      <div className="card p-6 space-y-4 transition-transform hover:-translate-y-1 focus-within:-translate-y-1">
        <h3 className="text-lg font-semibold">Payment Summary</h3>

        <div className="space-y-2 rounded-lg bg-surface-muted p-4">
          <div className="flex justify-between">
            <span className="text-sm text-text-secondary">Total Cost</span>
            <span className="text-2xl font-bold text-brand-primary">{costEstimate?.total} RLC</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Execution Channel</span>
            <span className="font-medium capitalize">{executionChannel}</span>
          </div>
        </div>

        {state === "idle" && (
          <div className="space-y-3">
            <p className="text-sm text-text-secondary">
              Click below to sign with your wallet and submit your agent.
            </p>
            <Button onClick={handleSubmit} size="lg" className="w-full">Sign & Submit</Button>
          </div>
        )}

        {state === "signing" && (
          <div className="flex items-center justify-center gap-3 py-6">
            <Loader2 className="size-6 animate-spin text-brand-primary" />
            <span className="text-sm">Waiting for wallet signature...</span>
          </div>
        )}

        {state === "submitting" && (
          <div className="flex items-center justify-center gap-3 py-6">
            <Loader2 className="size-6 animate-spin text-brand-primary" />
            <span className="text-sm">Submitting to network...</span>
          </div>
        )}

        {state === "success" && (
          <div className="flex items-center justify-center gap-3 py-6 text-emerald-600">
            <CheckCircle className="size-6" />
            <span className="text-sm font-medium">Submission created! Redirecting...</span>
          </div>
        )}

        {state === "error" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg bg-rose-50 p-4 text-rose-600">
              <AlertCircle className="size-5 shrink-0" />
              <p className="text-sm">{errorMessage}</p>
            </div>
            <Button onClick={handleSubmit} variant="secondary" size="lg" className="w-full">Retry</Button>
          </div>
        )}
      </div>

      {state === "idle" && (
        <div className="flex justify-start border-t border-border/80 pt-6">
          <Button variant="secondary" onClick={() => reset()}>Cancel</Button>
        </div>
      )}
    </div>
  );
}
