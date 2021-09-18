import type { LogLevel } from './level'
import type { LogMessage, LogMeta } from './reporter'

export interface FormatterInfo {
  level: LogLevel
  message: LogMessage
  meta?: LogMeta
}

export type Formatter = (info: FormatterInfo) => unknown
