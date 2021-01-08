import { createReporter } from '../src/reporter'
import { LogLevels } from '../src/levels'

describe('createReporter', () => {
  test('should call given log function', () => {
    const reporter = createReporter(() => {
      return () => {}
    })

    const mockedLog = jest.fn(reporter)
    mockedLog({ level: LogLevels.Info, message: 'Info' })
    expect(mockedLog).toHaveBeenCalled()
  })

  test('should receive options', () => {
    const reporterOptions = { foo: 'bar' }

    const reporter = createReporter((options) => {
      expect(options).toEqual(reporterOptions)
      return () => {}
    })

    reporter(reporterOptions)
  })

  test('should receive log info', () => {
    const reporter = createReporter(() => {
      return ({ level, message }) => {
        expect(level).toBe(LogLevels.Fatal)
        expect(message).toBe('Foo')
      }
    })

    reporter().log({ level: LogLevels.Fatal, message: 'Foo' })
  })

  test('should receive meta data', () => {
    const customMeta = { custom: 'data' }

    const reporter = createReporter(() => {
      return ({ meta }) => {
        expect(meta).toEqual(customMeta)
      }
    })

    reporter().log({
      level: LogLevels.Success,
      message: 'It works',
      meta: customMeta,
    })
  })
})
