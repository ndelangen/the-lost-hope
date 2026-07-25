import { ChevronLeft, ChevronRight, FlaskConical } from 'lucide-react'
import { useEffect } from 'react'

import { cn } from '#/lib/utils'

type PrototypeSwitcherProps<Variant extends string> = {
  variants: readonly Variant[]
  current: Variant
  names: Readonly<Record<Variant, string>>
  stateLabel: string
  failNextSubmission: boolean
  onChange: (variant: Variant) => void
  onToggleFailure: () => void
}

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName))
  )
}

export function PrototypeSwitcher<Variant extends string>({
  variants,
  current,
  names,
  stateLabel,
  failNextSubmission,
  onChange,
  onToggleFailure,
}: PrototypeSwitcherProps<Variant>) {
  const currentIndex = variants.indexOf(current)

  function cycle(direction: -1 | 1): void {
    const nextIndex = (currentIndex + direction + variants.length) % variants.length
    onChange(variants[nextIndex])
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (isTypingTarget(event.target)) return
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        cycle(-1)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        cycle(1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  if (!import.meta.env.DEV) return null

  return (
    <aside className="fixed inset-x-3 bottom-3 z-50 mx-auto flex w-fit max-w-[calc(100vw-1.5rem)] flex-wrap items-center justify-center gap-1 rounded-2xl border border-slate-700 bg-slate-950 p-1.5 text-xs text-white shadow-2xl">
      <button
        type="button"
        onClick={() => cycle(-1)}
        className="rounded-xl p-2 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Previous prototype variant"
      >
        <ChevronLeft className="size-4" />
      </button>
      <div className="min-w-36 px-2 text-center">
        <p className="font-semibold">
          {current.toUpperCase()} — {names[current]}
        </p>
        <p className="text-[10px] text-slate-400">{stateLabel}</p>
      </div>
      <button
        type="button"
        onClick={() => cycle(1)}
        className="rounded-xl p-2 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Next prototype variant"
      >
        <ChevronRight className="size-4" />
      </button>
      <button
        type="button"
        onClick={onToggleFailure}
        className={cn(
          'ml-1 inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-2',
          failNextSubmission
            ? 'border-amber-400 bg-amber-400/20 text-amber-100'
            : 'border-slate-700 text-slate-300 hover:bg-white/10',
        )}
      >
        <FlaskConical className="size-3.5" />
        {failNextSubmission ? 'Next send fails' : 'Test failure'}
      </button>
    </aside>
  )
}
