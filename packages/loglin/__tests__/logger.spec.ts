import { createLogger } from '../src/logger'

describe('createLogger', () => {
  it('should throw error without reporter', () => {
    expect(() => {
      createLogger({
        reporters: []
      })
    }).toThrowError()
  })
})
