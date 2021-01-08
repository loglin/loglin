import { LogLevels, LogLevel, getLevelNumber } from './levels'
import type { Reporter, LogInfo, LogMeta, LogMessage } from './reporter'

export interface LoggerConfig {
  level?: LogLevels
  reporters: Reporter[]
}

export type LogFunction = (message: LogMessage, meta?: LogMeta) => boolean
export type LogMethods = Record<LogLevel, LogFunction>
export type CanLog = (minimumLevel: LogLevels) => boolean
export type Logger = LogMethods & { canLog: CanLog }

export function createLogger(config: LoggerConfig): Logger {
  if (!config.reporters || !config.reporters.length) {
    throw new Error('You need to add at least one reporter.')
  }

  const callReporters = (info: LogInfo) =>
    config.reporters.map((reporter) => reporter(info))

  const levelNumber = getLevelNumber(config.level || LogLevels.Info)
  const canLog: CanLog = (minimumLevel) =>
    levelNumber >= getLevelNumber(minimumLevel)
  const log = (info: LogInfo) =>
    Boolean(canLog(info.level) && callReporters(info))

  return {
    // Methods
    fatal: (message, meta) =>
      log({
        level: LogLevels.Fatal,
        message,
        meta,
      }),
    error: (message, meta) =>
      log({
        level: LogLevels.Error,
        message,
        meta,
      }),
    warn: (message, meta) =>
      log({
        level: LogLevels.Warn,
        message,
        meta,
      }),
    log: (message, meta) =>
      log({
        level: LogLevels.Log,
        message,
        meta,
      }),
    info: (message, meta) =>
      log({
        level: LogLevels.Info,
        message,
        meta,
      }),
    success: (message, meta) =>
      log({
        level: LogLevels.Success,
        message,
        meta,
      }),
    debug: (message, meta) =>
      log({
        level: LogLevels.Debug,
        message,
        meta,
      }),
    // Utils
    canLog,
  }
}
