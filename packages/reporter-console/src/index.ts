import type { Reporter, ReporterOptions } from 'loglin'

export function consoleReporter(options?: ReporterOptions): Reporter {
  return {
    log: ({ message }) => console.log(message),
    filters: options?.filters
  }
}
