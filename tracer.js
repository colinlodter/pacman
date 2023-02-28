const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const {
  logConfig,
  populateEnv,
} = require('./utils.js');


console.log('Enabling tracing via OpenTelemetry');

logConfig();
populateEnv();

// If OTEL_LOG_LEVEL env var is set, configure logger
if (process.env.OTEL_LOG_LEVEL) {
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel[process.env.OTEL_LOG_LEVEL]);
}

const { start } = require('@splunk/otel');

start({
  serviceName: 'clodter_pacman',
  metrics: true,
  profiling: true,
  tracing: {},
});

// 'use strict'

// const process = require('process');
// const opentelemetry = require('@opentelemetry/sdk-node');
// const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
// const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
// const { Resource } = require('@opentelemetry/resources');
// const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// // configure the SDK to export telemetry data to the console
// // enable all auto-instrumentations from the meta package
// const traceExporter = new ConsoleSpanExporter();
// const sdk = new opentelemetry.NodeSDK({
//   resource: new Resource({
//     [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',
//   }),
//   traceExporter,
//   instrumentations: [getNodeAutoInstrumentations()]
// });

// // initialize the SDK and register with the OpenTelemetry API
// // this enables the API to record telemetry
// sdk.start();

// // gracefully shut down the SDK on process exit
// process.on('SIGTERM', () => {
//   sdk.shutdown()
//     .then(() => console.log('Tracing terminated'))
//     .catch((error) => console.log('Error terminating tracing', error))
//     .finally(() => process.exit(0));
// });