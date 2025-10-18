"use client";

import { use } from "react";
import { ExternalLink } from "lucide-react";
import { useBenchmarkDetail } from "@/hooks/use-benchmarks";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CardSkeleton } from "@/components/ui/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";

type BenchmarkDetailPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default function BenchmarkDetailPage({ params }: BenchmarkDetailPageProps) {
  const { id } = use(params);
  const { data: benchmark, isLoading, error } = useBenchmarkDetail(id);

  if (isLoading) {
    return (
      <div className="layout-container py-8">
        <CardSkeleton count={1} />
      </div>
    );
  }

  if (error || !benchmark) {
    return (
      <div className="layout-container py-8">
        <EmptyState
          variant="error"
          title="Benchmark not found"
          description="The benchmark you are looking for does not exist."
        />
      </div>
    );
  }

  return (
    <div className="layout-container space-y-6 py-8">
      <PageHeader
        breadcrumbs={[
          { label: "Benchmarks", href: "/benchmarks" },
          { label: benchmark.title },
        ]}
        title={benchmark.title}
        description={benchmark.description}
      />

      <Tabs defaultValue="rubric">
        <TabsList>
          <TabsTrigger value="rubric">Rubric</TabsTrigger>
          <TabsTrigger value="scoring">Scoring</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
        </TabsList>

        <TabsContent value="rubric">
          <div className="card p-6">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-text-secondary">{benchmark.rubric}</pre>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scoring">
          <div className="card space-y-6 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-text-secondary">Maximum Score</p>
                <p className="text-3xl font-bold text-brand-primary">{benchmark.scoringRules.maxScore}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Passing Score</p>
                <p className="text-3xl font-bold text-emerald-600">{benchmark.scoringRules.passingScore}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-primary">Score Breakdown</h3>
              {benchmark.scoringRules.breakdown.map((item) => (
                <div key={item.category} className="card p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold text-text-primary">{item.category}</h4>
                      <p className="text-sm text-text-secondary">{item.description}</p>
                    </div>
                    <span className="text-lg font-bold text-brand-primary">{item.weight}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="examples">
          <div className="space-y-4">
            {benchmark.examples.map((example) => (
              <div key={example.title} className="card space-y-3 p-6">
                <h4 className="text-lg font-semibold text-brand-primary">{example.title}</h4>
                <p className="text-sm text-text-secondary">{example.description}</p>
                {example.expectedOutput && (
                  <div className="rounded-lg bg-surface-muted p-4">
                    <pre className="overflow-x-auto text-sm">{example.expectedOutput}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="space-y-3">
            {benchmark.resources.map((resource) => (
              <div key={resource.url} className="card flex items-center justify-between p-4">
                <div>
                  <h4 className="font-semibold text-text-primary">{resource.title}</h4>
                  <p className="text-xs text-text-muted capitalize">{resource.type}</p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="versions">
          <div className="space-y-3">
            {benchmark.versions.map((version) => (
              <div key={version.version} className="card space-y-3 p-6">
                <div className="flex justify-between">
                  <h4 className="text-lg font-semibold text-brand-primary">v{version.version}</h4>
                  <span className="text-sm text-text-muted">
                    {new Date(version.releaseDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{version.changelog}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
