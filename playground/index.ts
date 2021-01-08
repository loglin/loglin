import { createLogger, createFilter } from 'loglin'
import { consoleReporter, fancyFormatter } from '@loglin/reporter-console'

const onlyFatal = createFilter((options) => {
  return () => true
})

const logger = createLogger({
  reporters: [
    consoleReporter({
      formatter: fancyFormatter(),
      filters: [onlyFatal()],
    }),
  ],
})

logger.fatal('Fatal Error!')
logger.success('It works!')
