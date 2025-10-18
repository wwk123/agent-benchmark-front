import { NextResponse } from "next/server";
import { MOCK_BENCHMARKS, MOCK_BENCHMARK_DETAILS } from "@/lib/mock-data/benchmarks";
import type { BenchmarkDetail } from "@/types/models";

/**
 * GET /api/v1/benchmarks/[id]
 *
 * Returns detailed information for a specific benchmark
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Check if detailed data exists
    if (MOCK_BENCHMARK_DETAILS[id]) {
      return NextResponse.json(MOCK_BENCHMARK_DETAILS[id]);
    }

    // If not in details, find in basic list and generate detail
    const benchmark = MOCK_BENCHMARKS.find((b) => b.id === id);

    if (!benchmark) {
      return NextResponse.json({ error: "Benchmark not found" }, { status: 404 });
    }

    // Generate basic detail structure for benchmarks without custom details
    const generatedDetail: BenchmarkDetail = {
      ...benchmark,
      longDescription: `${benchmark.description}\n\nThis benchmark provides a comprehensive evaluation of agent capabilities in the ${benchmark.category} domain. Difficulty level: ${benchmark.difficulty}.`,

      setup: {
        inputFormat: "JSON format with test cases",
        outputFormat: "JSON format with predictions",
        timeLimit: benchmark.difficulty === "easy" ? 30 : benchmark.difficulty === "medium" ? 60 : 120,
        resourceLimits: {
          memory: benchmark.difficulty === "easy" ? "2GB" : benchmark.difficulty === "medium" ? "4GB" : "8GB",
          cpu:
            benchmark.difficulty === "easy" ? "2 cores" : benchmark.difficulty === "medium" ? "4 cores" : "8 cores",
        },
      },

      evaluation: {
        scoringMethod: "Automated evaluation based on defined metrics",
        passingScore: 70,
        metrics: benchmark.metrics.map((metric) => ({
          name: metric,
          description: `Evaluation metric: ${metric}`,
          weight: 1 / benchmark.metrics.length,
        })),
      },

      topSubmissions: [
        {
          id: `${id}-top-1`,
          rank: 1,
          agentName: "Top Agent 1",
          score: Math.min(100, benchmark.avgScore + 10),
          submittedAt: new Date(Date.now() - 86400000).toISOString(),
          userId: "user-001",
        },
        {
          id: `${id}-top-2`,
          rank: 2,
          agentName: "Top Agent 2",
          score: Math.min(100, benchmark.avgScore + 5),
          submittedAt: new Date(Date.now() - 172800000).toISOString(),
          userId: "user-002",
        },
        {
          id: `${id}-top-3`,
          rank: 3,
          agentName: "Top Agent 3",
          score: benchmark.avgScore,
          submittedAt: new Date(Date.now() - 259200000).toISOString(),
          userId: "user-003",
        },
      ],
    };

    return NextResponse.json(generatedDetail);
  } catch (error) {
    console.error(`Error in /api/v1/benchmarks/[id]:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
