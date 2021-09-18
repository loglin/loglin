import type { Filter } from './filter'
import type { LogLevel } from './level'

export type LogMessage = unknown
export type LogMeta = unknown
export type CustomReporterOptions = Record<string, any>

export interface LogInfo {
  level: LogLevel
  message: LogMessage
  meta?: LogMeta
}

export type ReporterLogFunction = (info: LogInfo) => void
export interface ReporterOptions {
  filters?: Filter[]
}

export type Reporter = {
  log: ReporterLogFunction
  filters: Filter[] | undefined
}
