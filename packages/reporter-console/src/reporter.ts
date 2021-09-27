import { Reporter, ReporterOptions, LogLevel } from 'loglin'
import { basicFormatter } from './formatter'

export function consoleReporter(options?: ReporterOptions): Reporter {
  const formatter = options?.formatter || basicFormatter()

  return {
    log: (info) =>
      info.level !== LogLevel.Fatal && info.level !== LogLevel.Success
        ? console[info.level](formatter(info))
        : console.log(formatter(info)),
    filters: options?.filters
  }
}
