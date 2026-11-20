import { z } from 'zod'

import { entityRefForSlug } from '#/lib/campaign'
import { HANDOUTS, type HandoutKey } from '#/lib/handouts'
import { DEFAULT_PLAYER_SCREEN_GRID, PlayerScreenGrid } from '#/lib/player-screen-grid'

const HANDOUT_KEYS = Object.keys(HANDOUTS) as [HandoutKey, ...HandoutKey[]]

/**
 * What the DM puts on the player-facing screen: a record and which of its images to show. The
 * screen resolves the picture from the record, so a selection never carries an image URL.
 */
export const PlayerScreenImage = z.union([
  z.strictObject({
    image: z.literal('avatar'),
    ref: z.strictObject({ ref: z.enum(['pc', 'npc', 'beast']), key: z.string().min(1) }),
  }),
  z.strictObject({
    image: z.enum(['map', 'illustration']),
    ref: z.strictObject({ ref: z.literal('location'), key: z.string().min(1) }),
  }),
  z.strictObject({
    image: z.literal('illustration'),
    ref: z.strictObject({ ref: z.literal('scene'), key: z.string().min(1) }),
    index: z.number().int().nonnegative(),
  }),
  z.strictObject({
    image: z.literal('handout'),
    ref: z.strictObject({ ref: z.literal('handout'), key: z.enum(HANDOUT_KEYS) }),
  }),
])

export type PlayerScreenImage = z.infer<typeof PlayerScreenImage>

/** How many pictures the DM can step back through. */
export const PLAYER_SCREEN_HISTORY_LIMIT = 30

export const PlayerScreenState = z
  .strictObject({
    /** Everything shown, oldest first. `null` is a blank screen. */
    history: z.array(PlayerScreenImage.nullable()).min(1).max(PLAYER_SCREEN_HISTORY_LIMIT),
    /** The entry on screen now; entries after it are pictures the DM stepped back from. */
    index: z.number().int().nonnegative(),
    /** Name the record under the image. Only records the party has met are ever named. */
    captions: z.boolean(),
    /** Turns the whole picture sideways, for handouts and portrait art on a landscape monitor. */
    rotation: z.union([z.literal(0), z.literal(90), z.literal(-90)]).default(0),
    /** Each picture's battle grid, by picture id, so a map keeps its alignment between showings. */
    grids: z.record(z.string(), PlayerScreenGrid).default({}),
  })
  .refine((state) => state.index < state.history.length, { path: ['index'] })

export type PlayerScreenState = z.infer<typeof PlayerScreenState>

export const EMPTY_PLAYER_SCREEN: PlayerScreenState = {
  history: [null],
  index: 0,
  captions: true,
  rotation: 0,
  grids: {},
}

export type PlayerScreenRotation = PlayerScreenState['rotation']

export function parsePlayerScreenState(raw: string | null): PlayerScreenState {
  if (!raw) return EMPTY_PLAYER_SCREEN
  try {
    const parsed = PlayerScreenState.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : EMPTY_PLAYER_SCREEN
  } catch {
    return EMPTY_PLAYER_SCREEN
  }
}

/** The picture on the player screen now, or `null` when it is blank. */
export function playerScreenShowing(state: PlayerScreenState): PlayerScreenImage | null {
  return state.history[state.index] ?? null
}

/**
 * Puts a picture (or a blank screen) on the player screen as a new history entry. Entries the DM
 * had stepped back from are dropped, as in a browser, and the oldest entries fall off the limit.
 */
export function showOnPlayerScreen(
  state: PlayerScreenState,
  selection: PlayerScreenImage | null,
): PlayerScreenState {
  const current = playerScreenShowing(state)
  if (selection === null ? current === null : samePlayerScreenImage(selection, current))
    return state
  const history = [...state.history.slice(0, state.index + 1), selection].slice(
    -PLAYER_SCREEN_HISTORY_LIMIT,
  )
  return { ...state, history, index: history.length - 1 }
}

/** Steps back (-1) or forward (+1) through what the player screen has shown. */
export function stepPlayerScreen(state: PlayerScreenState, step: -1 | 1): PlayerScreenState {
  const index = state.index + step
  return index < 0 || index >= state.history.length ? state : { ...state, index }
}

export function canStepPlayerScreen(state: PlayerScreenState, step: -1 | 1): boolean {
  const index = state.index + step
  return index >= 0 && index < state.history.length
}

/**
 * A picture's own show button: shows it, or, when it is already on screen, returns the screen to
 * whatever was there before it.
 */
export function togglePlayerScreen(
  state: PlayerScreenState,
  selection: PlayerScreenImage,
): PlayerScreenState {
  if (!samePlayerScreenImage(selection, playerScreenShowing(state))) {
    return showOnPlayerScreen(state, selection)
  }
  return state.index > 0 ? stepPlayerScreen(state, -1) : showOnPlayerScreen(state, null)
}

export function playerScreenImageId(selection: PlayerScreenImage): string {
  const record = `${selection.image}:${selection.ref.ref}:${selection.ref.key}`
  return 'index' in selection ? `${record}:${selection.index}` : record
}

export function samePlayerScreenImage(
  a: PlayerScreenImage | null | undefined,
  b: PlayerScreenImage | null | undefined,
): boolean {
  return !!a && !!b && playerScreenImageId(a) === playerScreenImageId(b)
}

export const PLAYER_SCREEN_STORAGE_KEY = 'dag:player-screen'
/** The player screen announces itself here so the DM's controls know a screen is open. */
export const PLAYER_SCREEN_CHANNEL = 'dag:player-screen'
export const PLAYER_SCREEN_HEARTBEAT_MS = 1500

/** A character or creature portrait on a player page, as a player-screen selection. */
export function avatarOnPlayerScreen(
  kind: 'pc' | 'npc' | 'beast',
  slug: string,
): PlayerScreenImage | undefined {
  const ref = entityRefForSlug(kind, slug)
  return ref ? { image: 'avatar', ref } : undefined
}

/** A location's map or illustration on its page, as a player-screen selection. */
export function locationOnPlayerScreen(
  slug: string,
  image: 'map' | 'illustration',
): PlayerScreenImage | undefined {
  const ref = entityRefForSlug('location', slug)
  return ref ? { image, ref } : undefined
}

/** Jumps straight to one entry in the player screen's history. */
export function jumpPlayerScreen(state: PlayerScreenState, index: number): PlayerScreenState {
  return index >= 0 && index < state.history.length && index !== state.index
    ? { ...state, index }
    : state
}

/** The grid over a picture: the one the DM aligned for it, or a fresh one that is off. */
export function playerScreenGridFor(
  state: PlayerScreenState,
  selection: PlayerScreenImage,
): PlayerScreenGrid {
  const id = playerScreenImageId(selection)
  return Object.hasOwn(state.grids, id) ? state.grids[id]! : DEFAULT_PLAYER_SCREEN_GRID
}

/** Changes the grid over one picture and remembers it for the next time that picture is shown. */
export function updatePlayerScreenGrid(
  state: PlayerScreenState,
  selection: PlayerScreenImage,
  change: (grid: PlayerScreenGrid) => PlayerScreenGrid,
): PlayerScreenState {
  const grid = change(playerScreenGridFor(state, selection))
  return { ...state, grids: { ...state.grids, [playerScreenImageId(selection)]: grid } }
}

/** Forgets everything shown before, keeping only what is on the player screen now. */
export function clearPlayerScreenHistory(state: PlayerScreenState): PlayerScreenState {
  return state.history.length < 2
    ? state
    : { ...state, history: [playerScreenShowing(state)], index: 0 }
}
