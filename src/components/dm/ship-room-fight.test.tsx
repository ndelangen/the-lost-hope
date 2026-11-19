import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import type { RoomFight } from '#/lib/ship-rooms'

import { ShipRoomFight } from './ship-room-fight'

const fight = (extra: Partial<RoomFight> = {}): RoomFight => ({
  key: 'The bow',
  opponents: [{ creature: { ref: 'npc', key: 'no-such-guard' }, name: 'Guard', count: 4 }],
  allies: [],
  repeats: false,
  joined: 0,
  ...extra,
})

const render = (room: RoomFight, layout: 'tile' | 'bar' = 'tile', notes = false) =>
  renderToStaticMarkup(
    <ShipRoomFight
      fight={room}
      layout={layout}
      onRun={() => {}}
      onNotes={notes ? () => {} : undefined}
    />,
  )

describe('ShipRoomFight', () => {
  it('names the fight, who is in it, and offers to run it', () => {
    const markup = render(fight())
    expect(markup).toContain('The bow')
    expect(markup).toContain('4 × Guard')
    expect(markup).toContain('Run the encounter here')
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

  it('shows a fight that has joined as in the fight, with nothing left to run', () => {
    const markup = render(fight({ joined: 1 }))
    expect(markup).toContain('In the fight')
    expect(markup).not.toContain('Run the encounter here')
  })

  it('offers another group of a fight that repeats, and counts the groups so far', () => {
    const once = render(fight({ repeats: true, joined: 1 }), 'bar')
    expect(once).toContain('1 group in the fight so far')
    expect(once).toContain('Bring in another group')
    expect(render(fight({ repeats: true, joined: 3 }), 'bar')).toContain(
      '3 groups in the fight so far',
    )
  })

  it('links to the notes of its beat where the page has them', () => {
    expect(render(fight(), 'bar', true)).toContain('aria-label="Notes for The bow"')
  })
})
