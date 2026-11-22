/**
 * Fails when original artwork is in git, or when the lock and the image registry disagree.
 * CI runs it on every pull request, and `main` requires it.
 */
import { execFileSync } from 'node:child_process'

import { LOCK_PATH, isOriginalRaster, readLock, registeredPaths } from './media/originals.ts'

const tracked = execFileSync('git', ['ls-files', '-z', 'assets/images'], { encoding: 'utf8' })
  .split('\0')
  .filter((path) => path && isOriginalRaster(path))

const lock = await readLock()
const registered = new Set(registeredPaths())
const unlocked = [...registered].filter((path) => !lock[path])
const stale = Object.keys(lock).filter((path) => !registered.has(path))

const problems = [
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
console.log(`media:gate: ${registered.size} originals, all uploaded, none in git`)
