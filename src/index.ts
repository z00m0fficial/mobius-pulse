export type { PulseMetricName, PulseMetricSnapshot, DepartmentHealthSnapshot } from "./models.js";

export function createMetricSnapshotId(): string {
  return "pulse-" + Date.now();
}

export function calculateAverageScore(values: number[]): number {
  if (values.length === 0) return 0;
  const total = values.reduce((sum, value) => sum + value, 0);
  return Math.round((total / values.length) * 100) / 100;
}
