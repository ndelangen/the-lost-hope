import { z } from 'zod'

export function slugFromName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function stripSlug(value: unknown): unknown {
  if (!value || typeof value !== 'object' || Array.isArray(value) || !('name' in value)) {
    return value
  }
  const { slug: _, ...rest } = value as Record<string, unknown>
  return rest
}

export function deriveSlug<T extends z.ZodType>(
  schema: T,
): z.ZodType<z.output<T> & { slug: string }, z.input<T>> {
  return z.preprocess(stripSlug, schema).transform((data) => {
    const { name } = data as { name: string }
    return { ...(data as Record<string, unknown>), slug: slugFromName(name) }
  }) as unknown as z.ZodType<z.output<T> & { slug: string }, z.input<T>>
}
