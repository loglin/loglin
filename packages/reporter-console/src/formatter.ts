import type { Formatter } from 'loglin'

export function basicFormatter(): Formatter {
  return ({ level, message }) => `[${level.toUpperCase()}] ${message}`
}
