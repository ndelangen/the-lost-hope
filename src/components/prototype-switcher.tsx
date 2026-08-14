import { ChevronLeft, ChevronRight, Image, ImageOff } from 'lucide-react'
import { useEffect } from 'react'

import { cn } from '#/lib/utils'

export type PrototypeVariantKey = 'A' | 'B' | 'C'
export type PrototypeIllustrationState = 'illustrated' | 'placeholder'

type PrototypeVariant = {
  key: PrototypeVariantKey
  label: string
}

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName))
  )
}

export function PrototypeSwitcher({
  variants,
  current,
  illustrationState,
  onVariantChange,
  onIllustrationStateChange,
}: {
  variants: readonly PrototypeVariant[]
  current: PrototypeVariantKey
  illustrationState: PrototypeIllustrationState
  onVariantChange: (variant: PrototypeVariantKey) => void
  onIllustrationStateChange: (state: PrototypeIllustrationState) => void
}) {
  const currentIndex = variants.findIndex((variant) => variant.key === current)
  const currentVariant = variants[currentIndex] ?? variants[0]

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (isTypingTarget(event.target) || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return
      event.preventDefault()
      const direction = event.key === 'ArrowLeft' ? -1 : 1
      const nextIndex = (currentIndex + direction + variants.length) % variants.length
      const next = variants[nextIndex]
      if (next) onVariantChange(next.key)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [currentIndex, onVariantChange, variants])

  if (!import.meta.env.DEV || !currentVariant) return null

  function move(direction: -1 | 1) {
    const nextIndex = (currentIndex + direction + variants.length) % variants.length
    const next = variants[nextIndex]
    if (next) onVariantChange(next.key)
  }

  return (
    <div className="fixed right-3 bottom-3 left-3 z-[150] mx-auto flex w-fit max-w-[calc(100vw-1.5rem)] flex-col items-center gap-2 sm:right-auto sm:left-1/2 sm:-translate-x-1/2">
      <fieldset className="flex items-center rounded-full border border-white/15 bg-slate-950/95 p-1 text-white shadow-xl backdrop-blur">
        <legend className="sr-only">Prototype illustration state</legend>
        {(
          [
            ['illustrated', Image, 'Illustrated'],
            ['placeholder', ImageOff, 'Placeholder'],
          ] as const
        ).map(([state, Icon, label]) => (
          <button
            key={state}
            type="button"
            onClick={() => onIllustrationStateChange(state)}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
              illustrationState === state
                ? 'bg-white text-slate-950'
                : 'text-white/65 hover:text-white',
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            {label}
          </button>
        ))}
      </fieldset>

      <div className="flex min-w-72 items-center justify-between gap-3 rounded-full border border-white/15 bg-slate-950/95 p-1.5 text-white shadow-2xl backdrop-blur">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous prototype variant"
          className="grid size-10 shrink-0 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>

        <div className="min-w-0 text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] text-amber-300 uppercase">
            Throwaway prototype
          </p>
          <p className="truncate text-sm font-semibold">
            {currentVariant.key} — {currentVariant.label}
          </p>
        </div>

        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next prototype variant"
          className="grid size-10 shrink-0 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  )
}
