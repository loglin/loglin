const fs = require('fs')
const path = require('path')
const { targets, packagesDir } = require('../../scripts/utils')

;(async () => {
  const pkgPath = path.join(__dirname, 'package.json')
  console.log(pkgPath)
  const pkg = require(pkgPath)
  const deps = Object.keys(pkg.dependencies || {})
  const peerDeps = Object.keys(pkg.peerDependencies || {})

  for (const dep of deps) {
    if (!targets.includes(dep)) {
      continue
    }

    pkg['dependencies'][dep] = '^' + getDepVersion(dep)
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
  }
})()

function getDepVersion(dep) {
  const pkgPath = path.join(packagesDir, dep, 'package.json')
  const pkg = require(pkgPath)
  return pkg.version
}
