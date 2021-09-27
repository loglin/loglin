import { sep } from 'path'

export function parseStack(stack: string) {
  const cwd = process.cwd() + sep

  return stack
    .split('\n')
    .splice(1)
    .map((l) => l.trim().replace('file://', '').replace(cwd, ''))
}

export function formatStack(error: Error) {
  if (!error.stack) return
  return ['\n', ...parseStack(error.stack).map((line) => '  ' + line)]
}
