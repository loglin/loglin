import type { Reporter, LogInfo, LogMessage, LogMeta } from './reporter'
import { LogLevel } from './level'
import type { Filter, FilterInfo } from './filter'

export interface LoggerConfig {
  reporters: Reporter[]
  filters?: Filter[]
}

export type LogFunction = (message: LogMessage, meta?: LogMeta) => void
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
    (!config.filters ||
      (config.filters && checkFilters({ level: info.level }))) &&
    callReporters(info)

  return {
    fatal: (message, meta) =>
      !!log({
        level: LogLevel.Fatal,
        message,
        meta
      }),
    error: (message, meta) =>
      !!log({
        level: LogLevel.Error,
        message,
        meta
      }),
    warn: (message, meta) =>
      !!log({
        level: LogLevel.Warn,
        message,
        meta
      }),
    log: (message, meta) =>
      !!log({
        level: LogLevel.Log,
        message,
        meta
      }),
    info: (message, meta) =>
      !!log({
        level: LogLevel.Info,
        message,
        meta
      }),
    success: (message, meta) =>
      !!log({
        level: LogLevel.Success,
        message,
        meta
      }),
    debug: (message, meta) =>
      !!log({
        level: LogLevel.Debug,
        message,
        meta
      })
  }
}
