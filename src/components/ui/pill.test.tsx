import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { Pill } from './pill'

describe('Pill', () => {
  it('uses the primary treatment by default', () => {
    const markup = renderToStaticMarkup(<Pill>Primary</Pill>)

    expect(markup).toContain('rounded-full')
    expect(markup).toContain('bg-primary')
    expect(markup).toContain('text-primary-foreground')
  })

  it.each([
    ['secondary', 'bg-secondary'],
    ['outline', 'border-border'],
    ['success', 'bg-emerald-600/15'],
    ['warning', 'bg-amber-500/15'],
  ] as const)('supports the %s variant', (variant, expectedClass) => {
    const markup = renderToStaticMarkup(<Pill variant={variant}>{variant}</Pill>)

    expect(markup).toContain(expectedClass)
  })

  it('optionally includes a dot without changing its fixed size', () => {
    const markup = renderToStaticMarkup(<Pill dot>10</Pill>)

    expect(markup).toContain('gap-1.5')
    expect(markup).toContain('size-1.5 shrink-0 rounded-full bg-current')
    expect(markup).toContain('px-2.5 py-0.5 text-xs')
  })
})
