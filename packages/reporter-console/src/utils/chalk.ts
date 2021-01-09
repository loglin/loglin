import chalk, { Chalk, ForegroundColor, BackgroundColor } from 'chalk'

type ColorCache = Record<string, Chalk>

const colorCache: ColorCache = {}

export function chalkColor(name: string) {
  let color = colorCache[name]
  if (color) {
    return color
  }

  if (name[0] === '#') {
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
  if (color) {
    return color
  }

  if (name[0] === '#') {
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
