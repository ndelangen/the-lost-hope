/**
 * Lists what the novel still needs from image generation: missing panels, pictures to regenerate,
 * and pictures to extend to their panel's shape. See docs/novel.md for the art workflow.
 *
 *   bun run novel:art                  every task, one per line
 *   bun run novel:art -- --chapter 1   only chapter 1
 *   bun run novel:art -- --page 12     only page 12
 *   bun run novel:art -- --json        machine-readable, with the same filters
 */
import { novelArtWork, novelUnplacedEvents } from '#/lib/novel-data'

const option = (name: string) => {
  const index = process.argv.indexOf(`--${name}`)
  return index === -1 ? undefined : Number(process.argv[index + 1])
}
const chapter = option('chapter')
const page = option('page')

const tasks = novelArtWork().filter(
  (task) =>
    (chapter === undefined || task.chapter === chapter) &&
    (page === undefined || task.page === page),
)
const unplaced = novelUnplacedEvents()

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ tasks, unplaced }, null, 2))
} else {
  for (const task of tasks) {
    const size = `${task.size.width}x${task.size.height}`
    const detail = [task.note, task.current].filter(Boolean).join(' · ')
    console.log(
      `ch${task.chapter} p${task.page}\t${task.status}\t${task.shape} ${size}\t${task.eventKey}\t${task.eventName}${detail ? `\t${detail}` : ''}`,
    )
  }
  const count = (status: string) => tasks.filter((task) => task.status === status).length
  console.log(
    `\n${count('missing')} missing, ${count('regenerate')} to regenerate, ${count('extend')} to extend`,
  )
  if (unplaced.length)
    console.log(
      `${unplaced.length} played events have no panel yet:\n${unplaced.map((entry) => `  ${entry.session}: ${entry.event}`).join('\n')}`,
    )
}
