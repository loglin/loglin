import type { LogLevel } from 'loglin'
import chalk, { Chalk, ForegroundColor, BackgroundColor } from 'chalk'

export type LevelColor = {
  text?: string
  labelBackground: string
  labelText: string
}

export type StackColors = {
  stackAtColor: string
  stackFileColor: string
}

export type LevelColors = Record<LogLevel, LevelColor & StackColors>

export type ColorsConfig = Partial<
  Record<LogLevel, Partial<LevelColor & StackColors>>
>

export const defaultColors: LevelColors = {
  fatal: {
    labelText: '#fff',
    labelBackground: '#f54761',
    stackAtColor: 'gray',
    stackFileColor: 'cyan'
  },
  error: {
    labelText: '#fff',
    labelBackground: '#f54761',
    stackAtColor: 'gray',
    stackFileColor: 'cyan'
  },
  warn: {
    labelText: '#fff',
    labelBackground: '#ffc966',
    stackAtColor: 'gray',
    stackFileColor: 'cyan'
  },
  log: {
    labelText: '#384a57',
    labelBackground: '#fff',
    stackAtColor: 'gray',
    stackFileColor: 'cyan'
  },
  info: {
    labelText: '#fff',
    labelBackground: '#51d1fb',
    stackAtColor: 'gray',
    stackFileColor: 'cyan'
  },
  success: {
    labelText: '#fff',
    labelBackground: '#05e17a',
    stackAtColor: 'gray',
    stackFileColor: 'cyan'
  },
  debug: {
    labelText: '#fff',
    labelBackground: '#aaa',
    stackAtColor: 'gray',
    stackFileColor: 'cyan'
  }
}

export function mergeColors(colors: ColorsConfig) {
  const mergedColors: ColorsConfig = {}

  for (const level in colors) {
    const defaultColorConfig = defaultColors[level as LogLevel]
    const colorConfig = colors[level as LogLevel]

    mergedColors[level as LogLevel] = {
      ...defaultColorConfig,
      ...colorConfig
    }
  }

  return {
    ...defaultColors,
    ...mergedColors
  } as LevelColors
}

export type ColorCache = Record<string, Chalk>

const colorCache: ColorCache = {}
const hexRegex = /^#([0-9A-F]{3}){1,2}$/i

export function chalkColor(name: string) {
  let color = colorCache[name]
  if (color) return color

  if (hexRegex.test(name)) {
    color = chalk.hex(name)
  } else {
    try {
      color = chalk[name as typeof ForegroundColor] || chalk.keyword(name)
    } catch {
      throw new Error(
        chalk.red(
          `Color "${chalk.bold(
            name
          )}" is not a valid chalk color. Ignoring it.\n`
        )
      )
    }
  }

  colorCache[name] = color
  return color
}

const bgColorCache: ColorCache = {}

export function chalkBgColor(name: string) {
  let color = bgColorCache[name]

  if (color) return color

  if (hexRegex.test(name)) {
    color = chalk.bgHex(name)
  } else {
    try {
      color =
        chalk[
          ('bg' +
            name[0].toUpperCase() +
            name.slice(1)) as typeof BackgroundColor
        ] || chalk.bgKeyword(name)
    } catch {
      throw new Error(
        chalk.red(
          `Background color "${chalk.bold(name)}" is not a valid chalk color.`
        )
      )
    }
  }

  bgColorCache[name] = color
  return color
}
