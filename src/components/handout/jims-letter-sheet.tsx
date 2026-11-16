import { useEffect, useRef } from 'react'

import { HAND_FONT, HandoutFonts, PRINT_FONT } from '#/components/handout/handout-fonts'
import { InkReveal } from '#/components/handout/ink-reveal'
import { OldPaper } from '#/components/handout/old-paper'
import { SealedScrawl } from '#/components/handout/sealed-scrawl'
import { resolveRef } from '#/lib/campaign'
import { JIMS_LETTER, type LetterSection, type UnsealedLetter } from '#/lib/jims-letter'
import { sealedLength } from '#/lib/sealed-text'
import { cn } from '#/lib/utils'

export function recipientName(section: LetterSection): string {
  return resolveRef(section.recipient)?.data.name.split(' ')[0] ?? section.id
}

/**
 * Jim's letter on aged paper: sealed parts show smudged ink, and opened parts write themselves in.
 * It fills its container and scrolls each newly opened part into view.
 */
export function JimsLetterSheet({
  unsealed,
  className,
}: {
  unsealed: UnsealedLetter
  className?: string
}) {
  const partRefs = useRef<Record<string, HTMLElement | null>>({})
  const shown = useRef<Set<string>>(new Set())

  const openedIds = [
    ...(unsealed.shared ? ['shared'] : []),
    ...JIMS_LETTER.sections.filter((s) => unsealed.sections[s.id]).map((s) => s.id),
  ]
  useEffect(() => {
    const fresh = openedIds.find((id) => !shown.current.has(id))
    shown.current = new Set(openedIds)
    if (fresh) partRefs.current[fresh]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })

  const part = (id: string, label: string, length: number, text: string | undefined) => (
    <section
      key={id}
      ref={(node) => {
        partRefs.current[id] = node
      }}
      className="flex flex-col gap-1 border-t border-[#7a5a32]/30 pt-5"
    >
      <p style={PRINT_FONT} className="text-base italic opacity-75 sm:text-lg">
        {label}
      </p>
      {text ? <InkReveal text={text} /> : <SealedScrawl length={length} />}
    </section>
  )

  return (
    <OldPaper className={cn('px-7 py-12 sm:px-14 sm:py-16', className)}>
      <HandoutFonts />
      <div
        style={HAND_FONT}
        className="flex flex-col gap-6 text-[1.7rem] leading-snug sm:text-[1.95rem]"
      >
        <p style={PRINT_FONT} className="text-lg italic">
          {JIMS_LETTER.header}
        </p>
        {part('shared', JIMS_LETTER.sharedLabel, sealedLength(JIMS_LETTER.shared), unsealed.shared)}
        {JIMS_LETTER.sections.map((section) =>
          part(
            section.id,
            `For ${recipientName(section)}. ${section.clue}`,
            sealedLength(section.sealed),
            unsealed.sections[section.id],
          ),
        )}
      </div>
    </OldPaper>
  )
}
