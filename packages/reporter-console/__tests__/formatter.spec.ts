import { LogLevels } from 'loglin'
import { createLabel, basicFormatter, fancyFormatter } from '../src/formatter'
import { mergeColors } from '../src/colors'

describe('createLabel', () => {
  test('should create label with default colors', () => {
    expect(createLabel(LogLevels.Success)).toMatchInlineSnapshot(`"[1m SUCCESS [22m"`)
  })

  test('should create label with customized colors', () => {
    const colors = mergeColors({ success: { labelBackground: '#FFC7D4' } })
    expect(createLabel(LogLevels.Success, colors)).toMatchSnapshot()
  })
})

describe('basicFormatter', () => {
  test('should format message', () => {
    const formatter = basicFormatter()
    expect(
      formatter({ level: LogLevels.Info, message: 'Info' })
    ).toMatchSnapshot()
  })
})

describe('fancyFormatter', () => {
  test('should format message with default colors', () => {
    const formatter = fancyFormatter()
    expect(
      formatter({ level: LogLevels.Info, message: 'Info' })
    ).toMatchSnapshot()
  })

  test('should format message with custom colors', () => {
    const formatter = fancyFormatter({
      colors: {
        info: {
          labelText: '#FFF',
          text: '#00FF00',
        },
      },
    })

    expect(
      formatter({ level: LogLevels.Info, message: 'Info' })
    ).toMatchSnapshot()
  })

  test('should format message if instanceof Error', () => {
    const formatter = fancyFormatter()

    expect(
      formatter({
        level: LogLevels.Error,
        message: new Error('Something went wrong'),
      })
    ).toMatchSnapshot()
  })

  // @TODO How to test that correctly?
  test('should use cached label', () => {
    const formatter = fancyFormatter()

    for (let i = 0; i < 2; i++) {
      expect(
        formatter({ level: LogLevels.Success, message: 'Success' })
      ).toMatchSnapshot()
    }
  })
})
