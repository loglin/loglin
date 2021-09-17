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

export type ReporterOptions<O extends CustomReporterOptions> = O & {
  filters?: Filter[]
}

export type ReporterLogFunction = (info: LogInfo) => void
export type ReporterFunction<O extends CustomReporterOptions> = (
  options?: ReporterOptions<O>
) => ReporterLogFunction

export type Reporter = {
  log: ReporterLogFunction
  filters: Filter[] | undefined
}

export type CreatedReporter<O extends CustomReporterOptions> = (
  options?: ReporterOptions<O>
) => Reporter

export function createReporter<O extends CustomReporterOptions>(
  reporter: ReporterFunction<O>
): CreatedReporter<O> {
  return (options) => ({ log: reporter(options), filters: options?.filters })
}
