import type { Benchmark, BenchmarkDetail } from "@/types/models";

/**
 * Mock benchmark data for development and testing
 * Total: 10 benchmarks
 * Distribution:
 * - Difficulty: Easy (3), Medium (4), Hard (3)
 */

export const MOCK_BENCHMARKS: Benchmark[] = [
  // ============ EASY ============
  {
    id: "bench-001",
    title: "General Knowledge Q&A",
    description: "Test agent's ability to answer general knowledge questions across various domains including history, science, and culture.",
    difficulty: "easy",
    questionCount: 100,
    executionChannels: ["self-miner", "iexec"],
    estimatedCost: {
      selfMiner: 5.0,
      iexec: 8.5,
    },
    tags: ["reasoning", "knowledge", "general"],
    resultAnchorAddress: null,
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-10-15T12:30:00Z",
  },
  {
    id: "bench-002",
    title: "Simple Text Classification",
    description: "Classify text snippets into predefined categories such as positive, negative, or neutral sentiment.",
    difficulty: "easy",
    questionCount: 80,
    executionChannels: ["self-miner", "iexec"],
    estimatedCost: {
      selfMiner: 4.2,
      iexec: 7.0,
    },
    tags: ["reasoning", "classification", "sentiment"],
    resultAnchorAddress: null,
    createdAt: "2024-02-01T10:15:00Z",
    updatedAt: "2024-10-14T09:20:00Z",
  },
  {
    id: "bench-003",
    title: "Basic Arithmetic Problems",
    description: "Solve elementary arithmetic problems involving addition, subtraction, multiplication, and division.",
    difficulty: "easy",
    questionCount: 120,
    executionChannels: ["self-miner", "iexec"],
    estimatedCost: {
      selfMiner: 3.5,
      iexec: 6.2,
    },
    tags: ["math", "arithmetic", "basic"],
    resultAnchorAddress: null,
    createdAt: "2024-01-20T14:30:00Z",
    updatedAt: "2024-10-16T15:45:00Z",
  },

  // ============ MEDIUM ============
  {
    id: "bench-004",
    title: "LeetCode Easy Collection",
    description: "Solve 50 curated LeetCode easy-level problems covering arrays, strings, and basic data structures.",
    difficulty: "medium",
    questionCount: 50,
    executionChannels: ["self-miner", "iexec"],
    estimatedCost: {
      selfMiner: 12.5,
      iexec: 18.0,
    },
    tags: ["coding", "algorithms", "data-structures"],
    resultAnchorAddress: null,
    createdAt: "2024-02-10T09:00:00Z",
    updatedAt: "2024-10-17T11:00:00Z",
  },
  {
    id: "bench-005",
    title: "Logical Reasoning Puzzles",
    description: "Solve complex logical puzzles and deduction problems that require multi-step reasoning.",
    difficulty: "medium",
    questionCount: 60,
    executionChannels: ["self-miner", "iexec"],
    estimatedCost: {
      selfMiner: 10.0,
      iexec: 15.5,
    },
    tags: ["reasoning", "logic", "puzzles"],
    resultAnchorAddress: null,
    createdAt: "2024-03-05T13:20:00Z",
    updatedAt: "2024-10-15T16:30:00Z",
  },
  {
    id: "bench-006",
    title: "Image Caption Generation",
    description: "Generate accurate and descriptive captions for diverse images including scenes, objects, and activities.",
    difficulty: "medium",
    questionCount: 200,
    executionChannels: ["iexec"],
    estimatedCost: {
      selfMiner: 0,
      iexec: 25.0,
    },
    tags: ["multi-modal", "vision", "generation"],
    resultAnchorAddress: null,
    createdAt: "2024-03-15T11:40:00Z",
    updatedAt: "2024-10-16T10:15:00Z",
  },
  {
    id: "bench-007",
    title: "Algebraic Equation Solver",
    description: "Solve algebraic equations ranging from linear to quadratic, showing step-by-step solution process.",
    difficulty: "medium",
    questionCount: 75,
    executionChannels: ["self-miner", "iexec"],
    estimatedCost: {
      selfMiner: 8.5,
      iexec: 13.0,
    },
    tags: ["math", "algebra", "equations"],
    resultAnchorAddress: null,
    createdAt: "2024-03-25T15:00:00Z",
    updatedAt: "2024-10-14T14:20:00Z",
  },

  // ============ HARD ============
  {
    id: "bench-008",
    title: "Advanced Algorithm Challenges",
    description: "Tackle LeetCode hard-level problems involving dynamic programming, graph algorithms, and complex optimization.",
    difficulty: "hard",
    questionCount: 30,
    executionChannels: ["self-miner", "iexec"],
    estimatedCost: {
      selfMiner: 28.0,
      iexec: 42.5,
    },
    tags: ["coding", "algorithms", "hard", "optimization"],
    resultAnchorAddress: null,
    createdAt: "2024-04-01T10:30:00Z",
    updatedAt: "2024-10-17T13:45:00Z",
  },
  {
    id: "bench-009",
    title: "Visual Question Answering",
    description: "Answer complex questions about images requiring deep understanding of visual context, relationships, and reasoning.",
    difficulty: "hard",
    questionCount: 150,
    executionChannels: ["iexec"],
    estimatedCost: {
      selfMiner: 0,
      iexec: 38.0,
    },
    tags: ["multi-modal", "vision", "reasoning", "qa"],
    resultAnchorAddress: null,
    createdAt: "2024-04-10T12:00:00Z",
    updatedAt: "2024-10-15T17:30:00Z",
  },
  {
    id: "bench-010",
    title: "System Design & Architecture",
    description: "Design scalable distributed systems and explain architectural decisions for real-world scenarios.",
    difficulty: "hard",
    questionCount: 20,
    executionChannels: ["self-miner"],
    estimatedCost: {
      selfMiner: 35.0,
      iexec: 0,
    },
    tags: ["coding", "system-design", "architecture", "scalability"],
    resultAnchorAddress: null,
    createdAt: "2024-04-20T14:15:00Z",
    updatedAt: "2024-10-16T09:00:00Z",
  },
];

