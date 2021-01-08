import type { LogMeta, LogMessage, LogInfo } from './reporter'
import type { LogLevels } from './levels'

export interface FilterInfo {
  level: LogLevels
  message: LogMessage
  meta?: LogMeta
}

export type FilterOptions = Record<string, any>
export type Filter = (info: FilterInfo) => boolean
export type FilterFunction<O extends FilterOptions = FilterOptions> = (
  options?: O
) => Filter

export type CreatedFilter<O extends FilterOptions> = (options?: O) => Filter

export function createFilter<O extends FilterOptions>(
  filter: FilterFunction<O>
): CreatedFilter<O> {
  return (options) => filter(options)
}

export const isFiltered = (filters: Filter[], info: LogInfo) =>
  filters.some((filter) => !filter(info))
