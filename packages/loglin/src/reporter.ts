import type { LogLevels } from './levels'
import type { Formatter } from './formatter'
import type { Filter } from './filter'

export interface LogInfo {
  level: LogLevels
  message: LogMessage
  meta?: LogMeta
}

export type LogMessage = any
export type LogMeta = any

export type CustomReporterOptions = Record<string, any>
export type ReporterOptions<O extends CustomReporterOptions> = O & {
  formatter?: Formatter
  filters?: Filter[]
}

export type Reporter = (info: LogInfo) => void
export type ReporterFunction<
  O extends CustomReporterOptions = CustomReporterOptions
> = (options?: ReporterOptions<O>) => Reporter

export type CreatedReporter<O extends CustomReporterOptions> = (
  options?: ReporterOptions<O>
) => Reporter

export function createReporter<O extends CustomReporterOptions>(
  reporter: ReporterFunction<O>
): CreatedReporter<O> {
  return (options) => reporter(options)
}
