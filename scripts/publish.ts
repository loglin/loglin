import { $ } from 'zx'

main()

async function main() {
  await $`npx pnpm -r publish --access public`
}
