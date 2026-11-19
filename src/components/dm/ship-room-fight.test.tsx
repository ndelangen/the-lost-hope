import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import type { RoomFight } from '#/lib/ship-rooms'

import { ShipRoomFight } from './ship-room-fight'

const fight = (extra: Partial<RoomFight> = {}): RoomFight => ({
  key: 'The bow',
  opponents: [{ creature: { ref: 'npc', key: 'no-such-guard' }, name: 'Guard', count: 4 }],
  allies: [],
  joined: 0,
  ...extra,
})

const render = (room: RoomFight, layout: 'tile' | 'bar' = 'tile', notes = false, running = false) =>
  renderToStaticMarkup(
    <ShipRoomFight
      fight={room}
      layout={layout}
      running={running}
      onLoad={() => {}}
      onNotes={notes ? () => {} : undefined}
    />,
  )

describe('ShipRoomFight', () => {
  it('names the fight, who is in it, and offers to start it', () => {
    const markup = render(fight())
    expect(markup).toContain('The bow')
    expect(markup).toContain('4 × Guard')
    expect(markup).toContain('Start the fight')
    expect(markup).not.toContain('Notes')
  })

  it('marks allies as fighting with the party', () => {
    const markup = render(
      fight({
        opponents: [],
        allies: [{ creature: { ref: 'npc', key: 'no-such-captive' }, name: 'Captive', count: 2 }],
      }),
    )
    expect(markup).toContain('2 × Captive, with the party')
  })

  it('adds to or replaces a running fight, and counts the groups so far', () => {
    const once = render(fight({ joined: 1 }), 'bar', false, true)
    expect(once).toContain('1 group in the fight so far')
    expect(once).toContain('Add to the fight')
    expect(once).toContain('Replace')
    expect(render(fight({ joined: 3 }), 'bar', false, true)).toContain(
      '3 groups in the fight so far',
    )
  })

  it('links to the notes of its beat where the page has them', () => {
    expect(render(fight(), 'bar', true)).toContain('aria-label="Notes for The bow"')
  })
})
