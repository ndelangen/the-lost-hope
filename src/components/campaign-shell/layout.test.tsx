import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { CampaignShellLayout } from './layout'

function renderLayout({
  open = false,
  collapsed = false,
  hasNavigation = true,
  focused = false,
} = {}) {
  return renderToStaticMarkup(
    <CampaignShellLayout
      header={<span>Header</span>}
      navigation={<span>Navigation</span>}
      navigationRef={null}
      navigationOpen={open}
      navigationCollapsed={collapsed}
      hasNavigation={hasNavigation}
      focused={focused}
      onDismissNavigation={() => undefined}
    >
      <span>Content</span>
    </CampaignShellLayout>,
  )
}

describe('CampaignShellLayout', () => {
  it('owns the expanded desktop sidebar and content geometry', () => {
    const markup = renderLayout()

    expect(markup).toContain('grid-cols-[auto_minmax(0,1fr)]')
    expect(markup).toContain('w-72 pr-4')
    expect(markup).toContain('py-8 pl-0 lg:pl-8')
    expect(markup).not.toContain('Close navigation')
  })

  it('narrows the sidebar to a rail of icons when collapsed', () => {
    const markup = renderLayout({ collapsed: true })

    expect(markup).toContain('-ml-2 w-16 pr-4')
    expect(markup).not.toContain('w-72 pr-4')
  })

  it('turns the navigation into a modal drawer when open', () => {
    const markup = renderLayout({ open: true, collapsed: true })

    expect(markup).toContain('aria-label="Close navigation"')
    expect(markup).toContain('role="dialog"')
    expect(markup).toContain('aria-modal="true"')
    expect(markup).toContain('fixed inset-y-14 left-0')
    expect(markup).not.toContain('-ml-2 w-16 pr-4')
  })

  it('gives custom pages the full content width when navigation is disabled', () => {
    const markup = renderLayout({ open: true, hasNavigation: false })

    expect(markup).toContain('grid-cols-1')
    expect(markup).not.toContain('<aside')
    expect(markup).not.toContain('Close navigation')
    expect(markup).not.toContain('lg:pl-8')
  })

  it('drops the header, navigation, and width cap in focus mode', () => {
    const markup = renderLayout({ focused: true })

    expect(markup).toContain('Content')
    expect(markup).not.toContain('Header')
    expect(markup).not.toContain('Navigation')
    expect(markup).not.toContain('max-w-7xl')
  })
})
