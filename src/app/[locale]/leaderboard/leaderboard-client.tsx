"use client";

import { useMemo, useState } from "react";
import { useBenchmarks, useBenchmarkDetail } from "@/hooks/use-benchmarks";
import { useLeaderboard, useLeaderboardStats } from "@/hooks/use-leaderboard";
import type { Benchmark, LeaderboardFilters, LeaderboardStats, LeaderboardTimeRange } from "@/types/models";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { CategoryLeaderboardTabs } from "@/components/leaderboard/category-leaderboard-tabs";
import { TableSkeleton } from "@/components/ui/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { GradientCard } from "@/components/ui/gradient-card";
import { MetricCard } from "@/components/ui/metric-card";
import { cn } from "@/lib/utils";

type FilterOption = {
  value: string;
  label: string;
};

type LeaderboardFallbackRow = {
  rank: number;
  agent: string;
  benchmark: string;
  score: string;
  completion: string;
  lastRun: string;
  channel: string;
  proof?: {
    anchorLabel?: string;
    anchorUrl?: string;
    artifactLabel?: string;
    artifactUrl?: string;
    dealId?: string;
    taskId?: string;
  };
};

type FiltersCopy = {
  benchmark: {
    label: string;
    placeholder: string;
    allLabel: string;
  };
  version: {
    label: string;
    placeholder: string;
    latestLabel: string;
  };
  channel: {
    label: string;
    options: {
      all: string;
      self: string;
      iexec: string;
    };
  };
  time: {
    label: string;
    options: Record<LeaderboardTimeRange, string>;
  };
  resetLabel: string;
  hint: string;
};

type SummaryCopy = {
  title: string;
  anchor: {
    title: string;
    description: string;
  };
  artifacts: {
    title: string;
    description: string;
  };
  explorer: {
    title: string;
    description: string;
  };
};

type StatsCopy = {
  title: string;
  descriptors: Array<{
    id: "participants" | "submissions" | "topScore" | "averageScore";
    label: string;
    placeholder: string;
  }>;
};

type EmptyCopy = {
  title: string;
  description: string;
  actionLabel?: string;
};

type ProofLabels = {
  anchor: string;
  artifact: string;
};

type LeaderboardClientProps = {
  columns: {
    rank: string;
    agent: string;
    benchmark: string;
    score: string;
    completion: string;
    lastRun: string;
    channel: string;
    proof?: string;
  };
  filtersCopy: FiltersCopy;
  statsCopy: StatsCopy;
  summaryCopy: SummaryCopy;
  fallbackRows: LeaderboardFallbackRow[];
  fallbackBenchmarks: Array<{ id: string; label: string }>;
  runUnit: string;
  proofFallback?: string;
  proofLabels: ProofLabels;
  emptyCopy: EmptyCopy;
  legend: {
    score: string;
    channel: {
      hybrid: string;
      iexec: string;
      self: string;
    };
  };
  categoryTabs: {
    categories: Array<{ id: string; label: string }>;
    data: Array<{
      categoryId: string;
      entries: Array<{
        rank: number;
        agent: string;
        benchmark: string;
        score: string;
        lastRun: string;
        reportUrl: string;
      }>;
    }>;
    emptyMessage: string;
    columns: {
      rank: string;
      agent: string;
      benchmark: string;
      score: string;
      lastRun: string;
      report: string;
    };
    actions: {
      viewReport: string;
    };
  };
};

const LIMIT = 20;

function formatNumber(value?: number, fractionDigits = 2) {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return "—";
  }
  return value.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

