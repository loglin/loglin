import { consoleReporter } from '../src/reporter'
import { createFilter, LogLevels } from 'loglin'

describe('consolReporter', () => {
  const onlyFatal = createFilter(() => {
    return ({ level }) => level === LogLevels.Fatal
  })

  test('should return false if log was filtered', () => {
    const reporter = consoleReporter({
      filters: [onlyFatal()],
    })

    const result = reporter({
      level: LogLevels.Success,
      message: 'Message',
    })

    expect(result).toBe(false)
  })

  test('should return undefined', () => {
    const reporter = consoleReporter({
      filters: [onlyFatal()],
    })

    const result = reporter({
      level: LogLevels.Fatal,
      message: 'Message',
    })

    expect(result).toBeUndefined()
  })
})
