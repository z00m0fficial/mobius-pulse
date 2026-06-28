export interface ProviderExecutionResult {
  taskId: string;
  providerId: string;
  status: "completed" | "failed";
  confidence: number;
  latencyMs: number;
  verified: boolean;
}

export interface ProviderExecutedEvent {
  id: string;
  name: "ProviderExecuted";
  timestamp: string;
  source: string;
  organizationId: string;
  correlationId: string;
  payload: ProviderExecutionResult;
}

export interface PulseMetricRecordedEvent {
  id: string;
  name: "PulseMetricRecorded";
  version: "1.0";
  timestamp: string;
  source: "mobius-pulse";
  organizationId: string;
  correlationId: string;
  payload: {
    metric: string;
    value: number;
    unit: "score" | "percent" | "milliseconds" | "count";
    confidence: number;
    sourceEvent: string;
  };
}

export function recordProviderExecutionMetrics(event: ProviderExecutedEvent): PulseMetricRecordedEvent[] {
  const successValue = event.payload.status === "completed" ? 1 : 0;
  const verifiedValue = event.payload.verified ? 1 : 0;

  return [
    createMetric(event, "provider.execution.latency", event.payload.latencyMs, "milliseconds", 1),
    createMetric(event, "provider.execution.success", successValue, "score", event.payload.confidence),
    createMetric(event, "provider.execution.confidence", event.payload.confidence, "score", event.payload.confidence),
    createMetric(event, "provider.execution.verified", verifiedValue, "score", event.payload.confidence)
  ];
}

function createMetric(
  event: ProviderExecutedEvent,
  metric: string,
  value: number,
  unit: "score" | "percent" | "milliseconds" | "count",
  confidence: number
): PulseMetricRecordedEvent {
  return {
    id: "pulse-" + metric + "-" + Date.now(),
    name: "PulseMetricRecorded",
    version: "1.0",
    timestamp: new Date().toISOString(),
    source: "mobius-pulse",
    organizationId: event.organizationId,
    correlationId: event.correlationId,
    payload: {
      metric,
      value,
      unit,
      confidence,
      sourceEvent: event.id
    }
  };
}
