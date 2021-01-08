import { createFormatter } from '../src/formatter'
import { LogLevels } from '../src/levels'

describe('createFormatter', () => {
  test('should call given format function', () => {
    const formatter = createFormatter(() => {
      return () => ''
    })

    const mockedFormatter = jest.fn(formatter)
    mockedFormatter({ level: LogLevels.Info, message: 'Foo' })
    expect(mockedFormatter).toHaveBeenCalled()
  })

  test('should receive log info', () => {
    const formatter = createFormatter(() => {
      return ({ level, message }) => {
        expect(level).toBe(LogLevels.Info)
        expect(message).toBe('Foo')
        return ''
      }
    })

    formatter()({ level: LogLevels.Info, message: 'Foo' })
  })

  test('should receive meta data', () => {
    const customMeta = { custom: 'data' }

    const formatter = createFormatter(() => {
      return ({ meta }) => {
        expect(meta).toEqual(customMeta)
        return ''
      }
    })

    formatter()({
      level: LogLevels.Info,
      message: 'Foo',
      meta: customMeta,
    })
  })

  test('should receive options', () => {
    const customOptions = { foo: 'bar' }

    const formatter = createFormatter((options) => {
      expect(options).toBe(customOptions)
      return () => ''
    })

    formatter(customOptions)
  })
})
