import { describe, expect, it } from 'vitest'

import { playerTurnOrder, type TurnOrderInput } from './player-turn-order'

const row = (id: string, extra: Partial<TurnOrderInput> = {}): TurnOrderInput => ({
  id,
  side: 'enemy',
  name: id,
  met: false,
  out: false,
  ...extra,
})

describe('playerTurnOrder', () => {
  it('names the party and met enemies, numbers the rest, and marks the current turn', () => {
    const rows = playerTurnOrder(
      [
        row('devan', { side: 'party', name: 'Devan', avatar: '/devan.png' }),
        row('snatcher 1', { avatar: '/s.png' }),
        row('ilsa', { name: 'Ilsa Corrow', met: true, avatar: '/i.png' }),
        row('snatcher 2', { hp: 16, maxHp: 32 }),
      ],
      'snatcher 1',
    )
    expect(rows.map(({ label }) => label)).toEqual(['Devan', 'Enemy 1', 'Ilsa Corrow', 'Enemy 2'])
    expect(rows[1]).toMatchObject({ current: true, avatar: undefined })
    expect(rows[2]?.avatar).toBe('/i.png')
    expect(rows.map(({ bloodied }) => bloodied)).toEqual([false, false, false, true])
  })

  it('drops enemies out of the fight, keeping the numbers of the rest, and keeps a downed PC', () => {
    const rows = playerTurnOrder(
      [
        row('devan', { side: 'party', name: 'Devan', out: true }),
        row('gone', { out: true }),
        row('left'),
      ],
      undefined,
    )
    expect(rows.map(({ id, label }) => [id, label])).toEqual([
      ['devan', 'Devan'],
      ['left', 'Enemy 2'],
    ])
  })
})
