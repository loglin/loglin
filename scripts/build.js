// inspired by https://github.com/vuejs/vue-next/blob/master/scripts/build.js
const path = require('path')
const fse = require('fs-extra')
const args = require('minimist')(process.argv.slice(2))
const execa = require('execa')
const chalk = require('chalk')
const { gzipSync } = require('zlib')
const { compress } = require('brotli')
const { targets: allTargets, packagesDir } = require('./utils')
const buildTypes = args.t || args.types

run()

async function run() {
  await buildAll(allTargets)
  checkAllSizes(allTargets)
}

async function runParallel(maxConcurrency, source, iteratorFn) {
  const ret = []
  const executing = []
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source))
    ret.push(p)

    if (maxConcurrency <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}

async function buildAll(targets) {
  if (buildTypes) {
    await execa('tsc', [
      '--emitDeclarationOnly',
      '--project',
      './tsconfig.build.json',
    ])
  }

  await runParallel(require('os').cpus().length, targets, build)

  await fse.remove('dist')
}

async function build(target) {
  const pkgDir = path.resolve(packagesDir, target)
  const pkg = require(path.resolve(pkgDir, 'package.json'))

  console.log(chalk.bold.yellow(`\nBuilding ${pkg.name} ...`))

  await execa(
    'rollup',
    ['-c', '--environment', [`TARGET:${target}`].filter(Boolean).join(',')],
    { stdio: 'inherit' }
  )

  if (buildTypes) {
    const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')
    const extractorConfigPath = path.resolve(pkgDir, 'api-extractor.json')
    const extractorConfig = ExtractorConfig.loadFileAndPrepare(
      extractorConfigPath
    )

    const extractorResult = Extractor.invoke(extractorConfig, {
      localBuild: true,
      showVerboseMessages: true,
    })

    if (extractorResult.succeeded) {
      console.log(chalk.bold.green(`API Extractor completed successfully.`))
    } else {
      console.error(
        `API Extractor completed with ${extractorResult.errorCount} errors` +
          ` and ${extractorResult.warningCount} warnings.`
      )
      process.exitCode = 1
    }
  }
}

function checkAllSizes(targets) {
  console.log()
  for (const target of targets) {
    checkSize(target)
  }
  console.log()
}

function checkSize(target) {
  const pkgDir = path.resolve(`packages/${target}`)
  checkFileSize(`${pkgDir}/dist/${target}.cjs.js`)
}

function checkFileSize(filePath) {
  if (!fse.existsSync(filePath)) {
    return
  }
  const file = fse.readFileSync(filePath)
  const minSize = (file.length / 1024).toFixed(2) + 'kb'
  const gzipped = gzipSync(file)
  const gzippedSize = (gzipped.length / 1024).toFixed(2) + 'kb'
  const compressed = compress(file)
  const compressedSize = (compressed.length / 1024).toFixed(2) + 'kb'
  console.log(
    `${chalk.gray(
      chalk.bold(path.basename(filePath))
    )} min:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`
  )
}
