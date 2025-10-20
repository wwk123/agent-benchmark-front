/**
 * Zustand store for submission flow state management
 * Based on approved Stage 4 plan
 * Persists to sessionStorage for temporary state preservation
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AgentConfig, CostEstimate, ExecutionChannel } from "@/types/models";

type SubmissionFlowState = {
  currentStep: number;
  selectedBenchmarkId: string | null;
  benchmarkVersion: string | null;
  agentConfig: AgentConfig | null;
  executionChannel: ExecutionChannel;
  costEstimate: CostEstimate | null;
  submissionId: string | null;
  leaderboardOptIn: boolean;

  // Actions
  setStep: (step: number) => void;
  selectBenchmark: (id: string) => void;
  setBenchmarkVersion: (version: string | null) => void;
  setAgentConfig: (config: AgentConfig) => void;
  setExecutionChannel: (channel: ExecutionChannel) => void;
  setCostEstimate: (estimate: CostEstimate) => void;
  setSubmissionId: (id: string) => void;
  setLeaderboardOptIn: (value: boolean) => void;
  reset: () => void;
  canProceedToStep: (step: number) => boolean;
};

const initialState = {
  currentStep: 1,
  selectedBenchmarkId: null,
  benchmarkVersion: null,
  agentConfig: null,
  executionChannel: "auto" as ExecutionChannel,
  costEstimate: null,
  submissionId: null,
  leaderboardOptIn: true,
};

export const useSubmissionStore = create<SubmissionFlowState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStep: (step: number) => {
        const canProceed = get().canProceedToStep(step);
        if (canProceed) {
          set({ currentStep: step });
        }
      },

      selectBenchmark: (id: string) => {
        set({
          selectedBenchmarkId: id,
          benchmarkVersion: null,
          costEstimate: null,
          leaderboardOptIn: true,
        });
      },

      setBenchmarkVersion: (version: string | null) => {
        set({ benchmarkVersion: version });
      },

      setAgentConfig: (config: AgentConfig) => {
        set({ agentConfig: config });
      },

      setExecutionChannel: (channel: ExecutionChannel) => {
        set({ executionChannel: channel });
      },

      setCostEstimate: (estimate: CostEstimate) => {
        set({ costEstimate: estimate });
      },

      setSubmissionId: (id: string) => {
        set({ submissionId: id });
      },

      setLeaderboardOptIn: (value: boolean) => {
        set({ leaderboardOptIn: value });
      },

      reset: () => {
        set(initialState);
      },

      canProceedToStep: (step: number): boolean => {
        const state = get();

        switch (step) {
          case 1:
            return true;

          case 2:
            return state.selectedBenchmarkId !== null;

          case 3:
            return (
              state.selectedBenchmarkId !== null &&
              state.benchmarkVersion !== null &&
              state.agentConfig !== null
            );

          case 4:
            return (
              state.selectedBenchmarkId !== null &&
              state.benchmarkVersion !== null &&
              state.agentConfig !== null &&
              state.executionChannel !== null
            );

          case 5:
            return (
              state.selectedBenchmarkId !== null &&
              state.benchmarkVersion !== null &&
              state.agentConfig !== null &&
              state.executionChannel !== null &&
              state.costEstimate !== null
            );

          default:
            return false;
        }
      },
    }),
    {
      name: "submission-flow-storage",
      // Only use sessionStorage (temporary)
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
