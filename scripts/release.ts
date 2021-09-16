import path from 'path'
import fs from 'fs-extra'
import { execSync } from 'child_process'
import { $ } from 'zx'

execSync('npx bumpp package.json packages/*/package.json', { stdio: 'inherit' })

main()

async function main() {
  const packages = await getPackages()
  const { version } = await fs.readJSON('package.json')

  /*for (const packageName of packages) {
    const pkgPath = path.join('packages', packageName, 'package.json')
    const pkg = await fs.readJSON(pkgPath)
    const deps = pkg.dependencies
    if (!deps) continue

    for (const depName of Object.keys(deps)) {
      pkg.dependencies[depName] = `v${version}`
    }

    await fs.writeJSON(pkgPath, pkg, { spaces: 2 })
  }*/

  await $`git add .`
  await $`git commit -m "chore: release v${version}"`
  await $`git tag v${version}`
  await $`git push`
  await $`git push origin --tags`
}

async function getPackages() {
  const dirs = await fs.readdir(path.join('packages'))
  return dirs.filter((name) =>
    fs.statSync(path.join('packages', name)).isDirectory()
  )
}
