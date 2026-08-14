import { useEffect } from 'react'

import { cn } from '#/lib/utils'

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName))
  )
}

export function PrototypeSwitcher<const Variant extends string>({
  variants,
  current,
  labels,
  onChange,
}: {
  variants: readonly Variant[]
  current: Variant
  labels: Record<Variant, string>
  onChange: (variant: Variant) => void
}) {
  const currentIndex = variants.indexOf(current)
  const cycle = (direction: -1 | 1) => {
    const nextIndex = (currentIndex + direction + variants.length) % variants.length
    onChange(variants[nextIndex])
  }

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
  })

  if (import.meta.env.PROD) return null

  return (
    <div
      className={cn(
        'fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full',
        'bg-foreground text-background border-background/20 border px-2 py-2 shadow-2xl',
      )}
      aria-label="Prototype variants"
    >
      <button
        type="button"
        onClick={() => cycle(-1)}
        className="hover:bg-background/15 rounded-full px-3 py-1 text-lg leading-none"
        aria-label="Previous prototype variant"
      >
        ←
      </button>
      <p className="min-w-48 text-center text-xs font-semibold tracking-wide">
        {current} — {labels[current]}
      </p>
      <button
        type="button"
        onClick={() => cycle(1)}
        className="hover:bg-background/15 rounded-full px-3 py-1 text-lg leading-none"
        aria-label="Next prototype variant"
      >
        →
      </button>
    </div>
  )
}
