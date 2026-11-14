import type { EntityRef } from '#/definitions/kind'
import { DEFAULT_AVATAR } from '#/definitions/media'
import type { Scene } from '#/definitions/scene'
import type { OwnOrSharedStatBlock, StatBlock } from '#/definitions/stat-block'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { resolveStatBlock } from '#/lib/dm-campaign'
import { deriveStatBlock, type DerivedStats } from '#/lib/stat-block'

import {
  addCreature,
  combatantName,
  type CreatureRef,
  type Encounter,
  type RosterEntry,
} from './encounter'

type CreatureRecord = {
  name: string
  slug: string
  avatar: string
  stats: OwnOrSharedStatBlock
}

function creatureRecord(source: CreatureRef): CreatureRecord | undefined {
  const registry = SOURCE_REGISTRIES[source.ref] as Readonly<Record<string, CreatureRecord>>
  return Object.hasOwn(registry, source.key) ? registry[source.key] : undefined
}

function pcRecord(source: EntityRef<'pc'>) {
  return Object.hasOwn(SOURCE_REGISTRIES.pc, source.key)
    ? (SOURCE_REGISTRIES.pc as Readonly<Record<string, { name: string; avatar: string }>>)[
        source.key
      ]
    : undefined
}

export type CombatantView = {
  id: string
  name: string
  kind: 'NPC' | 'Beast' | 'PC' | 'Player'
  /** Portrait, when the campaign record has a real one. */
  avatar?: string
  stats?: StatBlock
  /** Numbers derived from the stat block, which ability text refers to. */
  derived?: DerivedStats
  /** Whether the tracker follows HP and abilities for this entry. */
  tracked: boolean
  /** The campaign record this combatant stands for, when it has one. */
  source?: CreatureRef | EntityRef<'pc'>
}

/** Resolve a roster entry against the full campaign source, including unmet NPCs and beasts. */
export function combatantView(entry: RosterEntry, roster: readonly RosterEntry[]): CombatantView {
  if (entry.kind === 'placeholder')
    return { id: entry.id, name: entry.label, kind: 'Player', tracked: false }
  if (entry.kind === 'pc') {
    const record = pcRecord(entry.source)
    return {
      id: entry.id,
      name: record?.name ?? entry.source.key,
      kind: 'PC',
      avatar: realAvatar(record?.avatar),
      tracked: false,
      source: entry.source,
    }
  }
  const record = creatureRecord(entry.source)
  const stats = resolveStatBlock(record?.stats)
  return {
    id: entry.id,
    name: combatantName(entry, roster, record?.name ?? entry.source.key),
    kind: entry.source.ref === 'npc' ? 'NPC' : 'Beast',
    avatar: realAvatar(record?.avatar),
    stats,
    derived: stats ? deriveStatBlock(stats) : undefined,
    tracked: true,
    source: entry.source,
  }
}

function realAvatar(avatar: string | undefined) {
  return avatar && avatar !== DEFAULT_AVATAR ? avatar : undefined
}

export type EncounterCandidate = {
  source: CreatureRef | EntityRef<'pc'>
  name: string
  kind: CombatantView['kind']
  /** Challenge rating, for NPCs and beasts. */
  cr?: string
}

/** Everyone the DM can add: every NPC and beast, met or not, plus the PCs. */
export function encounterCandidates(): EncounterCandidate[] {
  const creatures = (['npc', 'beast'] as const).flatMap((ref) =>
    Object.entries(SOURCE_REGISTRIES[ref] as Readonly<Record<string, CreatureRecord>>).map(
      ([key, record]) => ({
        source: { ref, key },
        name: record.name,
        kind: ref === 'npc' ? ('NPC' as const) : ('Beast' as const),
        cr: resolveStatBlock(record.stats)?.cr,
      }),
    ),
  )
  const pcs = Object.entries(SOURCE_REGISTRIES.pc).map(([key, record]) => ({
    source: { ref: 'pc' as const, key },
    name: record.name,
    kind: 'PC' as const,
  }))
  return [...creatures, ...pcs].toSorted((a, b) => a.name.localeCompare(b.name))
}

export type PartyMember = { source: EntityRef<'pc'>; name: string; avatar?: string }

/** The current party: every active PC in the campaign. */
export function currentParty(): PartyMember[] {
  return Object.entries(SOURCE_REGISTRIES.pc)
    .filter(([, pc]) => pc.status === 'active')
    .map(([key, pc]) => ({
      source: { ref: 'pc' as const, key },
      name: pc.name,
      avatar: realAvatar(pc.avatar),
    }))
}

/** A scene supplies its linked NPCs as the starting roster. */
export function sceneRoster(scene: Scene) {
  return (encounter: Encounter) => scene.npcs.reduce<Encounter>(addCreature, encounter)
}
