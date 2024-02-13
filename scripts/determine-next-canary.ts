import { execSync } from 'child_process'
import semver from 'semver'
import { packageName } from './_shared'

const getNextCanary = () => {
  const output = execSync(`npm view ${packageName} versions --json`).toString(
    'utf8'
  )
  let versions = JSON.parse(output) as string[] | string
  if (!Array.isArray(versions)) {
    versions = [versions]
  }

  const lastStableVersion = versions.sort(semver.rcompare)[0]

  // Increment the patch version by default
  const nextCanaryVersion = semver.inc(
    lastStableVersion,
    'prerelease',
    'canary'
  )
  return nextCanaryVersion
}

const nextCanary = getNextCanary()
console.log(nextCanary)
