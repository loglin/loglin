import {
  createReporter,
  isFiltered,
  getLevelNumber,
  ReporterFunction,
} from 'loglin'
import { basicFormatter } from './formatter'

// @TODO Remove explicit type
// https://github.com/microsoft/rushstack/issues/1050
export const consoleReporter: ReporterFunction = createReporter((options) => {
  const formatter = options?.formatter || basicFormatter()
  const filters = options?.filters

  return (info) => {
    if (filters && filters.length && isFiltered(filters, info)) return false

    const formattedMessage = formatter(info)
    const logger =
      getLevelNumber(info.level) < 2 ? process.stderr : process.stdout

    logger.write(formattedMessage + '\n')
  }
})
