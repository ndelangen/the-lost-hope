import { ChevronLeft, ChevronRight, FlaskConical } from 'lucide-react'
import { useCallback, useEffect } from 'react'

import { cn } from '#/lib/utils'

export type PrototypeVariantOption<T extends string> = {
  id: T
  name: string
}

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName))
  )
}

/** PROTOTYPE ONLY: fixed variant switcher for throwaway route-level UI experiments. */
export function PrototypeSwitcher<T extends string>({
  variants,
  current,
  onChange,
}: {
  variants: readonly PrototypeVariantOption<T>[]
  current: T
  onChange: (variant: T) => void
}) {
  const currentIndex = Math.max(
    0,
    variants.findIndex((variant) => variant.id === current),
  )

  const cycle = useCallback(
    (direction: -1 | 1) => {
      const nextIndex = (currentIndex + direction + variants.length) % variants.length
      onChange(variants[nextIndex].id)
    },
    [currentIndex, onChange, variants],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
  }, [cycle])

  if (!import.meta.env.DEV) return null

  const active = variants[currentIndex]

  return (
    <fieldset
      className={cn(
        'fixed right-1/2 bottom-4 z-[120] translate-x-1/2',
        'flex max-w-[calc(100vw-2rem)] items-center gap-1 rounded-full border border-white/15 bg-slate-950 p-1.5 text-white shadow-2xl shadow-black/40',
      )}
      aria-label="Prototype variants"
    >
      <button
        type="button"
        onClick={() => cycle(-1)}
        className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-none"
        aria-label="Previous prototype"
      >
        <ChevronLeft className="size-4" />
      </button>
      <div className="flex min-w-0 items-center gap-2 px-2">
        <FlaskConical className="size-4 shrink-0 text-amber-300" aria-hidden />
        <span className="truncate text-xs font-semibold tracking-wide">
          {currentIndex + 1}/{variants.length} · {active.name}
        </span>
      </div>
      <button
        type="button"
        onClick={() => cycle(1)}
        className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-none"
        aria-label="Next prototype"
      >
        <ChevronRight className="size-4" />
      </button>
    </fieldset>
  )
}
