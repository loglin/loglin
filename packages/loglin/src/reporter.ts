import type { Filter } from './filter'
import type { LogLevel } from './level'
import type { Formatter } from './formatter'

export type LogMessage = unknown
export type LogMeta = unknown

export interface LogInfo {
  level: LogLevel
  message: LogMessage
  meta?: LogMeta
}

export type ReporterLogFunction = (info: LogInfo) => void
export interface ReporterOptions {
  filters?: Filter[]
  formatter?: Formatter
}

export type Reporter = {
  log: ReporterLogFunction
  filters: Filter[] | undefined
}
