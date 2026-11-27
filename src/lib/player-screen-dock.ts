import {
  playerScreenShowing,
  showOnPlayerScreen,
  stepPlayerScreen,
  type PlayerScreenImage,
  type PlayerScreenState,
} from '#/lib/player-screen-state'

/*
 * What the DM's player-screen panel works out from the screen's state. None of it changes what the
 * player screen draws.
 */

/** The picture a blank screen is hiding: the one shown just before it, if there was one. */
export function pictureBehindBlank(state: PlayerScreenState): PlayerScreenImage | null {
  if (playerScreenShowing(state) !== null || state.index === 0) return null
  return state.history[state.index - 1] ?? null
}

/**
 * One blank key: blanks the screen while a picture is up, and brings that picture back when
 * pressed again. A screen that was never showing anything stays blank.
 */
export function toggleBlankPlayerScreen(state: PlayerScreenState): PlayerScreenState {
  if (playerScreenShowing(state)) return showOnPlayerScreen(state, null)
  return pictureBehindBlank(state) ? stepPlayerScreen(state, -1) : state
}

export type HistoryFrame = {
  /** The entry's place in the history, for jumping to it. */
  index: number
  selection: PlayerScreenImage | null
  /** `ahead` entries are the ones the DM stepped back from. */
  place: 'shown' | 'live' | 'ahead'
}

/** The history as frames, oldest first, each knowing where it sits around the live one. */
export function playerScreenHistoryFrames(state: PlayerScreenState): HistoryFrame[] {
  return state.history.map((selection, index) => ({
    index,
    selection,
    place: index === state.index ? 'live' : index < state.index ? 'shown' : 'ahead',
  }))
}

export type NameOnScreen =
  /** The players read this name under the picture. */
  | { kind: 'shown'; name: string }
  /** Names are switched off. */
  | { kind: 'off' }
  /** Names are on, but this picture has none to give: unmet, a scene, a handout or a fleet. */
  | { kind: 'withheld' }

/** What the player screen prints under a picture, given the names switch. */
export function nameOnPlayerScreen(
  captions: boolean,
  picture: { playerCaption?: string },
): NameOnScreen {
  if (!captions) return { kind: 'off' }
  return picture.playerCaption
    ? { kind: 'shown', name: picture.playerCaption }
    : { kind: 'withheld' }
}
