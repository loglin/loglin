import { createLogger, isMinimumLevel, LogLevel } from 'loglin'
import { consoleReporter, fancyFormatter } from '@loglin/reporter-console'

const logger = createLogger({
  reporters: [
    consoleReporter({
      formatter: fancyFormatter()
    })
  ],
  filters: [isMinimumLevel(LogLevel.Fatal)]
})

logger.fatal(new Error('fatal'))
logger.debug('debug')
