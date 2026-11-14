import { describe, expect, it } from 'vitest'

import effectRecords from '#/data/effects/_index'
import { refs } from '#/data/generated/refs'
import { effectsOn, pcs, resolveRef } from '#/lib/campaign'
import { collectReferences } from '#/lib/campaign-read-model'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { EFFECT_ICONS } from '#/lib/effect-icons'

const sourceEvents = Object.values(SOURCE_REGISTRIES.event)

describe('effects', () => {
  it('registers every effect icon', () => {
    for (const effect of Object.values(effectRecords))
      expect(effect.icon in EFFECT_ICONS).toBe(true)
  })

  it('ends an effect no earlier than it began', () => {
    const day = (key: string) =>
      SOURCE_REGISTRIES.event[key as keyof typeof SOURCE_REGISTRIES.event].day
    const endedTooEarly = Object.values(effectRecords).filter(
      (effect) => effect.ended && day(effect.ended.key) < day(effect.began.key),
    )
    expect(endedTooEarly.map((effect) => effect.name)).toEqual([])
  })

  it('is introduced by an event that references it', () => {
    const unreferenced = Object.entries(effectRecords)
      .filter(
        ([key]) =>
          !sourceEvents.some((event) =>
            collectReferences(event).some((ref) => ref.ref === 'effect' && ref.key === key),
          ),
      )
      .map(([, effect]) => effect.name)
    expect(unreferenced).toEqual([])
  })

  it('derives Jim’s active and lifted effects from their events', () => {
    const jim = effectsOn('pc', pcs.jim.slug)
    const statuses = Object.fromEntries(jim.map((entry) => [entry.effect.slug, entry.status]))

    expect(statuses).toMatchObject({
      vessel: 'active',
      whispers: 'active',
      storm: 'ended',
      cage: 'ended',
      'excruciating-pain': 'ended',
    })
    expect(jim[0]?.status).toBe('active')
    expect(resolveRef(refs.effects.storm)?.kind).toBe('effect')
  })
})
