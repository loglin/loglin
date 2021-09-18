import type { Reporter, ReporterOptions } from 'loglin'
import { basicFormatter } from './formatter'

export function consoleReporter(options?: ReporterOptions): Reporter {
  const formatter = options?.formatter || basicFormatter()

  return {
    log: (info) => console.log(formatter(info)),
    filters: options?.filters
  }
}
