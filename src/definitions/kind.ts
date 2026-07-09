import { z } from 'zod'

export const ENTITY_KINDS = [
  'pc',
  'npc',
  'location',
  'event',
  'session',
  'quest',
  'organization',
] as const

export type EntityKind = (typeof ENTITY_KINDS)[number]

export type EntityRef = {
  ref: EntityKind
  key: string
}

export const EntityRefSchema = z.object({
  ref: z.enum(ENTITY_KINDS),
  key: z.string(),
})

export function isEntityRef(value: unknown): value is EntityRef {
  return (
    !!value &&
    typeof value === 'object' &&
    'ref' in value &&
    'key' in value &&
    typeof (value as EntityRef).key === 'string' &&
    ENTITY_KINDS.includes((value as EntityRef).ref)
  )
}
