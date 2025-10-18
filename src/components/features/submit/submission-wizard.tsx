"use client";

import { useSubmissionStore } from "@/stores/submission-store";
import { Step1SelectBenchmark } from "./step1-select-benchmark";
import { Step2ConfigureAgent } from "./step2-configure-agent";
import { Step3SelectChannel } from "./step3-select-channel";
import { Step4ConfirmCost } from "./step4-confirm-cost";
import { Step5Payment } from "./step5-payment";

export function SubmissionWizard() {
  const currentStep = useSubmissionStore((state) => state.currentStep);

  return (
    <div className="space-y-6">
      {currentStep === 1 && <Step1SelectBenchmark />}
      {currentStep === 2 && <Step2ConfigureAgent />}
      {currentStep === 3 && <Step3SelectChannel />}
      {currentStep === 4 && <Step4ConfirmCost />}
      {currentStep === 5 && <Step5Payment />}
    </div>
  );
}
