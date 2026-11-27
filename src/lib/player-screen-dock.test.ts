import { describe, expect, it } from 'vitest'

import {
  nameOnPlayerScreen,
  pictureBehindBlank,
  playerScreenHistoryFrames,
  toggleBlankPlayerScreen,
} from './player-screen-dock'
import {
  EMPTY_PLAYER_SCREEN,
  playerScreenShowing,
  showOnPlayerScreen,
  stepPlayerScreen,
  type PlayerScreenImage,
  type PlayerScreenState,
} from './player-screen-state'

const map: PlayerScreenImage = { image: 'map', ref: { ref: 'location', key: 'the_docks' } }
const bob: PlayerScreenImage = { image: 'avatar', ref: { ref: 'npc', key: 'bob' } }

function shown(...selections: Array<PlayerScreenImage | null>): PlayerScreenState {
  return selections.reduce(showOnPlayerScreen, EMPTY_PLAYER_SCREEN)
}

describe('blank key', () => {
  it('blanks a picture and brings it back on the second press', () => {
    const blanked = toggleBlankPlayerScreen(shown(map))
    expect(playerScreenShowing(blanked)).toBeNull()
    expect(pictureBehindBlank(blanked)).toEqual(map)
    expect(playerScreenShowing(toggleBlankPlayerScreen(blanked))).toEqual(map)
  })

  it('does not pile up blank entries when pressed over and over', () => {
    let state = shown(map)
    for (let press = 0; press < 6; press++) state = toggleBlankPlayerScreen(state)
    expect(state.history).toEqual([null, map, null])
    expect(playerScreenShowing(state)).toEqual(map)
  })

  it('leaves a screen that never showed anything blank', () => {
    expect(toggleBlankPlayerScreen(EMPTY_PLAYER_SCREEN)).toBe(EMPTY_PLAYER_SCREEN)
    expect(pictureBehindBlank(EMPTY_PLAYER_SCREEN)).toBeNull()
  })

  it('has nothing behind a picture', () => {
    expect(pictureBehindBlank(shown(map, bob))).toBeNull()
  })
})

describe('history frames', () => {
  it('places every entry around the live one', () => {
    const state = stepPlayerScreen(shown(map, bob), -1)
    expect(playerScreenHistoryFrames(state)).toEqual([
      { index: 0, selection: null, place: 'shown' },
      { index: 1, selection: map, place: 'live' },
      { index: 2, selection: bob, place: 'ahead' },
    ])
  })
})

describe('name on the player screen', () => {
  it('says what the players read', () => {
    expect(nameOnPlayerScreen(true, { playerCaption: 'Bob' })).toEqual({
      kind: 'shown',
      name: 'Bob',
    })
    expect(nameOnPlayerScreen(false, { playerCaption: 'Bob' })).toEqual({ kind: 'off' })
    expect(nameOnPlayerScreen(true, {})).toEqual({ kind: 'withheld' })
  })
})
