import type { Formatter } from 'loglin'
import { formatStack } from '../stack'

export function basicFormatter(): Formatter {
  return ({ level, message }) => {
    const formattedMessage =
      message instanceof Error
        ? `${message.message}${formatStack(message)?.join('\n') + '\n'}`
        : message

    return `[${level.toUpperCase()}] ${formattedMessage}`
  }
}
