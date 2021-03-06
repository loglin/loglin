import { sep } from 'path'
import chalk from 'chalk'

export function parseStack(stack: string) {
  const cwd = process.cwd() + sep

  const lines = stack
    .split('\n')
    .splice(1)
    .map((l) => l.trim().replace('file://', '').replace(cwd, ''))

  return lines
}

export function formatError(error: Error) {
  if (!error.stack) {
    return
  }

  const stack =
    '\n\n' +
    parseStack(error.stack)
      .map(
        (line) =>
          '  ' +
          line
            .replace(/^at +/, (m) => chalk.gray(m))
            .replace(/\((.+)\)/, (_, m) => `(${chalk.cyan(m)})`)
      )
      .join('\n') +
    '\n'

  return stack
}
