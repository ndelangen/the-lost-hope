/**
 * Fails when original artwork is in git, when the lock and the image registry disagree, or when a
 * locked original is missing from R2 (that is, `media:sync` was not run).
 * CI runs it on every pull request, and `main` requires it.
 */
import { execFileSync } from 'node:child_process'

import {
  LOCK_PATH,
  eachLimited,
  isOriginalRaster,
  objectUrl,
  readLock,
  registeredPaths,
} from './media/originals.ts'

const tracked = execFileSync('git', ['ls-files', '-z', 'assets/images'], { encoding: 'utf8' })
  .split('\0')
  .filter((path) => path && isOriginalRaster(path))

const lock = await readLock()
const registered = new Set(registeredPaths())
const unlocked = [...registered].filter((path) => !lock[path])
const stale = Object.keys(lock).filter((path) => !registered.has(path))

/* Every locked original must really be in R2, so a lock written without a sync cannot merge. */
const notInR2: string[] = []
await eachLimited(Object.keys(lock), async (path) => {
  const { sha256, bytes } = lock[path]
  const response = await fetch(objectUrl(path, sha256), { method: 'HEAD' }).catch(() => undefined)
  if (!response?.ok || Number(response.headers.get('content-length')) !== bytes) notInR2.push(path)
})

const problems = [
  ...notInR2.map((path) => `  ${path} is in ${LOCK_PATH} but not in R2`),
  ...tracked.map((path) => `  ${path} is committed to git`),
  ...unlocked.map((path) => `  ${path} is registered but not uploaded`),
  ...stale.map((path) => `  ${path} is in ${LOCK_PATH} but no longer registered`),
]

if (problems.length > 0) {
  console.error(
    `Original artwork is not in step:\n${problems.join('\n')}\nRun \`bun run media:sync --adopt\` on the Mac, then commit ${LOCK_PATH} and the removals.`,
  )
  process.exit(1)
}
console.log(`media:gate: ${registered.size} originals, all in R2, none in git`)
