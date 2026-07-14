import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { EntityKindPill } from './entity-kind-pill'

describe('EntityKindPill', () => {
  it('uses the shared entity color for both its marker and surface', () => {
    const markup = renderToStaticMarkup(<EntityKindPill kind="session">6</EntityKindPill>)

    expect(markup).toContain('bg-blue-100')
    expect(markup).toContain('text-blue-700')
    expect(markup).toContain('size-1.5 shrink-0 rounded-full bg-current')
    expect(markup).toContain('>6<')
  })

  it('can omit the marker when semantic content supplies its own icon', () => {
    const markup = renderToStaticMarkup(
      <EntityKindPill kind="event" dot={false}>
        day 2
      </EntityKindPill>,
    )

    expect(markup).toContain('bg-amber-100')
    expect(markup).not.toContain('size-1.5 shrink-0 rounded-full bg-current')
    expect(markup).toContain('day 2')
  })
})
