import { createReporter, getLevelNumber, CreatedReporter } from 'loglin'
import { basicFormatter } from './formatter'

// @TODO Remove explicit type
// https://github.com/microsoft/rushstack/issues/1050
export const consoleReporter: CreatedReporter = createReporter((options) => {
  const formatter = options?.formatter || basicFormatter()

  return (info) => {
    const formattedMessage = formatter(info)
    const logger =
      getLevelNumber(info.level) < 2 ? process.stderr : process.stdout

    logger.write(formattedMessage + '\n')
  }
})
