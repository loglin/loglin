import chalk from 'chalk'
import { chalkColor, chalkBgColor } from '../../src/utils/chalk'

describe('chalkColor', () => {
  test('should throw error if no valid color was provided', () => {
    expect(() => chalkColor('not valid')).toThrowError()
  })

  test('should return chalk color if hex color was provided', () => {
    expect(chalkColor('#FF0000')('Message')).toEqual(
      chalk.hex('#FF0000')('Message')
    )
  })

  test('should return chalk color if chalk color name was provided', () => {
    expect(chalkColor('red')('Message')).toEqual(chalk.red('Message'))
  })

  test('should return chalk color if chalk keyword was provided', () => {
    expect(chalkColor('orange')('Message')).toEqual(
      chalk.keyword('orange')('Message')
    )
  })
})

describe('chalkBgColor', () => {
  test('should throw error if no valid color was provided', () => {
    expect(() => chalkBgColor('not valid')).toThrowError()
  })

  test('should return chalk color if hex color was provided', () => {
    expect(chalkBgColor('#FF0000')('Message')).toEqual(
      chalk.bgHex('#FF0000')('Message')
    )
  })

  test('should return chalk color if chalk color name was provided', () => {
    expect(chalkBgColor('red')('Message')).toEqual(chalk.bgRed('Message'))
  })

  test('should return chalk color if chalk keyword was provided', () => {
    expect(chalkBgColor('orange')('Message')).toEqual(
      chalk.bgKeyword('orange')('Message')
    )
  })
})
