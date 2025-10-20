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
      const { benchmarkId, version, executionChannel, timeRange, page, limit } = filters;
      const endpoint = benchmarkId
        ? `/api/v1/benchmarks/${filters.benchmarkId}/leaderboard`
        : "/api/v1/leaderboard";

      return await apiFetch<LeaderboardResponse>(endpoint, {
        params: {
          version,
          executionChannel,
          timeRange,
          page,
          limit,
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
export function useLeaderboardStats(filters: { benchmarkId?: string; version?: string } = {}) {
  const { benchmarkId, version } = filters;

  return useQuery({
    queryKey: ["leaderboard-stats", benchmarkId, version],
    queryFn: async () => {
      const endpoint = benchmarkId
        ? `/api/v1/benchmarks/${benchmarkId}/leaderboard/stats`
        : "/api/v1/leaderboard/stats";

      return await apiFetch<LeaderboardStats>(endpoint, {
        params: {
          version,
        },
      });
    },
    staleTime: 5 * 60 * 1000,
  });
}
