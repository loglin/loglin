import { createLogger } from 'loglin'
import { consoleReporter, fancyFormatter } from '@loglin/reporter-console'
import { benchmark, logBenchmarkResult } from '@jalik/benchmark'
import pino from 'pino'

const loglinLogger = createLogger({
  reporters: [
    consoleReporter({
      formatter: fancyFormatter(),
    }),
  ],
})

const pinoLogger = pino({
  prettyPrint: true,
})

function loglinLog() {
  loglinLogger.info('Info')
}

function pinoLog() {
  pinoLogger.info('Info')
}

logBenchmarkResult(benchmark({ loglinLog, pinoLog }, 10000))
