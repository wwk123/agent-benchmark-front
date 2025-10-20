/**
 * React Query hooks for benchmark data
 * Based on approved Stage 2 plan
 */

import { useQuery } from "@tanstack/react-query";
import type { BenchmarkDetail, BenchmarkFilters, BenchmarksResponse } from "@/types/models";
import { apiFetch } from "@/lib/api-client";

/**
 * Fetch all benchmarks with optional filtering
 * 10-minute stale time for benchmark list
 */
export function useBenchmarks(filters: BenchmarkFilters = {}) {
  return useQuery({
    queryKey: ["benchmarks", filters],
    queryFn: async () => {
      return await apiFetch<BenchmarksResponse>("/api/v1/benchmarks", {
        params: filters,
      });
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    placeholderData: (previousData) => previousData,
  });
}

/**
 * Fetch a single benchmark's detailed information
 * 10-minute stale time for benchmark details
 */
export function useBenchmarkDetail(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["benchmark", id],
    queryFn: async () => {
      return await apiFetch<BenchmarkDetail>(`/api/v1/benchmarks/${id}`);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: options?.enabled ?? !!id,
  });
}

/**
 * Fetch available tags for filtering
 */
export function useBenchmarkTags() {
  return useQuery({
    queryKey: ["benchmark-tags"],
    queryFn: async () => {
      return await apiFetch<{ tags: string[] }>("/api/v1/benchmarks/tags");
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}
