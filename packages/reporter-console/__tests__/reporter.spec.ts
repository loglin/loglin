import { consoleReporter } from '../src/reporter'
import { createFilter, LogLevels } from 'loglin'

describe('consoleReporter', () => {
  const onlyFatal = createFilter(() => {
    return ({ level }) => level === LogLevels.Fatal
  })

  test('should return undefined', () => {
    const reporter = consoleReporter({
      filters: [onlyFatal()],
    })

    const result = reporter.log({
      level: LogLevels.Fatal,
      message: 'Message',
    })

    expect(result).toBeUndefined()
  })
})
