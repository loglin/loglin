import { createLogger } from '../src/logger'
import { LogLevels } from '../src/levels'
import { consoleReporter } from '@loglin/reporter-console'

describe('createLogger', () => {
  test('should throw error without reporter', () => {
    expect(() => {
      createLogger({
        reporters: [],
      })
    }).toThrowError()
  })
})

describe('logger', () => {
  const logLevels = Object.values(LogLevels)

  test('should call all log functions', () => {
    const logger = createLogger({
      reporters: [consoleReporter()],
    })

    logLevels.forEach((level) => {
      const log = (logger[level] = jest.fn())
      logger[level]('Message')
      expect(log).toHaveBeenCalled()
      expect(log).toHaveBeenCalledWith('Message')
    })
  })

  test('should return true for all log functions', () => {
    const logger = createLogger({
      level: LogLevels.Debug,
      reporters: [consoleReporter()],
    })

    logLevels.forEach((level) => {
      expect(logger[level]('Message')).toBe(true)
    })
  })

  test('should return true for fatal and error, false for others', () => {
    const logger = createLogger({
      level: LogLevels.Error,
      reporters: [consoleReporter()],
    })

    logLevels.forEach((level) => {
      const logResult = logger[level]('Message')

      if ([LogLevels.Fatal, LogLevels.Error].includes(level)) {
        expect(logResult).toBe(true)
      } else {
        expect(logResult).toBe(false)
      }
    })
  })
})

describe('logger.canLog', () => {
  const logger = createLogger({
    level: LogLevels.Info,
    reporters: [consoleReporter()],
  })

  test('should return true with level = fatal', () => {
    const result = logger.canLog(LogLevels.Fatal)
    expect(result).toBe(true)
  })

  test('should return false with level = debug', () => {
    const result = logger.canLog(LogLevels.Debug)
    expect(result).toBe(false)
  })
})
