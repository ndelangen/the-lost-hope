import { sealedScrawl } from '#/lib/ink-reveal'
import { cn } from '#/lib/utils'

/** Faded, smudged ink standing in for a passage that has not been unsealed yet. */
export function SealedScrawl({ length, className }: { length: number; className?: string }) {
  return (
    <p className={cn('sealed-scrawl', className)}>
      <span className="sr-only">This passage is still sealed.</span>
      <span aria-hidden="true">{sealedScrawl(length)}</span>
    </p>
  )
}
