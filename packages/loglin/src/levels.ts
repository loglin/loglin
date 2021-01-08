export enum LogLevels {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Log = 'log',
  Info = 'info',
  Success = 'success',
  Debug = 'debug',
}

// @TODO Replace with template string literal `${LogLevels}`
// when API Extractor was updated to TS v4.1
export type LogLevel =
  | LogLevels.Fatal
  | LogLevels.Error
  | LogLevels.Warn
  | LogLevels.Log
  | LogLevels.Info
  | LogLevels.Success
  | LogLevels.Debug

export const logLevels: Record<LogLevel, number> = {
  fatal: 0,
  error: 0,
  warn: 1,
  log: 2,
  info: 3,
  success: 3,
  debug: 4,
} as const

export const getLevelNumber = (level: LogLevels) => logLevels[level]
