import type { Benchmark, BenchmarkDetail } from "@/types/models";

type CategoryDetailConfig = {
  rubricIntro: string;
  rubricFocus: string[];
  scoring: Array<{ category: string; weight: number; description: string }>;
  examples: Array<{ title: string; description: string; expectedOutput?: string }>;
  resources: Array<{ title: string; url: string; type: "documentation" | "dataset" | "reference" | "other" }>;
  passingScore?: number;
  changelog?: string;
};

const CATEGORY_DETAIL_CONFIG: Record<string, CategoryDetailConfig> = {
  default: {
    rubricIntro:
      "Evaluates core benchmark readiness across accuracy, reliability and operational safeguards required by the platform.",
    rubricFocus: [
      "Deliver correct and verifiable outputs for the intended task.",
      "Provide actionable reasoning with references to trusted data.",
      "Respect latency budgets and safety guardrails defined by the platform.",
    ],
    scoring: [
      { category: "Accuracy", weight: 0.4, description: "Correctness of the recommendation or answer." },
      { category: "Reliability", weight: 0.35, description: "Instruction adherence, fallback handling and consistency." },
      { category: "Operational", weight: 0.25, description: "Response format, timeliness and reference quality." },
    ],
    examples: [
      { title: "Sample workflow", description: "Outline the expected submission structure with key checkpoints." },
      { title: "Error handling", description: "Explain how the agent should respond when upstream data is missing." },
    ],
    resources: [
      { title: "Submission checklist", url: "/docs/benchmarks/submission-checklist", type: "reference" },
      { title: "Runtime requirements", url: "/docs/benchmarks/runtime-requirements", type: "documentation" },
    ],
    passingScore: 70,
    changelog: "Generic mock rubric for benchmarks without dedicated configuration.",
  },
  "web3-search": {
    rubricIntro:
      "Measures intelligence retrieval agents on their ability to surface governance, treasury and protocol insights with verifiable provenance.",
    rubricFocus: [
      "Recover cross-chain governance, treasury and contract events with transaction proofs.",
      "Blend curated snapshots and streaming feeds to balance recall and precision.",
      "Sustain sub‑2s median responses while surfacing citation provenance.",
    ],
    scoring: [
      {
        category: "Factuality",
        weight: 0.4,
        description: "Answer correctness and accuracy of transaction / block citations.",
      },
      {
        category: "Coverage",
        weight: 0.35,
        description: "Ability to join multi-chain data and respond to composite intelligence prompts.",
      },
      {
        category: "Operational Excellence",
        weight: 0.25,
        description: "Latency, alert routing clarity and safe fallback handling.",
      },
    ],
    examples: [
      {
        title: "Cross-chain governance digest",
        description: "Summarise the last three governance decisions affecting the provided sequencer with tx references.",
        expectedOutput: "Bullet list referencing proposal IDs, transaction hashes and outcomes.",
      },
      {
        title: "Treasury monitoring alert",
        description: "Report inflows above 1M USDC into the given multisig and label counterparties.",
        expectedOutput: "Table with counterparty labels, token amounts and supporting hashes.",
      },
    ],
    resources: [
      { title: "Benchmark manifest", url: "/docs/benchmarks/web3-search#manifest", type: "documentation" },
      { title: "Dataset snapshot", url: "/docs/benchmarks/web3-search#dataset", type: "dataset" },
    ],
    passingScore: 75,
    changelog: "Seeded governance, treasury and dex coverage scenarios.",
  },
  "defi-exec": {
    rubricIntro:
      "Focuses on DeFi execution copilots: route quality, risk awareness and clarity of mitigation guidance without touching production liquidity.",
    rubricFocus: [
      "Produce executable multi-hop routes with gas, liquidity and compliance disclosures.",
      "Highlight slippage, oracle and MEV risks with concrete mitigation steps.",
      "Communicate playbooks in operator-friendly language that aligns with policy guardrails.",
    ],
    scoring: [
      {
        category: "Route Optimality",
        weight: 0.35,
        description: "Depth of path search, gas estimation and liquidity consideration.",
      },
      {
        category: "Risk Disclosure",
        weight: 0.4,
        description: "Coverage of slippage, MEV and protocol-specific hazards.",
      },
      {
        category: "Explainability",
        weight: 0.25,
        description: "Clarity of instructions and alignment with compliance hints.",
      },
    ],
    examples: [
      {
        title: "DEX routing plan",
        description: "Craft a three-hop swap plan under a 0.5% slippage budget with gas estimates.",
        expectedOutput: "Step-by-step route with pool addresses, expected output and warnings.",
      },
      {
        title: "Position stress test",
        description: "Assess the supplied LP position against oracle manipulation scenarios.",
        expectedOutput: "Scenario table detailing impact, detection signals and mitigations.",
      },
    ],
    resources: [
      { title: "Execution playbook", url: "/docs/benchmarks/defi-exec#playbook", type: "documentation" },
      { title: "Simulation dataset", url: "/docs/benchmarks/defi-exec#dataset", type: "dataset" },
    ],
    passingScore: 74,
    changelog: "Routing and risk exemplars derived from design brief.",
  },
  "sec-assist": {
    rubricIntro:
      "Benchmarks security assistants on incident triage, exploit mapping and remediation guidance quality for on-chain breaches.",
    rubricFocus: [
      "Detect and classify exploits with confidence grading and indicators of compromise.",
      "Present actionable remediation steps with patch references and owner assignments.",
      "Link evidence back to CVE records, chain data or intelligence sources.",
    ],
    scoring: [
      { category: "Detection", weight: 0.4, description: "Accuracy of exploit identification and impact analysis." },
      {
        category: "Remediation",
        weight: 0.35,
        description: "Quality of mitigation steps, patch references and prioritisation.",
      },
      {
        category: "Evidence",
        weight: 0.25,
        description: "Strength of supporting artefacts, provenance and auditing trace.",
      },
    ],
    examples: [
      {
        title: "Exploit timeline",
        description: "Reconstruct the timeline of the provided theft transaction with IoC mapping.",
        expectedOutput: "Structured timeline referencing transactions, contracts and attacker addresses.",
      },
      {
        title: "Patch checklist",
        description: "Draft a remediation plan for the vulnerable upgradeable contract snippet.",
        expectedOutput: "Checklist grouped by severity with owners and due dates.",
      },
    ],
    resources: [
      { title: "Exploit knowledge base", url: "/docs/benchmarks/sec-assist#knowledge-base", type: "reference" },
      { title: "Forensics toolkit", url: "/docs/benchmarks/sec-assist#toolkit", type: "documentation" },
    ],
    passingScore: 76,
    changelog: "Incident-response rubric based on Stage2 brief.",
  },
  "audit-helper": {
    rubricIntro:
      "Measures audit copilots on pinpointing vulnerabilities, grading severity and proposing remediations aligned with ecosystem standards.",
    rubricFocus: [
      "Localise vulnerabilities with references to affected code regions.",
      "Assess severity using reasoning tied to invariants and permission models.",
      "Recommend remediation steps aligned with guidelines and testing strategy.",
    ],
    scoring: [
      {
        category: "Localization",
        weight: 0.35,
        description: "Precision when pointing to impacted lines, functions or storage slots.",
      },
      {
        category: "Severity & Context",
        weight: 0.4,
        description: "Depth of severity reasoning and contextual analysis.",
      },
      {
        category: "Remediation Guidance",
        weight: 0.25,
        description: "Actionable fixes, test suggestions and standards references.",
      },
    ],
    examples: [
      {
        title: "Invariant break analysis",
        description: "Explain why the supplied state transition violates the documented invariant.",
        expectedOutput: "Paragraph referencing variables, invariants and potential impact.",
      },
      {
        title: "Upgrade diff review",
        description: "Summarise risky changes between two contract versions with mitigations.",
        expectedOutput: "Diff summary grouped by severity with patch hints.",
      },
    ],
    resources: [
      { title: "Audit checklist", url: "/docs/benchmarks/audit-helper#checklist", type: "documentation" },
      { title: "Coding standards", url: "/docs/benchmarks/audit-helper#standards", type: "reference" },
    ],
    passingScore: 75,
    changelog: "Static review rubric seeded from Stage2 design documents.",
  },
  "compliance-agent": {
    rubricIntro:
      "Evaluates compliance copilots on regulation mapping, escalation clarity and documentation traceability for Web3 programmes.",
    rubricFocus: [
      "Map scenarios to the correct jurisdictional obligations and exemptions.",
      "Outline escalation paths with accountable owners and time expectations.",
      "Reference policy documents or legal clauses for every recommendation.",
    ],
    scoring: [
      {
        category: "Regulation Mapping",
        weight: 0.4,
        description: "Accuracy of matching scenarios to jurisdictional requirements.",
      },
      {
        category: "Process Guidance",
        weight: 0.35,
        description: "Clarity of steps, escalation paths and required documentation.",
      },
      {
        category: "Communication",
        weight: 0.25,
        description: "Tone, completeness and stakeholder readiness of responses.",
      },
    ],
    examples: [
      {
        title: "Sanctions screening flow",
        description: "Draft the workflow when a counterparty appears on the sanctions list.",
        expectedOutput: "Decision tree with owners, documentation requirements and escalation targets.",
      },
      {
        title: "Travel Rule routing",
        description: "Advise how to process the displayed VASP transfer across jurisdictions.",
        expectedOutput: "Step-by-step instructions referencing relevant regulations and exemptions.",
      },
    ],
    resources: [
      { title: "Compliance knowledge base", url: "/docs/benchmarks/compliance-agent#kb", type: "documentation" },
      { title: "Reporting templates", url: "/docs/benchmarks/compliance-agent#templates", type: "reference" },
    ],
    passingScore: 73,
    changelog: "Compliance rubric covering sanctions, travel rule and governance drafting.",
  },
  "asset-discovery": {
    rubricIntro:
      "Tests asset discovery agents on clustering accuracy, flow narratives and evidence traceability across multi-chain datasets.",
    rubricFocus: [
      "Cluster related addresses with justification and confidence scores.",
      "Explain fund flows and counterparties with narrative clarity.",
      "Provide fresh data backed by on-chain proofs or analytics snapshots.",
    ],
    scoring: [
      {
        category: "Discovery Accuracy",
        weight: 0.4,
        description: "Correctness of clustering, path discovery and counterparty labelling.",
      },
      {
        category: "Narrative Quality",
        weight: 0.35,
        description: "Clarity of explaining flows, roles and risk implications.",
      },
      {
        category: "Evidence Freshness",
        weight: 0.25,
        description: "Proofs, timestamps and freshness of analytics outputs.",
      },
    ],
    examples: [
      {
        title: "Entity graph briefing",
        description: "Describe relationships between the supplied addresses with confidence labels.",
        expectedOutput: "Graph-style summary listing clusters, roles and supporting hashes.",
      },
      {
        title: "Flow alert",
        description: "Report abnormal cross-chain movements above the defined threshold with context.",
        expectedOutput: "Alert card summarising amounts, counterparties and rationale.",
      },
    ],
    resources: [
      { title: "Graph schema", url: "/docs/benchmarks/asset-discovery#schema", type: "documentation" },
      { title: "Index snapshots", url: "/docs/benchmarks/asset-discovery#snapshots", type: "dataset" },
    ],
    passingScore: 74,
    changelog: "Asset discovery rubric introducing clustering and narrative quality metrics.",
  },
} as const;