/**
 * Mock benchmark detail data
 * Extended information for individual benchmark pages
 */
export const MOCK_BENCHMARK_DETAILS: Record<string, BenchmarkDetail> = {
  "bench-001": {
    ...MOCK_BENCHMARKS[0],
    rubric: `# General Knowledge Q&A Rubric

## Evaluation Criteria

### Accuracy (70%)
- Correct factual information
- Proper understanding of context
- Distinction between similar concepts

### Response Time (30%)
- Average time per question
- Consistency across question types

## Scoring Breakdown
- 90-100: Excellent - Demonstrates comprehensive knowledge
- 70-89: Good - Shows solid understanding with minor gaps
- 50-69: Fair - Basic knowledge with notable gaps
- Below 50: Needs Improvement
`,
    scoringRules: {
      maxScore: 100,
      passingScore: 70,
      breakdown: [
        {
          category: "Accuracy",
          weight: 0.7,
          description: "Percentage of correct answers",
        },
        {
          category: "Response Time",
          weight: 0.3,
          description: "Average time per question (normalized)",
        },
      ],
    },
    exampleQuestions: [
      {
        question: "What is the capital of France?",
        expectedAnswer: "Paris",
        difficulty: "easy",
      },
      {
        question: "Explain the theory of relativity in simple terms.",
        expectedAnswer: "The theory of relativity, developed by Albert Einstein, consists of two parts: special relativity (dealing with objects moving at constant speeds) and general relativity (dealing with gravity and acceleration).",
        difficulty: "medium",
      },
    ],
    submissionGuidelines: `## Submission Guidelines

1. **Input Format**: JSON with question and optional context
2. **Output Format**: JSON with answer and confidence score
3. **Time Limit**: 30 seconds per question
4. **Resource Limits**: 2GB memory, 2 CPU cores
`,
  },
};
