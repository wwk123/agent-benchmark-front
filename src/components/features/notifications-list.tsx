"use client";

import { Bell } from "lucide-react";
import type { Notification } from "@/types/models";
import { ListSkeleton } from "@/components/ui/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NotificationsListProps = {
  notifications?: Notification[];
  isLoading?: boolean;
  empty: {
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
  };
};

export function NotificationsList({ notifications, isLoading = false, empty }: NotificationsListProps) {
  if (isLoading) {
    return <ListSkeleton count={4} />;
  }

  if (!notifications || notifications.length === 0) {
    return (
      <EmptyState
        title={empty.title}
        description={empty.description}
        action={
          empty.actionLabel && empty.actionHref
            ? {
                label: empty.actionLabel,
                onClick: () => {
                  window.open(empty.actionHref, "_blank", "noopener,noreferrer");
                },
              }
            : undefined
        }
        illustrationKey="sparkles"
      />
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <article key={notification.id} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3">
          <div className="flex gap-3">
            <span className={cn("mt-1 rounded-full bg-brand-accent/15 p-2", toneForType(notification.type))}>
              <Bell className="size-4" />
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-text-primary">{notification.title}</p>
              <p className="text-xs text-text-secondary">{notification.message}</p>
              <p className="text-xs text-text-muted">{formatTimestamp(notification.createdAt)}</p>
            </div>
          </div>
          {notification.actionUrl && (
            <Button asChild variant="ghost" size="sm">
              <a href={notification.actionUrl} target="_blank" rel="noopener noreferrer">
                Open
              </a>
            </Button>
          )}
        </article>
      ))}
    </div>
  );
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function toneForType(type: Notification["type"]) {
  switch (type) {
    case "submission":
      return "text-brand-primary";
    case "achievement":
      return "text-emerald-600";
    case "governance":
      return "text-sky-600";
    default:
      return "text-text-muted";
  }
}
