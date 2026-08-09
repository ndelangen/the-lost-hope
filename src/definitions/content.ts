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
