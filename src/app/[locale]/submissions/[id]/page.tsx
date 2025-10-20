"use client";

import { use } from "react";
import { ArrowLeft, Clock, Award, DollarSign } from "lucide-react";
import { useSubmission, useCancelSubmission } from "@/hooks/use-submissions";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { InfoCard } from "@/components/ui/info-card";
import { CardSkeleton } from "@/components/ui/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { SubmissionTimeline } from "@/components/features/submission-timeline";
import { Link } from "@/navigation";

type SubmissionDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default function SubmissionDetailPage({ params }: SubmissionDetailPageProps) {
  const { id } = use(params);
  const { data: submission, isLoading } = useSubmission(id);
  const cancelSubmission = useCancelSubmission();

  if (isLoading) {
    return (
      <div className="layout-container py-8">
        <CardSkeleton count={1} />
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="layout-container py-8">
        <EmptyState
          variant="error"
          title="Submission not found"
          description="The submission you are looking for does not exist."
        />
      </div>
    );
  }

  const canCancel = ["pending", "queued", "running"].includes(submission.status);

  return (
    <div className="layout-container py-8 space-y-6">
      <PageHeader
        breadcrumbs={[
          { label: "Submissions", href: "/profile?tab=submissions" },
          { label: `Submission #${id.slice(0, 8)}` },
        ]}
        title={submission.benchmarkTitle}
        actions={
          <>
            <Button variant="secondary" asChild>
              <Link href="/profile?tab=submissions">
                <ArrowLeft className="mr-2 size-4" />
                Back
              </Link>
            </Button>
            {canCancel && (
              <Button
                variant="danger"
                onClick={() => cancelSubmission.mutate(id)}
                disabled={cancelSubmission.isPending}
              >
                Cancel Submission
              </Button>
            )}
          </>
        }
      />

      <div className="flex items-center gap-3">
        <StatusBadge status={submission.status} />
        <span className="text-sm text-text-muted">
          Created {new Date(submission.createdAt).toLocaleString()}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <InfoCard
          title="Status"
          value={submission.status}
          icon={<StatusBadge status={submission.status} showDot={false} />}
        />
        <InfoCard
          title="Score"
          value={submission.score !== null ? submission.score.toFixed(2) : "N/A"}
          icon={<Award className="size-5" />}
        />
        <InfoCard
          title="Cost"
          value={`${submission.cost} RLC`}
          icon={<DollarSign className="size-5" />}
        />
        <InfoCard
          title="Execution Time"
          value={submission.executionTime ? `${submission.executionTime}s` : "N/A"}
          icon={<Clock className="size-5" />}
        />
      </div>

      {submission.scoreBreakdown && submission.scoreBreakdown.length > 0 && (
        <div className="card p-6 space-y-4">
          <h3 className="font-heading text-lg font-semibold">Score Breakdown</h3>
          <div className="space-y-3">
            {submission.scoreBreakdown.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">{item.category}</span>
                  <span className="font-medium">{item.score} / {item.maxScore}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-muted overflow-hidden">
                  <div
                    className="h-full bg-brand-primary"
                    style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card p-6 space-y-4">
        <h3 className="font-heading text-lg font-semibold">Execution Timeline</h3>
        <SubmissionTimeline events={submission.events} />
      </div>
    </div>
  );
}
