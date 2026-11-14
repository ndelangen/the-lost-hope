import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import type { DerivedStatBlock } from '#/lib/dm-ability-text'

import { AbilityTextView } from './ability-text'

const wolfie: DerivedStatBlock = {
  speed: { walk: 50 },
  abilities: { bite: { key: 'bite', name: 'Bite', summary: '+5, 2d6 + 3 piercing' } },
  saveDc: { str: 13 },
  modifier: { str: 3, dex: 2, con: 2, int: -1, wis: 1, cha: -1 },
  proficiencyBonus: 2,
}

describe('AbilityTextView', () => {
  it('answers references in place', () => {
    const markup = renderToStaticMarkup(
      <AbilityTextView
        block={wolfie}
        text={[
          'After moving ',
          { speed: 'walk', times: 0.5 },
          ', make a ',
          { ability: 'bite' },
          ' attack. On a hit, the target makes a ',
          { dc: 'str' },
          ' Strength save or falls ',
          refs.rules.prone,
          '.',
        ]}
      />,
    )
    expect(markup).toContain('25 ft.')
    expect(markup).toContain('Bite')
    expect(markup).toContain('+5, 2d6 + 3 piercing')
    expect(markup).toContain('DC 13')
    expect(markup).toContain('decoration-dotted')
    expect(markup).not.toContain('its speed')
  })

  it('shows plain tokens as written', () => {
    expect(renderToStaticMarkup(<AbilityTextView block={wolfie} text={['Pack Tactics.']} />)).toBe(
      'Pack Tactics.',
    )
  })
})