export const MOCK_BENCHMARKS: Benchmark[] = [
  {
    id: "bench-web3-atlas",
    benchmarkId: "web3-search@1.2.0",
    category: "web3-search",
    title: "Atlas Search Intelligence",
    description:
      "Multi-source on-chain intelligence retrieval spanning governance, contracts and treasury updates.",
    difficulty: "medium",
    questionCount: 96,
    executionChannels: ["self-miner", "iexec"],
    estimatedCost: {
      selfMiner: 11.4,
      iexec: 17.8,
    },
    tags: ["web3-search", "information-retrieval", "citations"],
    rubricTags: ["Factuality", "Coverage", "Citation quality", "Latency"],
    executionStrategy: "Hybrid index + curated on-chain dataset",
    resultAnchorAddress: "0x5aa1c0ffee000000000000000000000000000001",
    createdAt: "2025-05-18T09:00:00Z",
    updatedAt: "2025-10-15T10:00:00Z",
  },
  {
    id: "bench-web3-orion",
    benchmarkId: "web3-search@1.1.0",
    category: "web3-search",
    title: "Orion Watchlist Monitor",
    description:
      "Address watchlist monitoring, liquidation alerts and bridging flows summarisation for operations teams.",
    difficulty: "medium",
    questionCount: 72,
    executionChannels: ["self-miner", "iexec"],
    estimatedCost: {
      selfMiner: 9.1,
      iexec: 14.6,
    },
    tags: ["web3-search", "watchlist", "alerts"],
    rubricTags: ["Latency", "Precision", "Alert routing", "Explainability"],
    executionStrategy: "Streaming index + event subscription sandbox",
    resultAnchorAddress: "0x5aa1c0ffee000000000000000000000000000002",
    createdAt: "2025-04-28T08:30:00Z",
    updatedAt: "2025-09-30T09:30:00Z",
  },
  {
    id: "bench-defi-routecraft",
    benchmarkId: "defi-exec@0.9.5",
    category: "defi-exec",
    title: "RouteCraft Execution Playbook",
    description:
      "Generates executable multi-hop swap strategies with gas, liquidity and compliance annotations for DeFi operators.",
    difficulty: "hard",
    questionCount: 88,
    executionChannels: ["self-miner", "iexec"],
    estimatedCost: {
      selfMiner: 18.9,
      iexec: 27.4,
    },
    tags: ["defi", "execution", "routing"],
    rubricTags: ["Risk disclosure", "Route optimality", "Slippage", "Explainability"],
    executionStrategy: "Simulated swap routing with risk annotations",
    resultAnchorAddress: "0x5aa1c0ffee000000000000000000000000000003",
    createdAt: "2025-05-05T11:20:00Z",
    updatedAt: "2025-10-12T07:50:00Z",
  },
  {
    id: "bench-defi-slippage",
    benchmarkId: "defi-exec@0.9.1",
    category: "defi-exec",
    title: "SlippageGuard Scenario Lab",
    description:
      "Stress tests AMM positions and surfaces mitigation playbooks with verifiable data citations for risk teams.",
    difficulty: "medium",
    questionCount: 64,
    executionChannels: ["iexec"],
    estimatedCost: {
      selfMiner: 0,
      iexec: 19.6,
    },
    tags: ["defi", "risk", "monitoring"],
    rubricTags: ["Alert timeliness", "Scenario coverage", "Actionability", "Data citation"],
    executionStrategy: "Backtest engine + DEX oracle bundle",
    resultAnchorAddress: "0x5aa1c0ffee000000000000000000000000000004",
    createdAt: "2025-04-12T10:10:00Z",
    updatedAt: "2025-09-22T06:40:00Z",
  },
  {
    id: "bench-sec-sentinel",
    benchmarkId: "sec-assist@0.8.1",
    category: "sec-assist",
    title: "Sentinel Incident Triage",
    description:
      "Guides post-mortem triage with exploit mapping, impact grading and patch steps for on-chain security incidents.",
    difficulty: "hard",
    questionCount: 78,
    executionChannels: ["self-miner", "iexec"],
    estimatedCost: {
      selfMiner: 16.2,
      iexec: 24.9,
    },
    tags: ["security", "incident-response", "forensics"],
    rubricTags: ["Detection", "Confidence", "Remediation", "Evidence"],
    executionStrategy: "Exploit dataset + CVE knowledge base",
    resultAnchorAddress: "0x5aa1c0ffee000000000000000000000000000005",
    createdAt: "2025-05-22T12:00:00Z",
    updatedAt: "2025-10-11T08:45:00Z",
  },
  {
    id: "bench-sec-vulnwatch",
    benchmarkId: "sec-assist@0.7.6",
    category: "sec-assist",
    title: "VulnWatch Red Team Lab",
    description:
      "Benchmarks emerging exploit triage from indicators of compromise to mitigation drafts for red-team analysts.",
    difficulty: "hard",
    questionCount: 66,
    executionChannels: ["iexec"],
    estimatedCost: {
      selfMiner: 0,
      iexec: 22.3,
    },
    tags: ["security", "vulnerability", "threat-intel"],
    rubricTags: ["Exploit mapping", "Patch quality", "Context links", "Impact"],
    executionStrategy: "Zero-day corpus + chain-of-thought reasoning",
    resultAnchorAddress: "0x5aa1c0ffee000000000000000000000000000006",
    createdAt: "2025-04-02T14:25:00Z",
    updatedAt: "2025-09-14T09:35:00Z",
  },
  {
    id: "bench-audit-buddy",
    benchmarkId: "audit-helper@0.7.4",
    category: "audit-helper",
    title: "AuditBuddy Static Review",
    description:
      "Evaluates static review depth across invariants, permissioning and upgrade paths for smart-contract auditors.",
    difficulty: "hard",
    questionCount: 92,
    executionChannels: ["self-miner", "iexec"],
    estimatedCost: {
      selfMiner: 14.8,
      iexec: 21,
    },
    tags: ["audit", "static-analysis", "smart-contract"],
    rubricTags: ["Localization", "Severity", "Fix suggestions", "Standards"],
    executionStrategy: "Annotated code snippets + diff review",
    resultAnchorAddress: "0x5aa1c0ffee000000000000000000000000000007",
    createdAt: "2025-05-30T09:15:00Z",
    updatedAt: "2025-10-13T07:15:00Z",
  },
  {
    id: "bench-audit-diffguard",
    benchmarkId: "audit-helper@0.6.8",
    category: "audit-helper",
    title: "DiffGuard Upgrade Review",
    description: "Focuses on upgrade diff review, invariants regression and release note drafting.",
    difficulty: "medium",
    questionCount: 54,
    executionChannels: ["self-miner"],
    estimatedCost: {
      selfMiner: 9.6,
      iexec: 0,
    },
    tags: ["audit", "regression", "diff"],
    rubricTags: ["Diff accuracy", "Upgrade impact", "Checklist", "Reporting"],
    executionStrategy: "Git-based diff scanning with heuristics",
    resultAnchorAddress: "0x5aa1c0ffee000000000000000000000000000008",
    createdAt: "2025-03-27T13:05:00Z",
    updatedAt: "2025-09-05T06:20:00Z",
  },
  {
    id: "bench-compliance-pro",
    benchmarkId: "compliance-agent@0.5.2",
    category: "compliance-agent",
    title: "ComplyPro Sanction Lab",
    description: "Walks through sanctions screening, Travel Rule routing and escalation steps for compliance teams.",
    difficulty: "medium",
    questionCount: 68,
    executionChannels: ["self-miner", "iexec"],
    estimatedCost: {
      selfMiner: 8.7,
      iexec: 13.4,
    },
    tags: ["compliance", "kyc", "aml"],
    rubricTags: ["Regulation mapping", "Boundary guidance", "Documentation", "Actionability"],
    executionStrategy: "Policy knowledge base + decision tree",
    resultAnchorAddress: "0x5aa1c0ffee000000000000000000000000000009",
    createdAt: "2025-04-08T09:45:00Z",
    updatedAt: "2025-10-08T08:05:00Z",
  },
  {
    id: "bench-compliance-policybot",
    benchmarkId: "compliance-agent@0.5.0",
    category: "compliance-agent",
    title: "PolicyBot Governance Guide",
    description: "Guides policy drafting, approval trails and retained report templates for governance teams.",
    difficulty: "medium",
    questionCount: 52,
    executionChannels: ["self-miner"],
    estimatedCost: {
      selfMiner: 6.1,
      iexec: 0,
    },
    tags: ["compliance", "policy", "governance"],
    rubricTags: ["Jurisdiction awareness", "Record keeping", "Escalation", "Tone"],
    executionStrategy: "Workflow templates + policy snippets",
    resultAnchorAddress: "0x5aa1c0ffee00000000000000000000000000000a",
    createdAt: "2025-03-18T07:55:00Z",
    updatedAt: "2025-09-12T05:45:00Z",
  },
  {
    id: "bench-asset-grapheye",
    benchmarkId: "asset-discovery@0.6.0",
    category: "asset-discovery",
    title: "GraphEye Entity Atlas",
    description:
      "Surfaces entity overlays, fund flows and counterparty narratives from multi-chain data for investigations.",
    difficulty: "medium",
    questionCount: 84,
    executionChannels: ["self-miner", "iexec"],
    estimatedCost: {
      selfMiner: 12.3,
      iexec: 18.7,
    },
    tags: ["asset-tracing", "clustering", "on-chain"],
    rubricTags: ["Cluster accuracy", "Narrative", "Evidence", "Refresh speed"],
    executionStrategy: "Graph embeddings + address clustering",
    resultAnchorAddress: "0x5aa1c0ffee00000000000000000000000000000b",
    createdAt: "2025-04-20T10:25:00Z",
    updatedAt: "2025-10-11T11:35:00Z",
  },
  {
    id: "bench-asset-tracelink",
    benchmarkId: "asset-discovery@0.5.7",
    category: "asset-discovery",
    title: "TraceLink Flow Monitor",
    description: "Tracks cross-chain hops, MEV interactions and labels counterparties with freshness SLAs.",
    difficulty: "medium",
    questionCount: 58,
    executionChannels: ["iexec"],
    estimatedCost: {
      selfMiner: 0,
      iexec: 15.2,
    },
    tags: ["asset-tracing", "graph", "alerts"],
    rubricTags: ["Path discovery", "Alerting", "Case notes", "Data freshness"],
    executionStrategy: "Streaming graph queries + heuristics",
    resultAnchorAddress: "0x5aa1c0ffee00000000000000000000000000000c",
    createdAt: "2025-03-02T09:10:00Z",
    updatedAt: "2025-09-18T04:55:00Z",
  },
];

