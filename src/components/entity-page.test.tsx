import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { EntityDetailHeader } from './entity-page'

describe('EntityDetailHeader', () => {
  it('colors only the visual while preserving route-owned header slots', () => {
    const markup = renderToStaticMarkup(
      <EntityDetailHeader
        kind="item"
        title="Flask of Never-Ending Booze"
        visual={{ variant: 'icon', content: <span>Flask icon</span> }}
        context={<span>Header context</span>}
      >
        <span>Header content</span>
      </EntityDetailHeader>,
    )

    expect(markup).toContain('text-fuchsia-600')
    expect(markup).toContain('bg-fuchsia-50/60')
    expect(markup).toContain('border-fuchsia-300/80')
    expect(markup).toContain('size-20')
    expect(markup).toContain('>Item<')
    expect(markup).toContain('Flask icon')
    expect(markup).toContain('Header context')
    expect(markup).toContain('Flask of Never-Ending Booze')
    expect(markup).toContain('Header content')
  })

  it('uses the entity-kind icon when a route does not provide a visual', () => {
    const markup = renderToStaticMarkup(
      <EntityDetailHeader kind="session" title="Escape from ShadowPeak" />,
    )

    expect(markup).toContain('text-blue-600')
    expect(markup).toContain('bg-blue-50/60')
    expect(markup).toContain('border-blue-300/80')
    expect(markup).toContain('>Session<')
    expect(markup).toContain('<svg')
  })

  it('doubles and top-aligns avatar visuals without an entity-colored box', () => {
    const markup = renderToStaticMarkup(
      <EntityDetailHeader
        kind="pc"
        title="Jim"
        visual={{ variant: 'avatar', content: <img src="/jim.jpg" alt="Jim" /> }}
      />,
    )

    expect(markup).toContain('size-40')
    expect(markup).toContain('sm:items-start')
    expect(markup).not.toContain('bg-cyan-50/60')
    expect(markup).not.toContain('border-cyan-300/80')
  })

  it('allows a route to deliberately omit the visual', () => {
    const markup = renderToStaticMarkup(
      <EntityDetailHeader kind="organization" title="Beasts and Dwarf" visual={false} />,
    )

    expect(markup).toContain('Beasts and Dwarf')
    expect(markup).not.toContain('<svg')
  })
})
