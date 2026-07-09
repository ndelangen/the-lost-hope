import type { z } from 'zod'

/**
 * Build a typed `create` helper for a schema: it validates (and applies
 * defaults to) the input, returning the parsed output. Replaces the per-file
 * `create` boilerplate.
 */
export function makeCreate<S extends z.ZodType>(schema: S) {
  return (input: z.input<S>): z.output<S> => schema.parse(input)
}
