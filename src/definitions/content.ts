import { z } from 'zod'

import { EntityRefSchema } from './kind'
import type { EntityRef } from './kind'

/**
 * A piece of renderable content. Arrays are interpreted by their elements:
 * an array of only strings/refs/links is a single **inline run** (one paragraph
 * that mixes text and links); an array that contains nested arrays is a list
 * of **paragraphs**, each element rendered as its own block. Nesting can repeat.
 */
export type Content = (
  | string
  | EntityRef
  | { type: 'link'; label: string; url: string }
  | { type: 'image' | 'video' | 'audio' | 'map'; url: string }
)[][]

export const Content = z.lazy(() =>
  z.array(
    z.array(
      z.union([
        z.string(),
        EntityRefSchema,
        z.object({
          type: z.literal('link'),
          label: z.string().min(1),
          url: z.string().url(),
        }),
        z.object({
          type: z.literal('image'),
          url: z.string(),
        }),
        z.object({
          type: z.literal('video'),
          url: z.string(),
        }),
        z.object({
          type: z.literal('audio'),
          url: z.string(),
        }),
        z.object({
          type: z.literal('map'),
          url: z.string(),
        }),
      ]),
    ),
  ),
)

/**
 * DM-only truth about a record. Players see `notes`; the player projection removes `background`
 * (see `DM_FIELDS` in `src/lib/player-visibility.ts`). Refs inside it never introduce a record to
 * players. When players discover part of it, move that part into `notes`; never copy it.
 */
export const Background = Content.optional().describe(
  'DM only: the hidden truth about this record. Never shown to players.',
)
