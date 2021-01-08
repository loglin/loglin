import { getLevelNumber, LogLevels } from '../src/levels'

describe('getLevelNumber', () => {
  test('should return number', () => {
    expect(typeof getLevelNumber(LogLevels.Fatal)).toBe('number')
  })
})