function formatTimestamp(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

export function LeaderboardClient({
  columns,
  filtersCopy,
  statsCopy,
  summaryCopy,
  fallbackRows,
  fallbackBenchmarks,
  runUnit,
  proofFallback,
  proofLabels,
  emptyCopy,
  legend,
  categoryTabs,
}: LeaderboardClientProps) {
  const [selectedBenchmark, setSelectedBenchmark] = useState<string>("all");
  const [selectedVersion, setSelectedVersion] = useState<string>("latest");
  const [selectedChannel, setSelectedChannel] = useState<"all" | "self-miner" | "iexec">("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState<LeaderboardTimeRange>("7d");

  const { data: benchmarksData } = useBenchmarks({ limit: 50 });
  const availableBenchmarks: Benchmark[] = useMemo(() => {
    if (benchmarksData?.benchmarks?.length) {
      return benchmarksData.benchmarks;
    }
    return fallbackBenchmarks.map((item) => ({
      id: item.id,
      title: item.label,
      description: "",
      category: "general",
      difficulty: "medium",
      questionCount: 0,
      executionChannels: [],
      estimatedCost: { selfMiner: 0, iexec: 0 },
      tags: [],
      resultAnchorAddress: null,
      createdAt: "",
      updatedAt: "",
      benchmarkId: `${item.id}@latest`,
      rubricTags: [],
      executionStrategy: "Hybrid execution",
    }));
  }, [benchmarksData?.benchmarks, fallbackBenchmarks]);

  const benchmarkLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    availableBenchmarks.forEach((benchmark) => {
      map.set(benchmark.id, benchmark.title);
    });
    return map;
  }, [availableBenchmarks]);

  const selectedBenchmarkId = selectedBenchmark !== "all" ? selectedBenchmark : undefined;
  const shouldLoadVersion = Boolean(selectedBenchmarkId);
  const { data: benchmarkDetail } = useBenchmarkDetail(selectedBenchmarkId ?? "", {
    enabled: shouldLoadVersion,
  });

  const leaderboardFilters = useMemo<LeaderboardFilters>(() => {
    const filters: LeaderboardFilters = {
      benchmarkId: selectedBenchmarkId,
      version: selectedVersion !== "latest" ? selectedVersion : undefined,
      timeRange: selectedTimeRange,
      limit: LIMIT,
    };

    if (selectedChannel !== "all") {
      filters.executionChannel = selectedChannel;
    }

    return filters;
  }, [selectedBenchmarkId, selectedVersion, selectedTimeRange, selectedChannel]);

  const {
    data: leaderboardData,
    isLoading: isLeaderboardLoading,
    isFetching: isLeaderboardFetching,
    error: leaderboardError,
  } = useLeaderboard(leaderboardFilters);

  const { data: statsData, isLoading: isStatsLoading } = useLeaderboardStats({
    benchmarkId: selectedBenchmarkId,
    version: selectedVersion !== "latest" ? selectedVersion : undefined,
  });

  const normalizedRows = useMemo(() => {
    const fallbackBenchmarkLabel = selectedBenchmarkId
      ? benchmarkLabelMap.get(selectedBenchmarkId) ?? selectedBenchmarkId
      : filtersCopy.benchmark.allLabel;

    if (leaderboardData?.entries?.length) {
      return leaderboardData.entries.map((entry) => ({
        rank: entry.rank,
        agent: entry.agentName ?? entry.address,
        benchmark: entry.benchmarkTitle ?? fallbackBenchmarkLabel,
        score: formatNumber(entry.score),
        completion: `${entry.executionCount} ${runUnit}`,
        lastRun: formatTimestamp(entry.submittedAt),
        channel:
          entry.executionChannel === "self-miner"
            ? filtersCopy.channel.options.self
            : filtersCopy.channel.options.iexec,
        proof: entry.resultAnchorTx || entry.artifactCid || entry.dealId || entry.taskId
          ? {
              anchorLabel: entry.resultAnchorTx ? proofLabels.anchor : undefined,
              anchorUrl: entry.resultAnchorTx ?? entry.onChainProof,
              artifactLabel: entry.artifactCid ? proofLabels.artifact : undefined,
              artifactUrl: entry.artifactCid ? buildIpfsUrl(entry.artifactCid) : undefined,
              dealId: entry.dealId,
              taskId: entry.taskId,
            }
          : undefined,
      }));
    }

    return fallbackRows;
  }, [
    leaderboardData?.entries,
    fallbackRows,
    filtersCopy.benchmark.allLabel,
    filtersCopy.channel.options.self,
    filtersCopy.channel.options.iexec,
    proofLabels.anchor,
    proofLabels.artifact,
    selectedBenchmarkId,
    benchmarkLabelMap,
    runUnit,
  ]);

  const hasNoData =
    !isLeaderboardLoading &&
    !isLeaderboardFetching &&
    !leaderboardError &&
    leaderboardData?.entries &&
    leaderboardData.entries.length === 0;

  const tableColumnsCount = columns.proof ? 8 : 7;

  const versionOptions: FilterOption[] = useMemo(() => {
    if (!benchmarkDetail) {
      return [];
    }

    const versions = benchmarkDetail.versions.map((version) => ({
      value: version.version,
      label: `v${version.version}`,
    }));

    return versions;
  }, [benchmarkDetail]);

  const benchmarkOptions: FilterOption[] = useMemo(
    () =>
      availableBenchmarks.map((benchmark) => ({
        value: benchmark.id,
        label: benchmark.title,
      })),
    [availableBenchmarks],
  );

  const resetFilters = () => {
    setSelectedBenchmark("all");
    setSelectedVersion("latest");
    setSelectedChannel("all");
    setSelectedTimeRange("7d");
  };

  return (
    <div className="space-y-8">
      <GradientCard className="space-y-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-surface-contrast/80">{filtersCopy.hint}</p>
          <Button variant="tertiary" size="sm" onClick={resetFilters} className="shrink-0">
            {filtersCopy.resetLabel}
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <FilterControl
            label={filtersCopy.benchmark.label}
            value={selectedBenchmark}
            onChange={(event) => {
              const value = event.target.value;
              setSelectedBenchmark(value);
              setSelectedVersion("latest");
            }}
            options={[
              { value: "all", label: filtersCopy.benchmark.allLabel },
              ...benchmarkOptions,
            ]}
            placeholder={filtersCopy.benchmark.placeholder}
            data-testid="leaderboard-filter-benchmark"
          />

          <FilterControl
            label={filtersCopy.version.label}
            value={selectedVersion}
            onChange={(event) => setSelectedVersion(event.target.value)}
            options={[
              { value: "latest", label: filtersCopy.version.latestLabel },
              ...versionOptions,
            ]}
            placeholder={filtersCopy.version.placeholder}
            disabled={!shouldLoadVersion}
            data-testid="leaderboard-filter-version"
          />

          <FilterControl
            label={filtersCopy.channel.label}
            value={selectedChannel}
            onChange={(event) => setSelectedChannel(event.target.value as typeof selectedChannel)}
            options={[
              { value: "all", label: filtersCopy.channel.options.all },
              { value: "self-miner", label: filtersCopy.channel.options.self },
              { value: "iexec", label: filtersCopy.channel.options.iexec },
            ]}
            data-testid="leaderboard-filter-channel"
          />

          <FilterControl
            label={filtersCopy.time.label}
            value={selectedTimeRange}
            onChange={(event) => setSelectedTimeRange(event.target.value as LeaderboardTimeRange)}
            options={Object.entries(filtersCopy.time.options).map(([key, value]) => ({
              value: key,
              label: value,
            }))}
            data-testid="leaderboard-filter-time"
          />
        </div>
      </GradientCard>

      <div className="grid gap-4 md:grid-cols-4">
        {statsCopy.descriptors.map((descriptor) => (
          <MetricCard
            key={descriptor.id}
            label={descriptor.label}
            value={formatMetricValue(descriptor.id, statsData, descriptor.placeholder, isStatsLoading)}
          />
        ))}
      </div>

      <div className="space-y-6">
        {isLeaderboardLoading ? (
          <TableSkeleton rows={LIMIT / 2} columns={tableColumnsCount} />
        ) : hasNoData ? (
          <EmptyState
            title={emptyCopy.title}
            description={emptyCopy.description}
            action={
              emptyCopy.actionLabel
                ? {
                    label: emptyCopy.actionLabel,
                    onClick: resetFilters,
                  }
                : undefined
            }
            illustrationKey="sparkles"
          />
        ) : (
          <LeaderboardTable
            columns={columns}
            rows={normalizedRows}
            proofFallback={proofFallback}
          />
        )}
      </div>

      <GradientCard className="grid gap-6 p-6 md:grid-cols-3">
        <SummaryItem title={summaryCopy.anchor.title} description={summaryCopy.anchor.description} />
        <SummaryItem title={summaryCopy.artifacts.title} description={summaryCopy.artifacts.description} />
        <SummaryItem title={summaryCopy.explorer.title} description={summaryCopy.explorer.description} />
      </GradientCard>

      <div className="grid gap-4 md:grid-cols-3">
        <GradientCard className="space-y-2 p-4 md:col-span-2">
          <h3 className="font-heading text-lg font-semibold text-surface-contrast">{columns.score}</h3>
          <p className="text-sm text-surface-contrast/80">{legend.score}</p>
        </GradientCard>
        <GradientCard className="space-y-2 p-4">
          <h3 className="font-heading text-lg font-semibold text-surface-contrast">{columns.channel}</h3>
          <ul className="space-y-1 text-sm text-surface-contrast/80">
            <li>{legend.channel.hybrid}</li>
            <li>{legend.channel.iexec}</li>
            <li>{legend.channel.self}</li>
          </ul>
        </GradientCard>
      </div>

      {/* Category-specific leaderboards */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-heading text-3xl font-semibold text-surface-contrast">
            领域专项榜单
          </h2>
          <p className="text-text-secondary">
            各垂直领域的详细排名与执行报告
          </p>
        </div>
        <CategoryLeaderboardTabs
          categories={categoryTabs.categories}
          data={categoryTabs.data}
          emptyMessage={categoryTabs.emptyMessage}
          columns={categoryTabs.columns}
          actions={categoryTabs.actions}
        />
      </div>
    </div>
  );
}

type FilterControlProps = {
  label: string;
  placeholder?: string;
  options: FilterOption[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  "data-testid"?: string;
};

function FilterControl({
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled,
  "data-testid": dataTestId,
}: FilterControlProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-text-secondary">
      <span className="font-semibold uppercase tracking-wide text-surface-contrast/80">
        {label}
      </span>
      <select
        className={cn(
          "h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm text-text-primary transition focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40",
          disabled && "cursor-not-allowed opacity-70",
        )}
        value={value}
        onChange={onChange}
        disabled={disabled}
        data-testid={dataTestId}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type SummaryItemProps = {
  title: string;
  description: string;
};

function SummaryItem({ title, description }: SummaryItemProps) {
  return (
    <div className="space-y-2">
      <h4 className="font-heading text-base font-semibold text-surface-contrast">{title}</h4>
      <p className="text-sm text-surface-contrast/80">{description}</p>
    </div>
  );
}

function formatMetricValue(
  id: StatsCopy["descriptors"][number]["id"],
  stats: LeaderboardStats | undefined,
  placeholder: string,
  isLoading: boolean,
) {
  if (isLoading || !stats) {
    return placeholder;
  }

  switch (id) {
    case "participants":
      return stats.totalParticipants.toLocaleString();
    case "submissions":
      return stats.totalSubmissions.toLocaleString();
    case "topScore":
      return formatNumber(stats.topScore);
    case "averageScore":
      return formatNumber(stats.averageScore);
    default:
      return placeholder;
  }
}

function buildIpfsUrl(cid: string) {
  if (!cid) return undefined;
  if (cid.startsWith("ipfs://")) {
    return `https://ipfs.io/ipfs/${cid.replace("ipfs://", "")}`;
  }
  return `https://ipfs.io/ipfs/${cid}`;
}
