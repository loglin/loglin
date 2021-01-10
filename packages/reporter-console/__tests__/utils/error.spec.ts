import { parseStack, formatError } from '../../src/utils/error'

describe('parseStack', () => {
  const parsedStack = parseStack(new Error('Error').stack!)

  test('should return array with lines', () => {
    expect(Array.isArray(parsedStack)).toBe(true)
  })
})

describe('formatError', () => {
  test('should return undefined if error has no stack', () => {
    const error = new Error('Error')
    error.stack = undefined

    expect(formatError(error)).toBeUndefined()
  })

  test('should format error', () => {
    const error = new Error('Error')
    error.stack =
      'Error\n' + ['at line 1 (path)', 'at line 2 (path)'].join('\n')
    expect(formatError(error)).toMatchSnapshot()
  })
})
