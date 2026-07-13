import beasts from '#/data/beasts/_index'
import events from '#/data/events/_index'
import items from '#/data/items/_index'
import locations from '#/data/locations/_index'
import npcs from '#/data/npcs/_index'
import organizations from '#/data/organizations/_index'
import pcs from '#/data/pcs/_index'
import quests from '#/data/quests/_index'
import sessions from '#/data/sessions/_index'
import type { EntityKind } from '#/definitions/kind'

type RegistryRecord = Record<string, { slug: string; name: string }>

export const REGISTRIES = {
  beast: beasts,
  pc: pcs,
  npc: npcs,
  location: locations,
  event: events,
  session: sessions,
  quest: quests,
  organization: organizations,
  item: items,
} as const satisfies Record<EntityKind, RegistryRecord>

type Registries = typeof REGISTRIES

export type RegistryData<K extends EntityKind> = K extends EntityKind
  ? Registries[K][keyof Registries[K]]
  : never

export type EntityOf<K extends EntityKind> = K extends EntityKind
  ? {
      kind: K
      slug: string
      data: RegistryData<K>
    }
  : never

export type Entity = EntityOf<EntityKind>

export type DataOf<K extends EntityKind> = EntityOf<K>['data']

export { beasts, events, items, locations, npcs, organizations, pcs, quests, sessions }
