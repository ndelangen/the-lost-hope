import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'

type PrototypeVariant = {
  key: string
  name: string
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
  onChange,
}: {
  variants: PrototypeVariant[]
  current: string
  onChange: (variant: string) => void
}) {
  const currentIndex = Math.max(
    variants.findIndex((variant) => variant.key === current),
    0,
  )

  function cycle(direction: -1 | 1): void {
    const nextIndex = (currentIndex + direction + variants.length) % variants.length
    onChange(variants[nextIndex].key)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.defaultPrevented || isTypingTarget(event.target)) return
      if (event.key === 'ArrowLeft') cycle(-1)
      if (event.key === 'ArrowRight') cycle(1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  if (import.meta.env.PROD) return null

  const active = variants[currentIndex]

  return (
    <div className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-slate-950 px-2 py-2 text-white shadow-2xl shadow-black/40">
      <button
        type="button"
        onClick={() => cycle(-1)}
        className="grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        aria-label="Previous prototype variant"
      >
        <ArrowLeft className="size-4" />
      </button>
      <p className="min-w-48 text-center text-sm font-semibold">
        {active.key} — {active.name}
      </p>
      <button
        type="button"
        onClick={() => cycle(1)}
        className="grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        aria-label="Next prototype variant"
      >
        <ArrowRight className="size-4" />
      </button>
    </div>
  )
}
