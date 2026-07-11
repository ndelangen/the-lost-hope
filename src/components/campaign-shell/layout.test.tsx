import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { CampaignShellLayout } from './layout'

function renderLayout({ open = false, collapsed = false } = {}) {
  return renderToStaticMarkup(
    <CampaignShellLayout
      header={<span>Header</span>}
      navigation={<span>Navigation</span>}
      navigationRef={null}
      navigationOpen={open}
      navigationCollapsed={collapsed}
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

  it('turns the navigation into a modal drawer when open', () => {
    const markup = renderLayout({ open: true, collapsed: true })

    expect(markup).toContain('aria-label="Close navigation"')
    expect(markup).toContain('role="dialog"')
    expect(markup).toContain('aria-modal="true"')
    expect(markup).toContain('fixed inset-y-14 left-0')
    expect(markup).not.toContain('w-14 pr-1')
  })
})
