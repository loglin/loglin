import { createFormatter, LogLevels, FormatterFunction } from 'loglin'
import { bold } from 'chalk'
import {
  LevelColors,
  isThemeTextColor,
  mergeColors,
  defaultColors,
  ColorsConfig,
} from './colors'
import { chalkBgColor, chalkColor, formatError } from './utils'

export const createLabel = (
  level: LogLevels,
  colors: LevelColors = defaultColors
) => {
  const colorsConfig = colors[level]

  return chalkBgColor(colorsConfig.labelBackground)(
    `${bold(` ${chalkColor(colorsConfig.labelText)(level.toUpperCase())} `)}`
  )
}

// @TODO Remove explicit type
// https://github.com/microsoft/rushstack/issues/1050
export const basicFormatter: FormatterFunction = createFormatter(
  () => ({ level, message }) => `[${level.toUpperCase()}] ${message}`
)

// @TODO Remove explicit type
// https://github.com/microsoft/rushstack/issues/1050

export interface FancyFormatterOptions {
  colors?: ColorsConfig
}

export const fancyFormatter: FormatterFunction<FancyFormatterOptions> = createFormatter<FancyFormatterOptions>(
  (options) => {
    const colors = options?.colors ? mergeColors(options.colors) : defaultColors
    const labels: Partial<Record<LogLevels, string>> = {}

    return ({ level, message }) => {
      const textColor = colors[level].text

      let fancyMessage = isThemeTextColor(textColor)
        ? message
        : chalkColor(textColor)(message)

      if (message instanceof Error) {
        fancyMessage += formatError(message)
      }

      const cachedLabel = labels[level]
      if (cachedLabel) return `${cachedLabel} ${fancyMessage}`

      const label = createLabel(level, colors)
      labels[level] = label

      return `${label} ${fancyMessage}`
    }
  }
)
