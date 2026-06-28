import { recordProviderExecutionMetrics, type ProviderExecutedEvent } from "./provider-metrics.js";

const providerExecuted: ProviderExecutedEvent = {
  id: "evt-provider-demo",
  name: "ProviderExecuted",
  timestamp: new Date().toISOString(),
  source: "mobius-provider-engine",
  organizationId: "mobius-technologies",
  correlationId: "corr-demo",
  payload: {
    taskId: "task-demo",
    providerId: "codex",
    status: "completed",
    confidence: 0.86,
    latencyMs: 42,
    verified: true
  }
};

const metrics = recordProviderExecutionMetrics(providerExecuted);

console.log(JSON.stringify(metrics, null, 2));
