import { z } from 'zod'

import { EntityRefSchema, entityRefOf } from './kind'
import type { EntityRef } from './kind'

/**
 * A piece of renderable content. Arrays are interpreted by their elements:
 * an array of only strings/refs/links is a single **inline run** (one paragraph
 * that mixes text and links); an array that contains nested arrays is a list
 * of **paragraphs**, each element rendered as its own block. Nesting can repeat. Rules terms
 * (`refs.rules.*`) explain themselves in place; they are not campaign records.
 */
export type Content = (
  | string
  | EntityRef
  | EntityRef<'rule'>
  | { type: 'link'; label: string; url: string }
  | { type: 'image' | 'video' | 'audio' | 'map'; url: string }
)[][]

type ContentAtom = Content[number][number]

/**
 * Prose on DM-only records such as scenes. It is {@link Content} that can also point at prepared
 * scenes (`refs.scenes.*`), which only exist on the DM side and so never appear in player content.
 */
export type DmContent = (ContentAtom | EntityRef<'scene'>)[][]

const contentAtoms = () =>
  [
    z.string(),
    EntityRefSchema,
    entityRefOf('rule'),
    z.object({
      type: z.literal('link'),
      label: z.string().min(1),
      url: z.string().url(),
    }),
    z.object({ type: z.literal('image'), url: z.string() }),
    z.object({ type: z.literal('video'), url: z.string() }),
    z.object({ type: z.literal('audio'), url: z.string() }),
    z.object({ type: z.literal('map'), url: z.string() }),
  ] as const

export const Content = z.lazy(() => z.array(z.array(z.union(contentAtoms()))))

export const DmContent = z.lazy(() =>
  z.array(z.array(z.union([...contentAtoms(), entityRefOf('scene')]))),
)

/**
 * DM-only truth about a record. Players see `notes`; the player projection removes `background`
 * (see `DM_FIELDS` in `src/lib/player-visibility.ts`). Refs inside it never introduce a record to
 * players. When players discover part of it, move that part into `notes`; never copy it.
 */
export const Background = Content.optional().describe(
  'DM only: the hidden truth about this record. Never shown to players.',
)
