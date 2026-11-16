import { describe, expect, it } from 'vitest'

import { PLAYER_VISIBLE_KEYS, SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { scenes } from '#/lib/dm-campaign'

import {
  filterPlayerScreenOptions,
  playerScreenOptions,
  playerScreenOptionsForPage,
  resolvePlayerScreenImage,
} from './player-screen'
import {
  EMPTY_PLAYER_SCREEN,
  PLAYER_SCREEN_HISTORY_LIMIT,
  canStepPlayerScreen,
  jumpPlayerScreen,
  parsePlayerScreenState,
  playerScreenShowing,
  showOnPlayerScreen,
  stepPlayerScreen,
  togglePlayerScreen,
  type PlayerScreenImage,
} from './player-screen-state'

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
    const pictures = options.flatMap((option) => (option.src ? [option.src] : []))
    expect(pictures.length).toBe(options.length - 1) // Jim's letter is drawn, not a picture.
    for (const src of pictures) {
      expect(src).not.toContain('placeholder')
      expect(src).not.toContain('placehold.co')
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
    const keys = new Set(onPage.map((option) => option.selection.ref.key))
    const npcsWithArt = scene.npcs.filter((npc) =>
      npcOptions.some((option) => option.selection.ref.key === npc.key),
    )
    expect(npcsWithArt.filter((npc) => !keys.has(npc.key))).toEqual([])
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
    expect(parsePlayerScreenState('{"history":[null],"index":3,"captions":true}')).toEqual(
      EMPTY_PLAYER_SCREEN,
    )
  })
})

const borris: PlayerScreenImage = { image: 'avatar', ref: { ref: 'npc', key: 'borris' } }
const map: PlayerScreenImage = { image: 'map', ref: { ref: 'location', key: 'nimbus' } }
const scene: PlayerScreenImage = {
  image: 'illustration',
  ref: { ref: 'scene', key: 'borris_shutters_the_casino' },
}

describe('player screen history', () => {
  it('steps back and forward through what was shown', () => {
    const shown = showOnPlayerScreen(showOnPlayerScreen(EMPTY_PLAYER_SCREEN, map), borris)
    expect(playerScreenShowing(shown)).toEqual(borris)
    const back = stepPlayerScreen(shown, -1)
    expect(playerScreenShowing(back)).toEqual(map)
    expect(playerScreenShowing(stepPlayerScreen(back, -1))).toBeNull()
    expect(playerScreenShowing(stepPlayerScreen(back, 1))).toEqual(borris)
    expect(canStepPlayerScreen(shown, 1)).toBe(false)
    expect(stepPlayerScreen(shown, 1)).toBe(shown)
  })

  it('drops the pictures stepped back from when a new one is shown', () => {
    const back = stepPlayerScreen(
      showOnPlayerScreen(showOnPlayerScreen(EMPTY_PLAYER_SCREEN, map), borris),
      -1,
    )
    const next = showOnPlayerScreen(back, scene)
    expect(next.history).toEqual([null, map, scene])
    expect(canStepPlayerScreen(next, 1)).toBe(false)
  })

  it('does not record the picture already on screen twice', () => {
    const shown = showOnPlayerScreen(EMPTY_PLAYER_SCREEN, map)
    expect(showOnPlayerScreen(shown, map)).toBe(shown)
    expect(showOnPlayerScreen(EMPTY_PLAYER_SCREEN, null)).toBe(EMPTY_PLAYER_SCREEN)
  })

  it('puts back what was showing when a show button is pressed again', () => {
    const withBorris = togglePlayerScreen(showOnPlayerScreen(EMPTY_PLAYER_SCREEN, map), borris)
    expect(playerScreenShowing(withBorris)).toEqual(borris)
    expect(playerScreenShowing(togglePlayerScreen(withBorris, borris))).toEqual(map)
    const onlyBorris = togglePlayerScreen({ ...EMPTY_PLAYER_SCREEN, history: [borris] }, borris)
    expect(playerScreenShowing(onlyBorris)).toBeNull()
  })

  it('keeps a bounded history', () => {
    let state = EMPTY_PLAYER_SCREEN
    for (let index = 0; index < PLAYER_SCREEN_HISTORY_LIMIT + 5; index += 1) {
      state = showOnPlayerScreen(state, index % 2 ? map : borris)
    }
    expect(state.history).toHaveLength(PLAYER_SCREEN_HISTORY_LIMIT)
    expect(state.index).toBe(PLAYER_SCREEN_HISTORY_LIMIT - 1)
    expect(parsePlayerScreenState(JSON.stringify(state))).toEqual(state)
  })

  it('jumps to any entry in the history', () => {
    const shown = showOnPlayerScreen(showOnPlayerScreen(EMPTY_PLAYER_SCREEN, map), borris)
    expect(playerScreenShowing(jumpPlayerScreen(shown, 0))).toBeNull()
    expect(jumpPlayerScreen(shown, 9)).toBe(shown)
  })
})

describe('player screen rotation', () => {
  it('reads a stored screen saved before rotation existed as upright', () => {
    expect(parsePlayerScreenState('{"history":[null],"index":0,"captions":true}').rotation).toBe(0)
  })

  it('rejects angles other than a quarter turn', () => {
    expect(
      parsePlayerScreenState('{"history":[null],"index":0,"captions":true,"rotation":45}'),
    ).toEqual(EMPTY_PLAYER_SCREEN)
  })
})

describe('player screen handouts', () => {
  it('offers the handouts first, by key, without naming them on screen', () => {
    const handouts = options.filter((option) => option.group === 'Handouts')
    expect(handouts.map((option) => option.selection.ref.key).toSorted()).toEqual([
      'book_of_gruumsh_page_4',
      'jims_letter',
    ])
    expect(options[0]?.group).toBe('Handouts')
    for (const handout of handouts) expect(handout.playerCaption).toBeUndefined()
  })

  it('rejects a handout key that is not registered', () => {
    expect(
      parsePlayerScreenState(
        '{"history":[{"image":"handout","ref":{"ref":"handout","key":"nope"}}],"index":0,"captions":true}',
      ),
    ).toEqual(EMPTY_PLAYER_SCREEN)
  })
})

describe('player screen on a scene page', () => {
  it('offers the scene’s unmet NPCs and the characters it mentions', () => {
    const scene = Object.values(scenes).find(
      (candidate) => candidate.slug === 'the-hand-comes-for-jim',
    )!
    const keys = new Set(
      playerScreenOptionsForPage(options, `/dm/scenes/${scene.slug}`).map(
        (option) => `${option.selection.ref.ref}:${option.selection.ref.key}`,
      ),
    )
    expect(keys.has('npc:silas_wren')).toBe(true)
    expect(keys.has('pc:jim')).toBe(true)
  })
})
