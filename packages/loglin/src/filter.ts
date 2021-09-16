import type { LogLevel } from './level'

export interface FilterInfo {
  level: LogLevel
}

export type Filter = (info: FilterInfo) => boolean

export const isMinimumLevel =
  (miniumLevel: LogLevel): Filter =>
  ({ level }) =>
    level >= miniumLevel
