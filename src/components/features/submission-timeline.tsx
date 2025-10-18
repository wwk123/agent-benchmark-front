"use client";

import { FileText, Clock, Play, Award, CheckCircle, XCircle, Ban } from "lucide-react";
import type { SubmissionEvent } from "@/types/models";
import { cn } from "@/lib/utils";

const EVENT_CONFIG = {
  created: { icon: FileText, color: "text-sky-500", bgColor: "bg-sky-100" },
  queued: { icon: Clock, color: "text-amber-500", bgColor: "bg-amber-100" },
  started: { icon: Play, color: "text-sky-500", bgColor: "bg-sky-100" },
  scored: { icon: Award, color: "text-emerald-500", bgColor: "bg-emerald-100" },
  completed: { icon: CheckCircle, color: "text-emerald-500", bgColor: "bg-emerald-100" },
  failed: { icon: XCircle, color: "text-rose-500", bgColor: "bg-rose-100" },
  cancelled: { icon: Ban, color: "text-gray-500", bgColor: "bg-gray-100" },
};

export type SubmissionTimelineProps = {
  events: SubmissionEvent[];
  className?: string;
};

export function SubmissionTimeline({ events, className }: SubmissionTimelineProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {events.map((event, index) => {
        const config = EVENT_CONFIG[event.type];
        const Icon = config.icon;
        const isLast = index === events.length - 1;

        return (
          <div key={index} className="relative flex gap-4">
            {!isLast && (
              <div className="absolute left-6 top-12 h-full w-0.5 bg-border" />
            )}

            <div className={cn("flex size-12 shrink-0 items-center justify-center rounded-full", config.bgColor)}>
              <Icon className={cn("size-5", config.color)} />
            </div>

            <div className="flex-1 pb-8">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold capitalize text-text-primary">{event.type}</h4>
                <span className="text-xs text-text-muted">
                  {new Date(event.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-sm text-text-secondary">{event.message}</p>
              {event.metadata && Object.keys(event.metadata).length > 0 && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs text-text-muted">Show details</summary>
                  <pre className="mt-2 rounded bg-surface-muted p-2 text-xs">
                    {JSON.stringify(event.metadata, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
