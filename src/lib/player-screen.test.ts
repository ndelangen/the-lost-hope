import { describe, expect, it } from 'vitest'

import { PLAYER_VISIBLE_KEYS, SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { scenes } from '#/lib/dm-campaign'

import {
  filterPlayerScreenOptions,
  playerScreenOptions,
  playerScreenOptionsForPage,
  resolvePlayerScreenImage,
} from './player-screen'
import { EMPTY_PLAYER_SCREEN, parsePlayerScreenState } from './player-screen-state'

const options = playerScreenOptions()
const npcOptions = options.filter((option) => option.selection.ref.ref === 'npc')

describe('player screen', () => {
  it('names only records the party has met', () => {
    const met = npcOptions.find((option) => option.met)
    const unmet = npcOptions.find((option) => !option.met)
    expect(met?.playerCaption).toBe(met?.name)
    expect(unmet).toBeDefined()
    expect(unmet?.playerCaption).toBeUndefined()
    expect(PLAYER_VISIBLE_KEYS.npc.has(unmet!.selection.ref.key)).toBe(false)
  })

  it('never names a scene on the player screen', () => {
    const scene = options.find((option) => option.group === 'Scenes')
    expect(scene).toBeDefined()
    expect(scene?.playerCaption).toBeUndefined()
  })

  it('offers only real artwork, never placeholders or missing files', () => {
    for (const option of options) {
      expect(option.src).not.toContain('placeholder')
      expect(option.src).not.toContain('placehold.co')
    }
    expect(
      resolvePlayerScreenImage({ image: 'avatar', ref: { ref: 'npc', key: 'no_such_npc' } }),
    ).toBeUndefined()
  })

  it('offers every portrait that has art', () => {
    const withArt = Object.values(SOURCE_REGISTRIES.npc).filter(
      (npc) => !npc.avatar.includes('placeholder'),
    )
    expect(npcOptions.length).toBeGreaterThan(0)
    expect(npcOptions.length).toBeLessThanOrEqual(withArt.length)
  })

  it('offers a scene with its location and NPCs on the scene page', () => {
    const [key, scene] = Object.entries(scenes).find(
      ([, candidate]) => candidate.npcs.length > 0 && candidate.illustration,
    )!
    const onPage = playerScreenOptionsForPage(options, `/dm/scenes/${scene.slug}`)
    expect(onPage[0]?.selection).toEqual({ image: 'illustration', ref: { ref: 'scene', key } })
    const refs = new Set(onPage.map((option) => option.selection.ref.key))
    for (const npc of scene.npcs) {
      if (npcOptions.some((option) => option.selection.ref.key === npc.key)) {
        expect(refs.has(npc.key)).toBe(true)
      }
    }
  })

  it('finds pictures by name', () => {
    const first = npcOptions[0]!
    expect(filterPlayerScreenOptions(options, first.name)).toContainEqual(first)
  })

  it('ignores stored state it cannot read', () => {
    expect(parsePlayerScreenState('not json')).toEqual(EMPTY_PLAYER_SCREEN)
    expect(parsePlayerScreenState('{"showing":{"image":"avatar","url":"/x.png"}}')).toEqual(
      EMPTY_PLAYER_SCREEN,
    )
  })
})
