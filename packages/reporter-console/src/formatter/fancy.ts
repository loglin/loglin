import { Formatter, LogLevel } from 'loglin'
import { sep } from 'path'
import {
  defaultColors,
  LevelColors,
  ColorsConfig,
  mergeColors,
  chalkBgColor,
  chalkColor
} from '../colors'

export function fancyFormatter(options?: { colors: ColorsConfig }): Formatter {
  const colors = options?.colors ? mergeColors(options.colors) : defaultColors
  const labels: Partial<Record<LogLevel, string>> = {}

  return ({ level, message }) => {
    const textColor = colors[level].text
    let fancyMessage = message

    if (!labels[level]) {
      labels[level] = createLabel(level, colors)
    }

    if (message instanceof Error) {
      fancyMessage =
        (textColor ? chalkColor(textColor)(message.message) : message.message) +
        formatError(message, level, colors)
    } else if (textColor) {
      fancyMessage = chalkColor(textColor)(message)
    }

    return `${labels[level]} ${fancyMessage}`
  }
}

export function createLabel(level: LogLevel, colors: LevelColors) {
  const colorsConfig = colors[level]

  return chalkBgColor(colorsConfig.labelBackground)(
    chalkColor(colorsConfig.labelText).bold(` ${level.toUpperCase()} `)
  )
}

export function parseStack(stack: string) {
  const cwd = process.cwd() + sep

  return stack
    .split('\n')
    .splice(1)
    .map((l) => l.trim().replace('file://', '').replace(cwd, ''))
}

export function formatError(
  error: Error,
  level: LogLevel,
  colors: LevelColors
) {
  if (!error.stack) return

  const stack =
    '\n\n' +
    parseStack(error.stack)
      .map(
        (line) =>
          '  ' +
          line
            .replace(/^at +/, (m) => chalkColor(colors[level].stackAtColor)(m))
            .replace(
              /\((.+)\)/,
              (_, m) => `(${chalkColor(colors[level].stackFileColor)(m)})`
            )
      )
      .join('\n') +
    '\n'

  return stack
}
