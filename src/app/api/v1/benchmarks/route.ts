import { NextResponse } from "next/server";
import { MOCK_BENCHMARKS } from "@/lib/mock-data/benchmarks";

/**
 * GET /api/v1/benchmarks
 *
 * Query parameters:
 * - search: string (optional) - Search in title and description
 * - difficulty: "easy" | "medium" | "hard" | "all" (optional)
 * - category: "reasoning" | "coding" | "multi-modal" | "math" | "all" (optional)
 * - page: number (optional, default: 1)
 * - pageSize: number (optional, default: 20)
 *
 * Returns: BenchmarksResponse
 * {
 *   benchmarks: Benchmark[],
 *   total: number,
 *   page: number,
 *   limit: number,
 *   hasMore: boolean
 * }
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const search = searchParams.get("search")?.toLowerCase() || "";
    const difficulty = searchParams.get("difficulty") || "all";
    const category = searchParams.get("category") || "all";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);

    // Start with all benchmarks
    let filtered = [...MOCK_BENCHMARKS];

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (benchmark) =>
          benchmark.title.toLowerCase().includes(search) ||
          benchmark.description.toLowerCase().includes(search)
      );
    }

    // Apply difficulty filter
    if (difficulty !== "all") {
      filtered = filtered.filter((benchmark) => benchmark.difficulty === difficulty);
    }

    // Apply category filter
    if (category !== "all") {
      filtered = filtered.filter((benchmark) => benchmark.category === category);
    }

    // Calculate pagination
    const total = filtered.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filtered.slice(startIndex, endIndex);

    // Return response matching BenchmarksResponse type
    return NextResponse.json({
      benchmarks: paginatedData,
      total,
      page,
      limit: pageSize,
      hasMore: endIndex < total,
    });
  } catch (error) {
    console.error("Error in /api/v1/benchmarks:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
