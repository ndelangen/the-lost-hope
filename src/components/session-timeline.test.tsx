import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

vi.mock('#/lib/event-icons', () => ({
  DAY_MARK_ICON: 'custom/LongRest',
  EventMarkIcon({ name, className }: { name: string; className?: string }) {
    return <span className={className} data-event-icon={name} />
  },
}))

import { SessionTimeline } from './session-timeline'

describe('SessionTimeline', () => {
  it('uses the shared day marker independently of event marks', () => {
    const markup = renderToStaticMarkup(<SessionTimeline days={[{ day: 2, events: [] }]} />)

    expect(markup).toContain('data-event-icon="custom/LongRest"')
    expect(markup).toContain('<span>day 2</span>')
  })
})
