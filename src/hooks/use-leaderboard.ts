/**
 * React Query hooks for leaderboard data
 * Based on approved Stage 3 plan
 */

import { useQuery } from "@tanstack/react-query";
import type { LeaderboardFilters, LeaderboardResponse, LeaderboardStats } from "@/types/models";
import { apiFetch } from "@/lib/api-client";

/**
 * Fetch leaderboard entries with optional filtering
 * 5-minute stale time for leaderboard data
 */
export function useLeaderboard(filters: LeaderboardFilters = {}) {
  return useQuery({
    queryKey: ["leaderboard", filters],
    queryFn: async () => {
      const endpoint = filters.benchmarkId
        ? `/api/v1/benchmarks/${filters.benchmarkId}/leaderboard`
        : "/api/v1/leaderboard";

      return await apiFetch<LeaderboardResponse>(endpoint, {
        params: {
          executionChannel: filters.executionChannel,
          timeRange: filters.timeRange,
          page: filters.page,
          limit: filters.limit,
        },
      });
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
}

/**
 * Fetch leaderboard statistics
 * 5-minute stale time for stats
 */
export function useLeaderboardStats(benchmarkId?: string) {
  return useQuery({
    queryKey: ["leaderboard-stats", benchmarkId],
    queryFn: async () => {
      const endpoint = benchmarkId
        ? `/api/v1/benchmarks/${benchmarkId}/leaderboard/stats`
        : "/api/v1/leaderboard/stats";

      return await apiFetch<LeaderboardStats>(endpoint);
    },
    staleTime: 5 * 60 * 1000,
  });
}
