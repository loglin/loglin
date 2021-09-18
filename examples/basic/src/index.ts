import { createLogger, isMinimumLevel, LogLevel } from 'loglin'
import { consoleReporter } from '@loglin/reporter-console'

const logger = createLogger({
  reporters: [consoleReporter()],
  filters: [isMinimumLevel(LogLevel.Fatal)]
})

logger.fatal('fatal', { someMeta: 'info' })
logger.debug('debug')
