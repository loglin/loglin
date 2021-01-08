import { createFilter, isFiltered } from '../src/filter'
import { LogLevels } from '../src/levels'

describe('createFilter', () => {
  test('should receive log info', () => {
    const filter = createFilter(() => {
      return ({ level, message }) => {
        expect(level).toBe(LogLevels.Info)
        expect(message).toBe('Foo')
        return true
      }
    })

    filter()({ level: LogLevels.Info, message: 'Foo' })
  })

  test('should receive meta data', () => {
    const customMeta = { custom: 'data' }

    const filter = createFilter(() => {
      return ({ meta }) => {
        expect(meta).toEqual(customMeta)
        return true
      }
    })

    filter()({ level: LogLevels.Info, message: 'Foo', meta: customMeta })
  })

  test('should receive options', () => {
    const customOptions = { foo: 'bar' }

    const filter = createFilter((options) => {
      expect(options).toEqual(customOptions)
      return () => true
    })

    filter(customOptions)
  })

  test('should return true if filter was executed', () => {
    const filter = createFilter(() => {
      return () => true
    })

    const ret = filter()({ level: LogLevels.Info, message: 'Foo' })
    expect(ret).toBe(true)
  })
})

describe('isFiltered', () => {
  const filterLevel = createFilter<{ level: LogLevels }>((options) => {
    return ({ level }) => level === options?.level
  })

  test('should only log fatal messages', () => {
    const filtered = isFiltered(
      [
        filterLevel({
          level: LogLevels.Fatal,
        }),
      ],
      {
        level: LogLevels.Info,
        message: 'Info',
      }
    )

    expect(filtered).toBe(true)
  })
})
