import type { LogMeta, LogMessage } from './reporter'
import type { LogLevels } from './levels'

export interface FormatterInfo {
  level: LogLevels
  message: LogMessage
  meta?: LogMeta
}

export type FormatterOptions = Record<string, any>
export type FormatterReturn = string | number | boolean | object
export type Formatter = (info: FormatterInfo) => FormatterReturn
export type FormatterFunction<O extends FormatterOptions = FormatterOptions> = (
  options?: O
) => Formatter

export type CreatedFormatter<O extends FormatterOptions> = (
  options?: O
) => Formatter

export function createFormatter<O extends FormatterOptions>(
  formatter: FormatterFunction<O>
): CreatedFormatter<O> {
  return (options) => formatter(options)
}
