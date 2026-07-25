// PROTOTYPE ONLY — three detail-page correction interactions, switchable with ?variant=A|B|C.
import { Link } from '@tanstack/react-router'
import {
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  LoaderCircle,
  MessageSquarePlus,
  RotateCcw,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react'
import { useEffect, useId, useState } from 'react'

import { Inline, Stack } from '#/components/ui/layout'
import { cn } from '#/lib/utils'

const VARIANTS = [
  { key: 'A', label: 'Quiet footer' },
  { key: 'B', label: 'Open editorial card' },
  { key: 'C', label: 'Header action + dialog' },
] as const

const STATES = ['idle', 'sending', 'success', 'error', 'revoked'] as const
const PROTOTYPE_CHANGE_EVENT = 'detail-correction-prototype-change'

type VariantKey = (typeof VARIANTS)[number]['key']
type PrototypeState = (typeof STATES)[number]
type Placement = 'after-header' | 'after-content' | 'after-references'

type PrototypeSearch = {
  variant: VariantKey
  state: PrototypeState
}

function isVariantKey(value: string | null): value is VariantKey {
  return VARIANTS.some((variant) => variant.key === value)
}

function isPrototypeState(value: string | null): value is PrototypeState {
  return STATES.some((state) => state === value)
}

function readPrototypeSearch(): PrototypeSearch {
  if (typeof window === 'undefined') return { variant: 'A', state: 'idle' }
  const search = new URLSearchParams(window.location.search)
  const variant = search.get('variant')
  const state = search.get('state')
  return {
    variant: isVariantKey(variant) ? variant : 'A',
    state: isPrototypeState(state) ? state : 'idle',
  }
}

function usePrototypeSearch() {
  const [search, setSearchState] = useState(readPrototypeSearch)

  useEffect(() => {
    const sync = () => setSearchState(readPrototypeSearch())
    window.addEventListener('popstate', sync)
    window.addEventListener(PROTOTYPE_CHANGE_EVENT, sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener(PROTOTYPE_CHANGE_EVENT, sync)
    }
  }, [])

  function setSearch(next: Partial<PrototypeSearch>) {
    const url = new URL(window.location.href)
    if (next.variant) url.searchParams.set('variant', next.variant)
    if (next.state) url.searchParams.set('state', next.state)
    window.history.replaceState(window.history.state, '', url)
    window.dispatchEvent(new Event(PROTOTYPE_CHANGE_EVENT))
  }

  return { ...search, setSearch }
}

export function DetailCorrectionPrototype({
  placement,
  entityLabel,
}: {
  placement: Placement
  entityLabel: string
}) {
  const { variant, state, setSearch } = usePrototypeSearch()

  if (import.meta.env.PROD) return null

  if (variant === 'A' && placement === 'after-references') {
    return <QuietFooter entityLabel={entityLabel} state={state} setState={setSearch} />
  }
  if (variant === 'B' && placement === 'after-content') {
    return <OpenEditorialCard entityLabel={entityLabel} state={state} setState={setSearch} />
  }
  if (variant === 'C' && placement === 'after-header') {
    return <HeaderDialog entityLabel={entityLabel} state={state} setState={setSearch} />
  }
  return null
}

function QuietFooter({ entityLabel, state, setState }: VariantProps & { entityLabel: string }) {
  const [expanded, setExpanded] = useState(state !== 'idle')

  useEffect(() => {
    if (state !== 'idle') setExpanded(true)
  }, [state])

  return (
    <Stack as="section" gap="md" className="border-border border-t pt-6">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
        className="text-muted-foreground hover:text-foreground inline-flex w-fit items-center gap-2 text-sm font-medium"
      >
        <MessageSquarePlus className="size-4" />
        Submit corrections or additions
        <ChevronRight
          className={cn('size-4 transition-transform', expanded && 'rotate-90')}
          aria-hidden
        />
      </button>
      {expanded ? (
        <div className="bg-muted/45 rounded-xl p-4 sm:p-5">
          <CorrectionForm entityLabel={entityLabel} state={state} setState={setState} />
        </div>
      ) : null}
    </Stack>
  )
}

function OpenEditorialCard({
  entityLabel,
  state,
  setState,
}: VariantProps & { entityLabel: string }) {
  return (
    <section className="border-primary/20 bg-primary/5 overflow-hidden rounded-2xl border">
      <div className="grid md:grid-cols-[0.42fr_0.58fr]">
        <Stack gap="md" className="bg-primary text-primary-foreground p-5 sm:p-7">
          <MessageSquarePlus className="size-7" />
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase opacity-70">
              Party knowledge
            </p>
            <h2 className="mt-2 text-xl font-semibold">Notice something missing or wrong?</h2>
            <p className="mt-2 text-sm leading-relaxed opacity-80">
              Add what you remember. The campaign owner reviews every submission before the record
              changes.
            </p>
          </div>
        </Stack>
        <div className="bg-card p-5 sm:p-7">
          <CorrectionForm entityLabel={entityLabel} state={state} setState={setState} />
        </div>
      </div>
    </section>
  )
}

function HeaderDialog({ entityLabel, state, setState }: VariantProps & { entityLabel: string }) {
  const [open, setOpen] = useState(state !== 'idle')

  useEffect(() => {
    if (state !== 'idle') setOpen(true)
  }, [state])

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <>
      <Inline gap="sm" justify="end" className="-mt-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="border-input bg-background hover:bg-muted inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium shadow-sm"
        >
          <MessageSquarePlus className="size-4" />
          Submit corrections or additions
        </button>
      </Inline>
      {open ? (
        <dialog
          open
          aria-labelledby="correction-dialog-title"
          className="fixed inset-0 z-50 m-0 grid size-full max-h-none max-w-none items-end bg-black/45 p-0 sm:items-center sm:p-6"
        >
          <section className="bg-card max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border p-5 shadow-2xl sm:mx-auto sm:max-w-lg sm:rounded-2xl sm:p-7">
            <Inline gap="md" align="start" justify="between">
              <Stack gap="xs">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                  Party knowledge
                </p>
                <h2 id="correction-dialog-title" className="text-xl font-semibold">
                  Correct or add to {entityLabel}
                </h2>
              </Stack>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground grid size-9 shrink-0 place-items-center rounded-lg"
              >
                <X className="size-4" />
              </button>
            </Inline>
            <div className="mt-6">
              <CorrectionForm entityLabel={entityLabel} state={state} setState={setState} />
            </div>
          </section>
        </dialog>
      ) : null}
    </>
  )
}

