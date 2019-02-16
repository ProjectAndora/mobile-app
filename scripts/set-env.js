const fs = require('fs')
const path = require('path')

const filesDir = path.resolve(process.cwd(), 'files')
const baseDir = process.cwd()
const expoDir = path.resolve(filesDir, 'expo')
const nativeDir = path.resolve(filesDir, 'native')

const copyFile = (src, dst) => {
  const data = fs.readFileSync(src)
  fs.writeFileSync(dst, data)
}

const copyRelativeFile = (srcDir, dstDir, fileName, revert = false) => {
  const dstPath = path.resolve(dstDir, fileName)
  try {
    fs.unlinkSync(dstPath)
  } catch (err) {
  }
  if (!revert) {
    copyFile(path.resolve(srcDir, fileName), dstPath)
  }
}

const makeRelativeSymlink = (srcDir, dstDir, fileName, revert = false) => {
  const dstPath = path.resolve(dstDir, fileName)
  try {
    fs.unlinkSync(dstPath)
  } catch (err) {
  }
  if (!revert) {
    fs.symlinkSync(path.resolve(srcDir, fileName), dstPath)
  }
}

const linkPackageLock = fromDir => {
  makeRelativeSymlink(fromDir, baseDir, 'package-lock.json')
}

const lockFile = path => {
  fs.chmodSync(path, 0o444)
}

const unlockFile = path => {
  fs.chmodSync(path, 0o664)
}

const mergePackageJson = fromDir => {
  const fileName = 'package.json'
  const original = JSON.parse(fs.readFileSync(path.resolve(baseDir, fileName), 'utf8'))
  const from = fromDir ? JSON.parse(fs.readFileSync(path.resolve(fromDir, fileName), 'utf8')) : {}
  const shared = JSON.parse(fs.readFileSync(path.resolve(filesDir, fileName), 'utf8'))

  const merged = {
    main: original.main,
    scripts: {
      ...(fromDir && from.scripts) || {},
      ...(fromDir && shared.scripts) || {},
      'env-clean': (original.scripts || {})['env-clean'],
      'env-expo': (original.scripts || {})['env-expo'],
      'env-native': (original.scripts || {})['env-native'],
    },
    dependencies: {
      ...(fromDir && from.dependencies) || {},
      ...(fromDir && shared.dependencies) || {},
    },
    devDependencies: {
      ...(fromDir && from.devDependencies) || {},
      ...(fromDir && shared.devDependencies) || {},
    },
    private: true,
  }

  const mergedPath = path.resolve(baseDir, fileName)

  try {
    unlockFile(mergedPath)
  } catch (err) {
  }
  fs.writeFileSync(mergedPath, JSON.stringify(merged, undefined, 2))
  lockFile(mergedPath)
}

const copyExpoStuff = (revert = false) => {
  makeRelativeSymlink(expoDir, baseDir, 'app.json', revert)
  const assets = ['icon.png', 'splash.png']
  for (asset of assets) {
    makeRelativeSymlink(path.resolve(expoDir, 'assets'), path.resolve(baseDir, 'assets'), asset, revert)
  }
}

const cleanEnv = 'clean'
const expoEnv = 'expo'
const nativeEnv = 'native'

const args = process.argv.slice(2)
const env = args[0]

if (env === cleanEnv) {
  copyExpoStuff(true)
  mergePackageJson(null)
  makeRelativeSymlink(null, baseDir, 'package-lock.json', true)
} else if (env === expoEnv) {
  copyExpoStuff()
  mergePackageJson(expoDir)
  linkPackageLock(expoDir)
} else if (env === nativeEnv) {
  mergePackageJson(nativeDir)
  linkPackageLock(nativeDir)
} else {
  throw new Error('Bad argument')
}
