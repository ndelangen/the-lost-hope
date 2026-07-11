import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { Grid, Inset, SwitchLayout } from './layout'

describe('layout primitives', () => {
  it('keeps column and row alignment explicit in SwitchLayout', () => {
    const markup = renderToStaticMarkup(
      <SwitchLayout rowAlign="center" rowJustify="between">
        <span>First</span>
        <span>Second</span>
      </SwitchLayout>,
    )

    expect(markup).toContain('items-start')
    expect(markup).toContain('justify-start')
    expect(markup).toContain('sm:items-center')
    expect(markup).toContain('sm:justify-between')
  })

  it('owns custom and responsive grid tracks', () => {
    const markup = renderToStaticMarkup(
      <Grid template="auto-content" smTemplate="label-content" align="start" smAlign="center">
        <span>Label</span>
        <span>Content</span>
      </Grid>,
    )

    expect(markup).toContain('grid-cols-[auto_minmax(0,1fr)]')
    expect(markup).toContain('sm:grid-cols-[9rem_minmax(0,1fr)]')
    expect(markup).toContain('items-start')
    expect(markup).toContain('sm:items-center')
  })

  it('applies axis-specific inset spacing', () => {
    const markup = renderToStaticMarkup(
      <Inset as="h3" block="sm">
        Campaign day 1
      </Inset>,
    )

    expect(markup).toContain('py-2')
    expect(markup).not.toContain('px-')
  })
})
