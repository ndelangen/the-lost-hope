import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { EntityKindBadge } from './entity-kind-badge'

describe('EntityKindBadge', () => {
  it('uses the shared entity color for both its marker and surface', () => {
    const markup = renderToStaticMarkup(<EntityKindBadge kind="session">6</EntityKindBadge>)

    expect(markup).toContain('bg-blue-100')
    expect(markup).toContain('text-blue-700')
    expect(markup).toContain('text-blue-600')
    expect(markup).toContain('rounded-full bg-current')
    expect(markup).toContain('>6<')
  })
})
