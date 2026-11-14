import { describe, expect, it } from 'vitest'

import { StatBlock } from './stat-block'

const scores = { str: 16, dex: 14, con: 14, int: 8, wis: 12, cha: 8 }
const bite = {
  key: 'bite',
  name: 'Bite',
  timing: 'action',
  icon: 'gi/GiFangs',
  attack: {
    kind: 'melee',
    ability: 'str',
    damage: [{ dice: '1d10', type: 'piercing', addModifier: true }],
  },
}
const base = {
  size: 'Medium',
  type: 'monstrosity',
  cr: '2',
  ac: 14,
  hitDice: '6d8',
  speed: { walk: 50 },
  scores,
  source: { adaptedFrom: ['srd-2024_dire-wolf'] },
}

function block(text: unknown[], extra: Record<string, unknown> = {}) {
  return StatBlock.safeParse({
    ...base,
    abilities: [bite, { key: 'pounce', name: 'Pounce', timing: 'action', icon: 'gi/GiPaw', text }],
    ...extra,
  })
}

describe('stat block ability text', () => {
  it('accepts references to sibling abilities, speeds, DCs, and rules terms', () => {
    const parsed = block([
      'Move ',
      { speed: 'walk', times: 0.4 },
      ', make a ',
      { ability: 'bite' },
      ' attack; ',
      { dc: 'str' },
      ' or ',
      { condition: 'prone' },
      ', then ',
      { action: 'disengage' },
    ])
    expect(parsed.success).toBe(true)
  })

  it('rejects a reference to a missing ability', () => {
    expect(block([{ ability: 'claw' }]).error?.issues[0]?.message).toMatch(/missing ability: claw/)
  })

  it('rejects duplicate keys', () => {
    const parsed = StatBlock.safeParse({ ...base, abilities: [bite, bite] })
    expect(parsed.error?.issues[0]?.message).toMatch(/Duplicate ability key: bite/)
  })

  it('needs the referenced speed', () => {
    expect(block([{ speed: 'fly' }]).success).toBe(false)
  })

  it('rejects unknown conditions', () => {
    expect(block([{ condition: 'sleepy' }]).success).toBe(false)
  })
})

describe('stat block facts', () => {
  it('requires the core statistics and a source', () => {
    expect(block([], { hitDice: undefined }).success).toBe(false)
    expect(block([], { source: undefined }).success).toBe(false)
    expect(block([], { cr: '1/3' }).success).toBe(false)
  })

  it('needs changes to describe a homebrew block', () => {
    expect(block([], { source: { adaptedFrom: [] } }).success).toBe(false)
    expect(block([], { source: { adaptedFrom: [], changes: 'Invented.' } }).success).toBe(true)
  })

  it('rejects non-SRD source keys and unknown damage types', () => {
    expect(block([], { source: { adaptedFrom: ['dire wolf'] } }).success).toBe(false)
    expect(block([], { damageImmunities: ['sadness'] }).success).toBe(false)
  })
})
