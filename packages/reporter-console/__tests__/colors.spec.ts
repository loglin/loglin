import {
  isThemeTextColor,
  mergeColors,
  defaultColors,
  ColorsConfig,
} from '../src/colors'

describe('isThemeTextColor', () => {
  test('should return true if theme text color', () => {
    expect(isThemeTextColor('THEME_TEXT_COLOR')).toBe(true)
  })

  test('should return false for everything else', () => {
    expect(isThemeTextColor('#FF0000')).toBe(false)
  })
})

describe('mergeColors', () => {
  test('should merge colors and override labelBackground', () => {
    const labelBackground = '#FF0000'
    const colorsConfig: ColorsConfig = {
      fatal: {
        labelBackground,
      },
    }

    const mergedColors = mergeColors(colorsConfig)
    const colors = defaultColors
    colors.fatal.labelBackground = labelBackground

    expect(mergedColors).toEqual(colors)
  })
})
