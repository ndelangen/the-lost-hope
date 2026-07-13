import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { resolveTheme } from './theme'
import { ThemeToggle } from './theme-toggle'

describe('resolveTheme', () => {
  it('prefers a valid stored theme over the system preference', () => {
    expect(resolveTheme('dark', false)).toBe('dark')
    expect(resolveTheme('light', true)).toBe('light')
  })

  it('falls back to the system preference when storage has no valid theme', () => {
    expect(resolveTheme(null, true)).toBe('dark')
    expect(resolveTheme('unexpected', false)).toBe('light')
  })
})

describe('ThemeToggle', () => {
  it('offers dark mode when the light theme is active', () => {
    const markup = renderToStaticMarkup(<ThemeToggle theme="light" onToggle={() => undefined} />)

    expect(markup).toContain('aria-label="Switch to dark mode"')
    expect(markup).toContain('lucide-moon')
  })

  it('offers light mode when the dark theme is active', () => {
    const markup = renderToStaticMarkup(<ThemeToggle theme="dark" onToggle={() => undefined} />)

    expect(markup).toContain('aria-label="Switch to light mode"')
    expect(markup).toContain('lucide-sun')
  })
})
