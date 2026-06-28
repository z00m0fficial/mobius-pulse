export type PulseMetricName =
  | "OIES"
  | "MIS"
  | "VCI"
  | "DecisionLatency"
  | "MemoryReuseRate"
  | "DepartmentHealth"
  | "RepositoryHealth"
  | "LearningVelocity";

export interface PulseMetricSnapshot {
  id: string;
  timestamp: string;
  organizationId: string;
  metric: PulseMetricName;
  value: number;
  unit: "score" | "percent" | "milliseconds" | "minutes" | "count";
  trend: "up" | "down" | "stable";
  confidence: number;
  source: string;
}

export interface DepartmentHealthSnapshot {
  department: string;
  health: number;
  availability: number;
  quality: number;
  performance: number;
  verificationRate: number;
  improvementOpportunities: string[];
}
