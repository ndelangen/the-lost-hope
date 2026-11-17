import { Crosshair, X } from 'lucide-react'
import { type ComponentProps, useEffect } from 'react'

import { PointerSurface } from '#/components/player-screen/pointer-surface'

/**
 * A big copy of the player screen's picture over the DM's window, to point at without looking
 * at the other monitor. Escape or the close button puts it away.
 */
export function PointingView({
  name,
  onClose,
  ...surface
}: Omit<ComponentProps<typeof PointerSurface>, 'markSize' | 'className' | 'style'> & {
  name: string
  onClose: () => void
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [onClose])

  return (
    <section
      aria-label={`Point at ${name} on the player screen`}
      className="fixed inset-0 z-[160] flex flex-col bg-black/90 backdrop-blur-sm"
    >
      <header className="flex items-center gap-3 px-4 py-3 text-white">
        <Crosshair className="size-5 shrink-0 text-amber-300" aria-hidden />
        <p className="min-w-0 flex-1 text-sm">
          <span className="font-semibold">{name}</span>
          <span className="text-white/70">
            {' '}
            · Click to ping a spot. Hold and drag for a laser pointer.
          </span>
        </p>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 items-center gap-2 rounded-lg bg-white/10 px-4 text-sm font-medium ring-1 ring-white/20 hover:bg-white/20"
        >
          <X className="size-4" aria-hidden />
          Done (Esc)
        </button>
      </header>
      <div className="[container-type:size] grid min-h-0 flex-1 place-items-center p-4 pt-0">
        <PointerSurface
          {...surface}
          markSize="5vmin"
          className="rounded-lg shadow-2xl"
          style={{
            width: `min(100cqw, 100cqh * ${surface.width / surface.height})`,
          }}
        />
      </div>
    </section>
  )
}
