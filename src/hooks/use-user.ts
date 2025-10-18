/**
 * React Query hooks for user-related operations
 * Based on approved Stage 5 plan
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  UserStats,
  WalletBalance,
  WalletTransaction,
  Notification,
  NotificationFilters,
} from "@/types/models";
import { apiFetch } from "@/lib/api-client";

/**
 * Fetch user statistics
 * 2-minute stale time
 */
export function useUserStats() {
  return useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      return await apiFetch<UserStats>("/api/v1/user/stats");
    },
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Fetch wallet balance
 * 1-minute stale time
 */
export function useWalletBalance() {
  return useQuery({
    queryKey: ["wallet-balance"],
    queryFn: async () => {
      return await apiFetch<WalletBalance>("/api/v1/wallet/balance");
    },
    staleTime: 1 * 60 * 1000,
  });
}

/**
 * Fetch wallet transaction history
 * 2-minute stale time
 */
export function useWalletTransactions(filters?: {
  type?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["wallet-transactions", filters],
    queryFn: async () => {
      return await apiFetch<{
        transactions: WalletTransaction[];
        total: number;
        page: number;
        limit: number;
      }>("/api/v1/wallet/transactions", {
        params: filters,
      });
    },
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Fetch user notifications
 * 1-minute stale time
 */
export function useNotifications(filters?: NotificationFilters) {
  return useQuery({
    queryKey: ["notifications", filters],
    queryFn: async () => {
      return await apiFetch<{
        notifications: Notification[];
        total: number;
        unreadCount: number;
      }>("/api/v1/notifications", {
        params: filters,
      });
    },
    staleTime: 1 * 60 * 1000,
  });
}

/**
 * Mark notification as read
 * Mutation hook
 */
export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      return await apiFetch<{ success: boolean }>(
        `/api/v1/notifications/${notificationId}/read`,
        {
          method: "POST",
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

/**
 * Mark all notifications as read
 * Mutation hook
 */
export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await apiFetch<{ success: boolean }>("/api/v1/notifications/read-all", {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
