import { ImageIcon, LoaderCircle, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'

type Job =
  | { state: 'idle' }
  | { state: 'running'; startedAt: number }
  | { state: 'done' }
  | { state: 'failed'; error: string }

const buttonClass =
  'border-border hover:bg-muted inline-flex min-h-12 items-center gap-2 rounded-lg border px-4 text-base font-semibold disabled:opacity-50'

/**
 * Local dev only: the background portrait job for a saved NPC. The NPC stays usable with its
 * current portrait while this runs, and the DM can retry a failed or unwanted portrait.
 */
export function NpcPortraitStatus({ npcKey }: { npcKey: string }) {
  const [job, setJob] = useState<Job>({ state: 'idle' })
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string>()

  useEffect(() => {
    let stopped = false
    let timer: ReturnType<typeof setTimeout> | undefined
    const poll = async () => {
      try {
        const response = await fetch(`/__dm/npc/portrait?key=${encodeURIComponent(npcKey)}`)
        const next = (await response.json()) as Job
        if (stopped) return
        setJob(next)
        if (next.state === 'running') timer = setTimeout(poll, 3000)
      } catch {
        // The dev server restarted or is reloading; the next render polls again.
      }
    }
    void poll()
    return () => {
      stopped = true
      clearTimeout(timer)
    }
  }, [npcKey, job.state])

  const retry = async () => {
    setError(undefined)
    const response = await fetch('/__dm/npc/portrait', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ key: npcKey, description }),
    })
    const body = (await response.json()) as Job & { error?: string }
    if (!response.ok) setError(body.error ?? 'Could not start the portrait')
    else setJob(body)
  }

  return (
    <section
      aria-label="Portrait"
      className="border-border grid gap-2 rounded-lg border border-dashed p-3 text-sm"
    >
      {job.state === 'running' ? (
        <p className="flex items-center gap-2">
          <LoaderCircle aria-hidden className="size-5 animate-spin" />
          Codex is painting the portrait. Keep using the NPC; it appears here when ready.
        </p>
      ) : job.state === 'done' ? (
        <p className="flex items-center gap-2">
          <ImageIcon aria-hidden className="size-5" /> Portrait ready and registered.
        </p>
      ) : job.state === 'failed' ? (
        <p className="text-red-700 dark:text-red-400">The portrait failed: {job.error}</p>
      ) : (
        <p className="text-muted-foreground">No portrait job in this dev session.</p>
      )}
      {job.state !== 'running' ? (
        <div className="flex flex-wrap items-end gap-2">
          <label className="grid min-w-0 flex-1 gap-1">
            <span className="text-muted-foreground text-xs">How should the portrait look?</span>
            <input
              className="border-border bg-background min-h-12 rounded-lg border px-3"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <button
            type="button"
            className={buttonClass}
            disabled={!description.trim()}
            onClick={() => void retry()}
          >
            <RotateCcw aria-hidden className="size-5" />
            {job.state === 'idle' ? 'Paint portrait' : 'Paint again'}
          </button>
        </div>
      ) : null}
      {error ? <p className="text-red-700 dark:text-red-400">{error}</p> : null}
    </section>
  )
}
