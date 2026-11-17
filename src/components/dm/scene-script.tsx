import { Check, Info, MoveRight, RotateCcw, SkipForward, Undo2 } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { SceneBranches } from '#/components/dm/scene-branches'
import type { SceneLine } from '#/definitions/scene'
import { currentBeat, type BeatStatus, type ScriptBeat } from '#/lib/scene-script'
import { cn } from '#/lib/utils'

import { useSceneScript } from './use-scene-script'

/**
 * A scene's script: its beats top to bottom, each one ticked off as it is played or skipped, so
 * the DM always sees where the scene is and what comes next.
 */
export function SceneScript({ sceneKey, script }: { sceneKey: string; script: ScriptBeat[] }) {
  const { progress, mark, startOver } = useSceneScript(sceneKey, script.length)
  const current = currentBeat(script, progress)
  const played = script.length - script.filter((beat) => progress[beat.number] === undefined).length
  const list = useRef<HTMLOListElement>(null)
  const follow = useRef(false)

  // After a beat is ticked off, bring the next one to the top. Not on load or reopening.
  useEffect(() => {
    if (!follow.current) return
    follow.current = false
    list.current
      ?.querySelector('[data-current="true"]')
      ?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, [current])

  const finish = (beat: number, status: BeatStatus) => {
    follow.current = true
    mark(beat, status)
  }

  return (
    <section className="grid gap-3">
      <div className="flex flex-wrap items-center justify-between gap-x-4">
        <h2 className="text-muted-foreground text-xs font-semibold uppercase">
          Script · {played} of {script.length} beats played
        </h2>
        <button
          type="button"
          onClick={startOver}
          disabled={played === 0}
          className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-12 items-center gap-2 rounded-lg px-3 text-sm font-medium disabled:pointer-events-none disabled:opacity-40"
        >
          <RotateCcw className="size-4" aria-hidden /> Start over
        </button>
      </div>
      <ol ref={list} className="grid gap-3">
        {script.map((beat) => {
          const status = progress[beat.number]
          return (
            <li key={beat.number} data-current={beat.number === current} className="scroll-mt-20">
              {status ? (
                <PlayedBeat
                  beat={beat}
                  status={status}
                  onReopen={() => mark(beat.number, undefined)}
                />
              ) : (
                <OpenBeat
                  beat={beat}
                  current={beat.number === current}
                  onDone={() => finish(beat.number, 'done')}
                  onSkip={() => finish(beat.number, 'skipped')}
                />
              )}
            </li>
          )
        })}
      </ol>
      {current === undefined ? (
        <p className="text-muted-foreground text-sm">That was the last beat of this scene.</p>
      ) : null}
    </section>
  )
}

function BeatNumber({ children, tone }: { children: React.ReactNode; tone: 'current' | 'quiet' }) {
  return (
    <span
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold [&_svg]:size-4',
        tone === 'current'
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground',
      )}
    >
      {children}
    </span>
  )
}

function OpenBeat({
  beat,
  current,
  onDone,
  onSkip,
}: {
  beat: ScriptBeat
  current: boolean
  onDone: () => void
  onSkip: () => void
}) {
  return (
    <article
      className={cn(
        'bg-card grid gap-4 rounded-xl border p-4',
        current ? 'border-primary ring-primary/30 ring-2' : 'border-border',
      )}
    >
      <header className="grid gap-2">
        <div className="flex items-center gap-3">
          <BeatNumber tone={current ? 'current' : 'quiet'}>{beat.number}</BeatNumber>
          <h3 className="min-w-0 flex-1 text-lg leading-tight font-semibold">{beat.title}</h3>
        </div>
        {beat.onlyIf ? (
          <div className="flex items-baseline gap-2 rounded-lg bg-amber-500/15 px-3 py-2 text-amber-900 dark:text-amber-100">
            <span className="shrink-0 text-xs font-bold uppercase">Only if</span>
            <ContentRenderer content={beat.onlyIf} />
          </div>
        ) : null}
      </header>

      <ul className="grid gap-4">
        {beat.lines.map((line, index) => (
          // oxlint-disable-next-line react/no-array-index-key -- a beat's lines have no ids and never reorder
          <li key={index}>
            <ScriptLine line={line} />
          </li>
        ))}
      </ul>

      {beat.branches.length > 0 ? (
        <div className="grid gap-2">
          <p className="text-muted-foreground text-xs font-semibold uppercase">If…</p>
          <SceneBranches branches={beat.branches} />
        </div>
      ) : null}

      <footer className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onDone}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-12 items-center gap-2 rounded-xl px-5 text-base font-semibold"
        >
          <Check className="size-5" aria-hidden /> Done
        </button>
        {beat.onlyIf ? (
          <button
            type="button"
            onClick={onSkip}
            className="border-border hover:bg-muted flex h-12 items-center gap-2 rounded-xl border px-5 text-base font-semibold"
          >
            <SkipForward className="size-5" aria-hidden /> Skip
          </button>
        ) : null}
      </footer>
    </article>
  )
}

function PlayedBeat({
  beat,
  status,
  onReopen,
}: {
  beat: ScriptBeat
  status: BeatStatus
  onReopen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onReopen}
      className="bg-muted/50 hover:bg-muted text-muted-foreground flex min-h-12 w-full items-center gap-3 rounded-xl px-4 py-2 text-left"
    >
      <BeatNumber tone="quiet">
        {status === 'done' ? <Check aria-hidden /> : <SkipForward aria-hidden />}
      </BeatNumber>
      <span className="min-w-0 flex-1 font-medium">
        {beat.number}. {beat.title}
        {status === 'skipped' ? <span className="font-normal"> · skipped</span> : null}
      </span>
      <span className="flex shrink-0 items-center gap-1.5 text-sm">
        <Undo2 className="size-4" aria-hidden /> Reopen
      </span>
    </button>
  )
}

/** One line of a beat: words to say out loud stand out, things to do read plainly, notes sit back. */
function ScriptLine({ line }: { line: SceneLine }) {
  if ('say' in line) {
    return (
      <figure
        className={cn(
          'grid gap-1.5 border-l-4 py-1 pl-4',
          line.speaker ? 'border-primary' : 'border-amber-500',
        )}
      >
        <figcaption className="text-muted-foreground flex items-center gap-2 text-xs font-semibold uppercase">
          {line.speaker ? (
            <ContentRenderer content={[[line.speaker, ' says']]} className="text-xs" />
          ) : (
            'You say, to the players'
          )}
        </figcaption>
        <blockquote>
          <ContentRenderer content={line.say} className="text-lg leading-snug font-medium" />
        </blockquote>
      </figure>
    )
  }
  if ('do' in line) {
    return (
      <div className="flex gap-3">
        <MoveRight className="text-primary mt-1 size-5 shrink-0" aria-label="Do" />
        <ContentRenderer content={line.do} className="text-base" />
      </div>
    )
  }
  return (
    <div className="text-muted-foreground flex gap-3">
      <Info className="mt-0.5 size-5 shrink-0" aria-label="Keep in mind" />
      <ContentRenderer content={line.note} />
    </div>
  )
}
