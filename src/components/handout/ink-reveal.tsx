import { useEffect, useState } from 'react'

import { INK_TIMING, inkDuration, inkFrame } from '#/lib/ink-reveal'
import { cn } from '#/lib/utils'

/** Writes handwritten text onto the page letter by letter, as if the ink were coming back. */
export function InkReveal({ text, className }: { text: string; className?: string }) {
  const duration = inkDuration(text, INK_TIMING)
  // A story reveal: it plays even with reduced motion turned on.
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (elapsed >= duration) return
    const begin = performance.now() - elapsed
    let frame = requestAnimationFrame(function tick(now) {
      const next = now - begin
      setElapsed(Math.min(next, duration))
      if (next < duration) frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
    // The reveal runs once per text; restarting on every frame would reset it.
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  return (
    <p className={cn('whitespace-pre-line', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {inkFrame(text, elapsed).map((glyph, index) => (
          // Letters never reorder, so their position is their identity.
          // oxlint-disable-next-line react/no-array-index-key
          <span key={index} className="ink-glyph" data-state={glyph.state}>
            {glyph.char}
            {glyph.state === 'flickering' ? (
              <span className="ink-glyph-flicker">{glyph.shown}</span>
            ) : null}
          </span>
        ))}
      </span>
    </p>
  )
}