type VariantProps = {
  state: PrototypeState
  setState: (next: Partial<PrototypeSearch>) => void
}

function CorrectionForm({ entityLabel, state, setState }: VariantProps & { entityLabel: string }) {
  const inputId = useId()
  const [draft, setDraft] = useState('')
  const characterCount = Array.from(draft.trim()).length
  const answerValid = characterCount >= 20 && characterCount <= 16_384

  if (state === 'revoked') {
    return (
      <div role="alert" className="border-destructive/30 bg-destructive/5 rounded-xl border p-4">
        <Inline gap="sm" align="start">
          <CircleAlert className="text-destructive mt-0.5 size-4 shrink-0" />
          <Stack gap="xs">
            <p className="font-medium">The saved access code is no longer accepted.</p>
            <p className="text-muted-foreground text-sm">
              Open the questions page to enter the current shared code.
            </p>
            <Link to="/questions" className="text-primary mt-1 w-fit text-sm font-medium underline">
              Open questions
            </Link>
          </Stack>
        </Inline>
      </div>
    )
  }

  if (state === 'success') {
    return (
      <Stack gap="md">
        <output className="border-primary/25 bg-primary/5 text-primary rounded-xl border p-4 text-sm">
          <ShieldCheck className="mr-2 inline size-4" />
          Thank you! Your note about {entityLabel} was submitted for review. The campaign record has
          not changed yet.
        </output>
        <button
          type="button"
          onClick={() => setState({ state: 'idle' })}
          className="text-primary w-fit text-sm font-medium hover:underline"
        >
          Submit another note
        </button>
      </Stack>
    )
  }

  function submit() {
    if (!answerValid) return
    setState({ state: 'sending' })
    window.setTimeout(() => setState({ state: 'success' }), 700)
  }

  return (
    <Stack gap="sm">
      <label htmlFor={inputId} className="text-sm font-semibold">
        What should be corrected or added?
      </label>
      <p className="text-muted-foreground text-xs">
        Your note will include a snapshot of {entityLabel} for context.
      </p>
      <textarea
        id={inputId}
        value={draft}
        disabled={state === 'sending'}
        placeholder="Tell us what you remember…"
        onChange={(event) => {
          setDraft(event.target.value)
          if (state === 'error') setState({ state: 'idle' })
        }}
        className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/30 min-h-28 w-full resize-y rounded-lg border px-3 py-2 text-sm outline-none focus-visible:ring-2"
      />
      {state === 'error' ? (
        <p role="alert" className="text-destructive flex items-center gap-2 text-sm">
          <CircleAlert className="size-4 shrink-0" />
          Could not send. Your note is still here, so you can try again.
        </p>
      ) : null}
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <p className="text-muted-foreground text-xs">
          Minimum 20 characters · {characterCount.toLocaleString()} / 16,384
        </p>
        <button
          type="button"
          disabled={!answerValid || state === 'sending'}
          onClick={submit}
          className="bg-primary text-primary-foreground inline-flex h-9 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-45"
        >
          {state === 'sending' ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Sending
            </>
          ) : state === 'error' ? (
            <>
              <RotateCcw className="size-4" />
              Try again
            </>
          ) : (
            <>
              <Send className="size-4" />
              Submit for review
            </>
          )}
        </button>
      </div>
    </Stack>
  )
}

