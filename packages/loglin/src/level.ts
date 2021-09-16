export enum LogLevel {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Log = 'log',
  Info = 'info',
  Success = 'success',
  Debug = 'debug'
}

export const logLevels: Record<LogLevel, number> = {
  fatal: 0,
  error: 0,
  warn: 1,
  log: 2,
  info: 3,
  success: 3,
  debug: 4
}
