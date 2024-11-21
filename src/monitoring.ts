import { NodeSDK } from '@opentelemetry/sdk-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

const otelSDK = new NodeSDK({
  autoDetectResources: true,
  serviceName: 'nestjs_sqlite',
  metricReader: new PrometheusExporter({
    prefix: 'nestjs_sqlite',
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.TRACE_EXPORTER_URL,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

export default otelSDK;

// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
// process.on('SIGTERM', () => {
//   otelSDK
//     .shutdown()
//     .then(
//       () => console.log('SDK shut down successfully'),
//       (err) => console.log('Error shutting down SDK', err),
//     )
//     .finally(() => process.exit(0));
// });
