import { z } from 'zod'

export const ENTITY_KINDS = [
  'beast',
  'pc',
  'npc',
  'location',
  'event',
  'session',
  'quest',
  'organization',
  'item',
] as const

export type EntityKind = (typeof ENTITY_KINDS)[number]

export const DM_ENTITY_KINDS = ['arc', 'scene'] as const

export type DmEntityKind = (typeof DM_ENTITY_KINDS)[number]

export type EntityRef<K extends EntityKind | DmEntityKind = EntityKind> = {
  ref: K
  key: string
}

export function entityRefOf<K extends EntityKind | DmEntityKind>(kind: K) {
  return z.strictObject({ ref: z.literal(kind), key: z.string().min(1) })
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
