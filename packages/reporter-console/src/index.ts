import { createReporter } from 'loglin'

export const reporter = createReporter(() => {
  return (options) => {
    console.log(options.message)
  }
})
