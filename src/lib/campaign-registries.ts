import beastRecords from '#/data/beasts/_index'
import eventRecords from '#/data/events/_index'
import itemRecords from '#/data/items/_index'
import locationRecords from '#/data/locations/_index'
import npcRecords from '#/data/npcs/_index'
import organizationRecords from '#/data/organizations/_index'
import pcRecords from '#/data/pcs/_index'
import questRecords from '#/data/quests/_index'
import sessionRecords from '#/data/sessions/_index'
import type { EntityKind } from '#/definitions/kind'

import {
  playerRegistry,
  playerVisibleKeys,
  type DmField,
  type PlayerData,
} from './player-visibility'

type RegistryRecord = Record<string, { slug: string; name: string }>

/**
 * The complete campaign source, including DM-only records and fields. Only DM views and
 * validation read it; player views read `REGISTRIES`.
 */
export const SOURCE_REGISTRIES = {
  beast: beastRecords,
  pc: pcRecords,
  npc: npcRecords,
  location: locationRecords,
  event: eventRecords,
  session: sessionRecords,
  quest: questRecords,
  organization: organizationRecords,
  item: itemRecords,
} as const satisfies Record<EntityKind, RegistryRecord>

type SourceRegistries = typeof SOURCE_REGISTRIES

export type SourceData<K extends EntityKind> = K extends EntityKind
  ? SourceRegistries[K][keyof SourceRegistries[K]]
  : never

// Every listed DM field must exist on its kind, so a renamed field cannot silently reach players.
type UnknownDmField = {
  [K in EntityKind]: Exclude<DmField<K>, keyof SourceData<K>>
}[EntityKind]
export const DM_FIELDS_EXIST: [UnknownDmField] extends [never] ? true : never = true

export const PLAYER_VISIBLE_KEYS = playerVisibleKeys(SOURCE_REGISTRIES)

function player<K extends EntityKind>(kind: K) {
  const source: Readonly<Record<string, object>> = SOURCE_REGISTRIES[kind]
  return playerRegistry(kind, source, PLAYER_VISIBLE_KEYS) as unknown as Readonly<
    Record<string, PlayerData<K, SourceData<K>>>
  >
}

/** The player-facing campaign: records players have met, without their DM fields. */
export const REGISTRIES = {
  beast: player('beast'),
  pc: player('pc'),
  npc: player('npc'),
  location: player('location'),
  event: player('event'),
  session: player('session'),
  quest: player('quest'),
  organization: player('organization'),
  item: player('item'),
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

export const {
  beast: beasts,
  event: events,
  item: items,
  location: locations,
  npc: npcs,
  organization: organizations,
  pc: pcs,
  quest: quests,
  session: sessions,
} = REGISTRIES
