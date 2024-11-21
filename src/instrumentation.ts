import { NodeSDK } from '@opentelemetry/sdk-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';

const packageName = process.env.npm_package_name!.replace(/-/g, '_');
const otelSDK = new NodeSDK({
  autoDetectResources: true,
  serviceName: packageName,
  metricReader: new PrometheusExporter({
    prefix: packageName,
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.TRACE_EXPORTER_URL,
  }),
  instrumentations: [getNodeAutoInstrumentations(), new PinoInstrumentation()],
});

export default otelSDK;
