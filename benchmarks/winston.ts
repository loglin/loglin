import { createLogger, transports, format } from 'winston'
import { measure, logMeasureResult } from '@jalik/benchmark'

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.colorize(),
    }),
  ],
})

function log() {
  logger.warn('Warn')
}

logMeasureResult(measure(log, 10000))