export function DetailCorrectionPrototypeSwitcher() {
  const { variant, state, setSearch } = usePrototypeSearch()

  useEffect(() => {
    const cycleFromKeyboard = (event: KeyboardEvent) => {
      const target = event.target
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return
      }
      if (event.key === 'ArrowLeft') cycle(-1)
      if (event.key === 'ArrowRight') cycle(1)
    }
    window.addEventListener('keydown', cycleFromKeyboard)
    return () => window.removeEventListener('keydown', cycleFromKeyboard)
  })

  if (import.meta.env.PROD) return null

  const currentIndex = VARIANTS.findIndex((candidate) => candidate.key === variant)
  const current = VARIANTS[currentIndex]

  function cycle(direction: -1 | 1) {
    const nextIndex = (currentIndex + direction + VARIANTS.length) % VARIANTS.length
    setSearch({ variant: VARIANTS[nextIndex].key, state: 'idle' })
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4">
      <div className="bg-foreground text-background pointer-events-auto max-w-full rounded-2xl p-2 shadow-2xl">
        <Inline gap="xs" justify="center">
          <button
            type="button"
            aria-label="Previous prototype variant"
            onClick={() => cycle(-1)}
            className="hover:bg-background/15 grid size-9 place-items-center rounded-lg"
          >
            <ChevronLeft className="size-4" />
          </button>
          <p className="min-w-48 px-2 text-center text-sm font-semibold">
            {current.key} — {current.label}
          </p>
          <button
            type="button"
            aria-label="Next prototype variant"
            onClick={() => cycle(1)}
            className="hover:bg-background/15 grid size-9 place-items-center rounded-lg"
          >
            <ChevronRight className="size-4" />
          </button>
        </Inline>
        <Inline gap="xs" justify="center" className="border-background/20 mt-1 border-t pt-2">
          <label htmlFor="prototype-state" className="text-xs opacity-70">
            Preview state
          </label>
          <select
            id="prototype-state"
            value={state}
            onChange={(event) => setSearch({ state: event.target.value as PrototypeState })}
            className="bg-background text-foreground rounded-md px-2 py-1 text-xs"
          >
            {STATES.map((candidate) => (
              <option key={candidate} value={candidate}>
                {candidate}
              </option>
            ))}
          </select>
        </Inline>
      </div>
    </div>
  )
}
