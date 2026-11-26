import { useEffect, useState } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { HoverPreview } from '#/components/ui/hover-preview'
import type { EntityRef } from '#/definitions/kind'
import type { Spell } from '#/definitions/library'

/** A spell's name before its text has loaded: the key, title-cased. */
function provisionalName(key: string) {
  return key.replace(/_/gu, ' ').replace(/\b\w/gu, (letter) => letter.toUpperCase())
}

/**
 * A spell named in rules text: hover, focus, or tap shows the full spell. Spell text loads on
 * first use, so pages that never show a spell don't carry the spell list.
 */
export function SpellTerm({ spell: ref }: { spell: EntityRef<'spell'> }) {
  const [loaded, setLoaded] = useState<{ spell: Spell; label: string } | undefined>()
  useEffect(() => {
    let live = true
    void import('#/lib/library-spells').then(({ spellOf, spellLevelLabel }) => {
      const spell = spellOf(ref)
      if (live) setLoaded({ spell, label: spellLevelLabel(spell) })
    })
    return () => {
      live = false
    }
  }, [ref])
  const name = loaded?.spell.name ?? provisionalName(ref.key)
  return (
    <HoverPreview
      interactive
      content={
        loaded ? (
          <span className="grid max-w-md gap-1.5 py-0.5 text-sm leading-snug font-normal">
            <span className="flex items-baseline justify-between gap-3">
              <strong className="text-base">{loaded.spell.name}</strong>
              <span className="text-muted-foreground text-xs">{loaded.label}</span>
            </span>
            <span className="text-muted-foreground text-xs">
              {loaded.spell.castingTime} · {loaded.spell.range} · {loaded.spell.components} ·{' '}
              {loaded.spell.duration}
            </span>
            <ContentRenderer content={loaded.spell.text} />
          </span>
        ) : (
          name
        )
      }
    >
      <button
        type="button"
        className="focus-visible:ring-ring/50 decoration-muted-foreground/70 cursor-help rounded-sm italic underline decoration-dotted underline-offset-4 outline-none focus-visible:ring-3"
      >
        {name}
      </button>
    </HoverPreview>
  )
}
