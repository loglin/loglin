import type { LogLevels } from 'loglin'

export interface LevelColor {
  text: string
  labelBackground: string
  labelText: string
}

export type LevelColors = Record<LogLevels, LevelColor>
export type ColorsConfig = Partial<Record<LogLevels, Partial<LevelColor>>>

const labelTextColor = '#384A57'
const THEME_TEXT_COLOR = 'THEME_TEXT_COLOR'
const textColor = THEME_TEXT_COLOR

export const isThemeTextColor = (color: string) => color === THEME_TEXT_COLOR

export const defaultColors: LevelColors = {
  fatal: {
    text: textColor,
    labelText: labelTextColor,
    labelBackground: '#F54761',
  },
  error: {
    text: textColor,
    labelText: labelTextColor,
    labelBackground: '#F54761',
  },
  warn: {
    text: textColor,
    labelText: labelTextColor,
    labelBackground: '#FFC966',
  },
  log: {
    text: textColor,
    labelText: labelTextColor,
    labelBackground: '#FFF',
  },
  info: {
    text: textColor,
    labelText: labelTextColor,
    labelBackground: '#51D1FB',
  },
  success: {
    text: textColor,
    labelText: labelTextColor,
    labelBackground: '#05E17A',
  },
  debug: {
    text: textColor,
    labelText: labelTextColor,
    labelBackground: '#AAA',
  },
}

export function mergeColors(colors: ColorsConfig) {
  const mergedColors: ColorsConfig = {}

  for (const level in colors) {
    const defaultColorConfig = defaultColors[level as LogLevels]
    const colorConfig = colors[level as LogLevels]

    mergedColors[level as LogLevels] = {
      ...defaultColorConfig,
      ...colorConfig,
    }
  }

  return {
    ...defaultColors,
    ...mergedColors,
  } as LevelColors
}
