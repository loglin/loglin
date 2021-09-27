import { LogLevel, logLevels } from './level'

export interface FilterInfo {
  level: LogLevel
}

export type Filter = (info: FilterInfo) => boolean

export const isMinimumLevel =
  (miniumLevel: LogLevel): Filter =>
  ({ level }) =>
    logLevels[miniumLevel] >= logLevels[level]
