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
  'effect',
  'card',
] as const

export type EntityKind = (typeof ENTITY_KINDS)[number]

export const DM_ENTITY_KINDS = ['arc', 'scene', 'creature'] as const

export type DmEntityKind = (typeof DM_ENTITY_KINDS)[number]

/** Rules reference shared by player and DM views: game terms, not campaign records. */
export const GLOSSARY_KINDS = ['rule'] as const

export type GlossaryKind = (typeof GLOSSARY_KINDS)[number]

/** The published library: books and what they print, apart from campaign canon. */
export const LIBRARY_KINDS = ['publication', 'monster', 'spell'] as const

export type LibraryKind = (typeof LIBRARY_KINDS)[number]

export type AnyKind = EntityKind | DmEntityKind | GlossaryKind | LibraryKind

export type EntityRef<K extends AnyKind = EntityKind> = {
  ref: K
  key: string
}

export function entityRefOf<K extends AnyKind>(kind: K) {
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

/** A pointer to a prepared scene, which only DM prose (`DmContent`) can hold. */
export function isSceneRef(value: unknown): value is EntityRef<'scene'> {
  return (
    !!value &&
    typeof value === 'object' &&
    (value as EntityRef<'scene'>).ref === 'scene' &&
    typeof (value as EntityRef<'scene'>).key === 'string'
  )
}
