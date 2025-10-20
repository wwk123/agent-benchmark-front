/**
 * Type definitions for the Agent Benchmark platform
 * Based on the approved Stage 2 plan
 */

// ============ Benchmark Types ============

export type Difficulty = "easy" | "medium" | "hard";
export type ExecutionChannel = "self-miner" | "iexec" | "auto";

export type Benchmark = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  questionCount: number;
  executionChannels: ExecutionChannel[];
  estimatedCost: {
    selfMiner: number;
    iexec: number;
  };
  tags: string[];
  resultAnchorAddress: string | null;
  createdAt: string;
  updatedAt: string;
  benchmarkId: string;          // e.g., "web3-search@1.0.2"
  rubricTags: string[];         // e.g., ["事实性", "覆盖度", "引用准确", "清晰度"]
  executionStrategy: string;    // e.g., "禁网+白名单(离线包)"
};

export type BenchmarkDetail = Benchmark & {
  rubric: string; // Markdown content
  scoringRules: {
    maxScore: number;
    passingScore: number;
    breakdown: Array<{
      category: string;
      weight: number;
      description: string;
    }>;
  };
  examples: Array<{
    title: string;
    description: string;
    expectedOutput?: string;
  }>;
  resources: Array<{
    title: string;
    url: string;
    type: "documentation" | "dataset" | "reference" | "other";
  }>;
  versions: Array<{
    version: string;
    releaseDate: string;
    changelog: string;
  }>;
  currentVersion: string;
};

export type BenchmarkFilters = {
  difficulty?: Difficulty;
  tags?: string[];
  category?: string;
  search?: string;
  sortBy?: "newest" | "popular" | "difficulty";
  page?: number;
  limit?: number;
};

export type BenchmarksResponse = {
  benchmarks: Benchmark[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};

// ============ Leaderboard Types ============

export type LeaderboardEntry = {
  rank: number;
  address: string;
  agentName: string;
  benchmarkTitle?: string;
  score: number;
  executionCount: number;
  executionChannel: "self-miner" | "iexec";
  trend?: {
    rankChange: number;
    scoreChange: number;
  };
  onChainProof?: string;
  resultAnchorTx?: string;
  artifactCid?: string;
  dealId?: string;
  taskId?: string;
  submittedAt?: string;
};

export type LeaderboardTimeRange = "24h" | "7d" | "30d" | "all";

export type LeaderboardFilters = {
  benchmarkId?: string;
  version?: string;
  executionChannel?: "self-miner" | "iexec" | "all";
  timeRange?: LeaderboardTimeRange;
  page?: number;
  limit?: number;
};

export type LeaderboardResponse = {
  entries: LeaderboardEntry[];
  total: number;
  page: number;
  limit: number;
};

export type LeaderboardStats = {
  totalParticipants: number;
  totalSubmissions: number;
  averageScore: number;
  topScore: number;
};

// ============ Submission Types ============

export type AgentConfigType = "docker" | "http" | "github";

export type DockerAgentConfig = {
  type: "docker";
  image: string;
  tag: string;
  env?: Record<string, string>;
};

export type HttpAgentConfig = {
  type: "http";
  endpoint: string;
  apiKey?: string;
};

export type GitHubAgentConfig = {
  type: "github";
  repo: string;
  branch: string;
  buildCommand?: string;
};

export type AgentConfig = DockerAgentConfig | HttpAgentConfig | GitHubAgentConfig;

export type CostEstimate = {
  benchmarkId?: string;
  benchmarkVersion?: string;
  computation: number;
  storage: number;
  network: number;
  total: number;
  channel: "self-miner" | "iexec";
  totalUsd?: number;
  exchangeRate?: {
    rlcUsd: number;
    updatedAt?: string;
  };
  leaderboardOptIn?: boolean;
  leaderboardAdjustment?: number;
  notes?: string[];
};

export type SubmissionStatus =
  | "pending"
  | "queued"
  | "running"
  | "scoring"
  | "completed"
  | "failed"
  | "cancelled";

export type Submission = {
  id: string;
  userId: string;
  benchmarkId: string;
  benchmarkVersion?: string;
  benchmarkTitle: string;
  agentConfig: AgentConfig;
  executionChannel: "self-miner" | "iexec";
  status: SubmissionStatus;
  score: number | null;
  scoreBreakdown?: Array<{
    category: string;
    score: number;
    maxScore: number;
  }>;
  cost: number;
  executionTime?: number; // seconds
  errorMessage?: string;
  onChainProof?: string;
  leaderboardOptIn?: boolean;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
};

export type SubmissionEvent = {
  timestamp: string;
  type: "created" | "queued" | "started" | "scored" | "completed" | "failed" | "cancelled";
  message: string;
  metadata?: Record<string, unknown>;
};

export type SubmissionDetail = Submission & {
  events: SubmissionEvent[];
};

// ============ User Types ============

export type UserRole = "user" | "admin" | "moderator";

export type User = {
  id: string;
  address: string;
  roles: UserRole[];
  createdAt: string;
  lastLoginAt?: string;
};

export type UserStats = {
  totalSubmissions: number;
  completedSubmissions: number;
  averageScore: number;
  totalSpent: number;
  bestRank: number | null;
  bestScore: number | null;
};

export type WalletBalance = {
  rlc: number;
  usd: number;
  lastUpdated: string;
};

export type TransactionType = "deposit" | "withdraw" | "payment" | "refund" | "reward";

export type WalletTransaction = {
  id: string;
  type: TransactionType;
  amount: number;
  currency: "RLC";
  status: "pending" | "completed" | "failed";
  description: string;
  txHash?: string;
  createdAt: string;
  completedAt?: string;
};

export type NotificationType = "system" | "submission" | "governance" | "achievement";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
};

export type NotificationFilters = {
  type?: NotificationType;
  read?: boolean;
  page?: number;
  limit?: number;
};

// ============ Authentication Types ============

export type LoginNonceResponse = {
  nonce: string;
  expiresAt: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type WalletState = {
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
};
