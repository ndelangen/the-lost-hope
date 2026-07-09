import { z } from 'zod'

import { EntityRefSchema } from './kind'
import type { EntityRef } from './kind'

export type Content =
  | string
  | EntityRef
  | { type: 'image' | 'video' | 'audio' | 'map'; url: string }
  | Array<string | EntityRef>

export const Content: z.ZodType<Content> = z.lazy(() =>
  z.union([
    z.string(),
    EntityRefSchema,
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
    z.array(z.union([z.string(), EntityRefSchema])),
  ]),
)
