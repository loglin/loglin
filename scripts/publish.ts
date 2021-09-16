import { $ } from 'zx'

main()

async function main() {
  await $`npx pnpm -r publish --tag next --access public`
}
