import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { EncounterFights, type FightRow } from './encounter-fights'

const fight = (key: string, extra: Partial<FightRow> = {}): FightRow => ({
  key,
  onlyIf: undefined,
  opponents: [{ creature: { ref: 'npc', key: 'no-such-guard' }, name: 'Guard', count: 2 }],
  allies: [],
  tactics: undefined,
  creatures: [],
  where: [],
  joined: 0,
  ...extra,
})

const render = (fights: FightRow[], running = true) =>
  renderToStaticMarkup(
    <EncounterFights sceneName="The keep" fights={fights} running={running} onLoad={() => {}} />,
  )

describe('EncounterFights', () => {
  it('lists every fight of the scene, open, and counts the ones that joined', () => {
    const markup = render([fight('The gate', { joined: 1 }), fight('The yard')])
    expect(markup).toContain('<details open')
    expect(markup).toContain('The keep')
    expect(markup).toContain('1 of 2 in')
    expect(markup).toContain('The gate')
    expect(markup).toContain('The yard')
  })

  it('offers a fight that has not joined, with its condition and tactics', () => {
    const markup = render([
      fight('The cells', {
        onlyIf: [['They go down.']],
        tactics: [['They hold the stairs.']],
        allies: [{ creature: { ref: 'npc', key: 'no-such-captive' }, name: 'Captive', count: 3 }],
      }),
    ])
    expect(markup).toContain('Only if')
    expect(markup).toContain('They go down.')
    expect(markup).toContain('They hold the stairs.')
    expect(markup).toContain('with the party')
    expect(markup).toContain('Add to the fight')
    expect(markup).toContain('Replace')
  })

  it('keeps every group open to join again, and counts the groups so far', () => {
    const again = render([fight('The gate', { joined: 2 })])
    expect(again).toContain('2 groups in the fight so far')
    expect(again).toContain('Add to the fight')
    expect(render([fight('The gate', { joined: 1 })])).toContain('1 group in the fight so far')
  })

  it('starts the fight when nobody is fighting', () => {
    const markup = render([fight('The gate')], false)
    expect(markup).toContain('Start the fight')
    expect(markup).not.toContain('Replace')
  })
})
