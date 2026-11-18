import { z } from 'zod'

/** A stretch of campaign time, such as an effect's duration or a promised delivery. */
export const Span = z
  .strictObject({
    hours: z.number().int().positive().optional(),
    days: z.number().int().positive().optional(),
    months: z.number().int().positive().optional(),
    years: z.number().int().positive().optional(),
  })
  .refine((span) => Object.values(span).some(Boolean), 'Give at least one unit')

export type Span = z.infer<typeof Span>
