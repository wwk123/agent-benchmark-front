"use client";

import { Server, Cpu, Zap } from "lucide-react";
import { useSubmissionStore } from "@/stores/submission-store";
import { Button } from "@/components/ui/button";
import type { ExecutionChannel } from "@/types/models";
import { cn } from "@/lib/utils";

const CHANNELS = [
  {
    value: "auto" as ExecutionChannel,
    icon: Zap,
    title: "Auto (Recommended)",
    description: "Automatically select the best execution channel based on cost and availability",
    badge: "Recommended",
    pros: ["Best price", "Automatic optimization", "Fallback support"],
  },
  {
    value: "self-miner" as ExecutionChannel,
    icon: Cpu,
    title: "Self-Miner",
    description: "Run on your own mining infrastructure for lower costs",
    badge: null,
    pros: ["Lower cost", "Faster execution", "Full control"],
  },
  {
    value: "iexec" as ExecutionChannel,
    icon: Server,
    title: "iExec Network",
    description: "Decentralized execution on the iExec network",
    badge: "Decentralized",
    pros: ["Fully decentralized", "Guaranteed execution", "On-chain proof"],
  },
];

export function Step3SelectChannel() {
  const { executionChannel, setExecutionChannel, setStep } = useSubmissionStore();

  const handleNext = () => {
    setStep(4);
  };

  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-3">
        {CHANNELS.map((channel) => {
          const Icon = channel.icon;
          const isSelected = executionChannel === channel.value;

          return (
            <button
              key={channel.value}
              type="button"
              onClick={() => setExecutionChannel(channel.value)}
              className={cn(
                "card hover-tilt relative p-6 text-left transition-all hover:shadow-lg",
                isSelected && "ring-2 ring-brand-primary ring-offset-2"
              )}
            >
              {channel.badge && (
                <span className="absolute right-4 top-4 rounded-full bg-brand-primary px-2 py-1 text-xs font-medium text-white">
                  {channel.badge}
                </span>
              )}

              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-primary">
                <Icon className="size-6" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-text-primary">
                {channel.title}
              </h3>

              <p className="mb-4 text-sm text-text-secondary">
                {channel.description}
              </p>

              <ul className="space-y-1 text-sm text-text-muted">
                {channel.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    {pro}
                  </li>
                ))}
              </ul>

              {isSelected && (
                <div className="mt-4 flex items-center gap-2 text-brand-primary">
                  <div className="size-2 rounded-full bg-brand-primary" />
                  <span className="text-sm font-medium">Selected</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between border-t border-border/80 pt-6">
        <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
        <Button onClick={handleNext} size="lg">Next: Confirm Cost</Button>
      </div>
    </div>
  );
}
