/**
 * React Query hooks for submission operations
 * Based on approved Stage 4 plan
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AgentConfig,
  CostEstimate,
  ExecutionChannel,
  Submission,
  SubmissionDetail,
} from "@/types/models";
import { apiFetch } from "@/lib/api-client";

/**
 * Fetch cost estimate for a submission
 * 5-minute stale time
 */
export function useCostEstimate(params: {
  benchmarkId: string;
  benchmarkVersion?: string;
  agentConfig: AgentConfig;
  executionChannel: ExecutionChannel;
  leaderboardOptIn?: boolean;
}) {
  return useQuery({
    queryKey: ["cost-estimate", params],
    queryFn: async () => {
      return await apiFetch<CostEstimate>("/api/v1/submissions/estimate", {
        method: "POST",
        body: JSON.stringify(params),
      });
    },
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(params.benchmarkId && params.agentConfig && params.executionChannel),
  });
}

/**
 * Create a new submission
 * Mutation hook
 */
export function useCreateSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      benchmarkId: string;
      benchmarkVersion?: string;
      agentConfig: AgentConfig;
      executionChannel: "self-miner" | "iexec";
      leaderboardOptIn?: boolean;
      signature: string;
    }) => {
      return await apiFetch<{ submissionId: string; status: string }>(
        "/api/v1/submissions",
        {
          method: "POST",
          body: JSON.stringify(params),
        }
      );
    },
    onSuccess: () => {
      // Invalidate submissions list
      queryClient.invalidateQueries({ queryKey: ["user-submissions"] });
    },
  });
}

/**
 * Fetch a single submission with polling
 * Polls every 5 seconds when status is running/queued/scoring
 */
export function useSubmission(id: string) {
  return useQuery({
    queryKey: ["submission", id],
    queryFn: async () => {
      return await apiFetch<SubmissionDetail>(`/api/v1/submissions/${id}`);
    },
    enabled: !!id,
    refetchInterval: (query) => {
      const submission = query.state.data;
      if (!submission) return false;

      // Poll every 5 seconds for active statuses
      const activeStatuses = ["running", "queued", "scoring", "pending"];
      if (activeStatuses.includes(submission.status)) {
        return 5000; // 5 seconds
      }

      // Stop polling for terminal statuses
      return false;
    },
  });
}

/**
 * Fetch user's submissions list
 */
export function useUserSubmissions(filters?: {
  status?: string;
  benchmarkId?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["user-submissions", filters],
    queryFn: async () => {
      return await apiFetch<{
        submissions: Submission[];
        total: number;
        page: number;
        limit: number;
      }>("/api/v1/submissions", {
        params: filters,
      });
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Cancel a submission
 * Mutation hook
 */
export function useCancelSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (submissionId: string) => {
      return await apiFetch<{ success: boolean }>(
        `/api/v1/submissions/${submissionId}/cancel`,
        {
          method: "POST",
        }
      );
    },
    onSuccess: (_, submissionId) => {
      // Invalidate the specific submission and list
      queryClient.invalidateQueries({ queryKey: ["submission", submissionId] });
      queryClient.invalidateQueries({ queryKey: ["user-submissions"] });
    },
  });
}
