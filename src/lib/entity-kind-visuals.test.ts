import { describe, expect, it } from 'vitest'

import { ENTITY_KINDS, type EntityKind } from '#/definitions/kind'

import {
  ENTITY_KIND_VISUALS,
  type EntityKindColor,
  type EntityKindVisual,
} from './entity-kind-visuals'

const EXPECTED_ENTITY_COLORS = {
  beast: 'orange',
  pc: 'cyan',
  npc: 'violet',
  location: 'emerald',
  event: 'amber',
  session: 'blue',
  quest: 'rose',
  organization: 'teal',
} as const satisfies Record<EntityKind, EntityKindColor>

const COLOR_CLASS_PROPERTIES = [
  'accentClassName',
  'badgeClassName',
  'borderClassName',
  'surfaceClassName',
  'ringClassName',
  'hoverClassName',
] as const satisfies readonly (keyof EntityKindVisual)[]

describe('ENTITY_KIND_VISUALS', () => {
  it('codifies one exhaustive color association for every entity kind', () => {
    expect(Object.keys(ENTITY_KIND_VISUALS).toSorted()).toEqual([...ENTITY_KINDS].toSorted())

    for (const kind of ENTITY_KINDS) {
      expect(ENTITY_KIND_VISUALS[kind].color).toBe(EXPECTED_ENTITY_COLORS[kind])
    }
  })

  it('keeps every semantic color role on its entity palette', () => {
    for (const kind of ENTITY_KINDS) {
      const visual = ENTITY_KIND_VISUALS[kind]
      for (const property of COLOR_CLASS_PROPERTIES) {
        expect(visual[property]).toContain(visual.color)
      }
    }
  })
})