export const MOCK_BENCHMARK_DETAILS: Record<string, BenchmarkDetail> = Object.fromEntries(
  MOCK_BENCHMARKS.map((benchmark) => [benchmark.id, createDetail(benchmark)])
);

function createDetail(benchmark: Benchmark): BenchmarkDetail {
  const version = benchmark.benchmarkId.split("@")[1] ?? "1.0.0";
  const config = CATEGORY_DETAIL_CONFIG[benchmark.category] ?? CATEGORY_DETAIL_CONFIG.default;
  const focusList = config.rubricFocus.map((line) => `- ${line}`).join("\n");

  return {
    ...benchmark,
    rubric: `# ${benchmark.title} Rubric\n\n${config.rubricIntro}\n\n## Evaluation Focus\n${focusList}`,
    scoringRules: {
      maxScore: 100,
      passingScore: config.passingScore ?? 70,
      breakdown: config.scoring.map((item) => ({ ...item })),
    },
    examples: config.examples.map((example) => ({ ...example })),
    resources: config.resources.map((resource) => ({ ...resource })),
    versions: [
      {
        version,
        releaseDate: benchmark.updatedAt,
        changelog: config.changelog ?? "Initial mock benchmark detail seeded from design brief.",
      },
    ],
    currentVersion: version,
  };
}

