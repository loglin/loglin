import type { Reporter, LogInfo, LogMessage } from './reporter'
import { LogLevel } from './level'
import type { Filter, FilterInfo } from './filter'

export interface LoggerConfig {
  reporters: Reporter[]
  filters?: Filter[]
}

export type LogFunction = (message: LogMessage) => void
export type Logger = Record<LogLevel, LogFunction>

export function createLogger(config: LoggerConfig): Logger {
  if (!config.reporters || !config.reporters.length) {
    throw new Error('You need to add at least one reporter.')
  }

  const checkFilters = (info: FilterInfo) =>
    config.filters?.every((f) => f(info))

  const callReporters = (info: LogInfo) => {
    for (const reporter of config.reporters) {
      if (reporter.filters) {
        const canLog = reporter.filters.every((f) => f({ level: info.level }))
        if (!canLog) continue
      }

      reporter.log(info)
    }
  }

  const log = (info: LogInfo) =>
    checkFilters({ level: info.level }) && callReporters(info)

  return {
    fatal: (message) =>
      !!log({
        message,
        level: LogLevel.Fatal
      }),
    error: (message) =>
      !!log({
        message,
        level: LogLevel.Error
      }),
    warn: (message) =>
      !!log({
        message,
        level: LogLevel.Warn
      }),
    log: (message) =>
      !!log({
        message,
        level: LogLevel.Log
      }),
    info: (message) =>
      !!log({
        message,
        level: LogLevel.Info
      }),
    success: (message) =>
      !!log({
        message,
        level: LogLevel.Success
      }),
    debug: (message) =>
      !!log({
        message,
        level: LogLevel.Debug
      })
  }
}
