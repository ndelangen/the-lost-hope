import type { EntityKind } from '#/definitions/kind'

import { collectReferences } from './campaign-read-model'

/**
 * Fields that only the DM may see. The player projection removes exactly these fields, so a DM
 * field must be listed here to stay out of player pages, search, links, and previews.
 */
export const DM_FIELDS = {
  beast: ['background'],
  pc: ['background'],
  npc: ['motivations', 'background'],
  location: ['background'],
  event: ['background'],
  session: [],
  quest: ['background'],
  organization: ['background'],
  item: ['background'],
} as const satisfies Record<EntityKind, readonly string[]>

export type DmField<K extends EntityKind> = (typeof DM_FIELDS)[K][number]

/** Removes the DM fields from each member of a union, keeping discriminated unions intact. */
export type PlayerData<K extends EntityKind, T> = T extends unknown ? Omit<T, DmField<K>> : never

/** Kinds players always see: the party, its sessions, and its own quest synthesis. */
const ALWAYS_VISIBLE: ReadonlySet<EntityKind> = new Set(['pc', 'session', 'quest'])

export function stripDmFields<K extends EntityKind, T extends object>(
  kind: K,
  data: T,
): PlayerData<K, T> {
  const hidden = new Set<string>(DM_FIELDS[kind])
  return Object.fromEntries(
    Object.entries(data).filter(([field]) => !hidden.has(field)),
  ) as PlayerData<K, T>
}

type SourceRegistries = {
  [K in EntityKind]: Readonly<Record<string, object>>
}

export type PlayerVisibleKeys = {
  readonly [K in EntityKind]: ReadonlySet<string>
}

/**
 * Derive what players may see from the campaign's own references:
 *
 * - PCs, sessions, and quests are always visible.
 * - An event is visible when a session lists it; an event outside every session is off-screen.
 * - Any other record is visible once a visible event references it outside its DM fields. That
 *   event is the record's first recorded appearance.
 * - A visible location makes its parent locations visible.
 */
export function playerVisibleKeys(registries: SourceRegistries): PlayerVisibleKeys {
  const visible = Object.fromEntries(
    (Object.keys(registries) as EntityKind[]).map((kind) => [
      kind,
      new Set(ALWAYS_VISIBLE.has(kind) ? Object.keys(registries[kind]) : []),
    ]),
  ) as { [K in EntityKind]: Set<string> }

  for (const session of Object.values(registries.session)) {
    for (const ref of (session as { events: readonly { key: string }[] }).events) {
      if (Object.hasOwn(registries.event, ref.key)) visible.event.add(ref.key)
    }
  }

  for (const key of visible.event) {
    const event = stripDmFields('event', registries.event[key]!)
    for (const ref of collectReferences(event)) {
      if (ref.ref === 'event' || ALWAYS_VISIBLE.has(ref.ref)) continue
      if (Object.hasOwn(registries[ref.ref], ref.key)) visible[ref.ref].add(ref.key)
    }
  }

  for (const key of visible.location) {
    let parent = (registries.location[key] as { parent?: { key: string } }).parent
    while (parent && !visible.location.has(parent.key)) {
      visible.location.add(parent.key)
      parent = (registries.location[parent.key] as { parent?: { key: string } } | undefined)?.parent
    }
  }

  return visible
}

/** Filter a registry to the records players may see and remove their DM fields. */
export function playerRegistry<K extends EntityKind, T extends object>(
  kind: K,
  registry: Readonly<Record<string, T>>,
  visible: PlayerVisibleKeys,
): Partial<Record<string, PlayerData<K, T>>> {
  return Object.fromEntries(
    Object.entries(registry)
      .filter(([key]) => visible[kind].has(key))
      .map(([key, data]) => [key, stripDmFields(kind, data)]),
  )
}
