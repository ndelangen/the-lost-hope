import type { EntityRef } from '#/definitions/kind'
import { DEFAULT_AVATAR } from '#/definitions/media'
import type { PcCombat } from '#/definitions/pc'
import type { Scene } from '#/definitions/scene'
import type { OwnOrSharedStatBlock, StatBlock } from '#/definitions/stat-block'
import { effectsOn, type EntityOf } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { resolveStatBlock } from '#/lib/dm-campaign'
import { deriveStatBlock, type DerivedStats } from '#/lib/stat-block'

import { stepsByAbility } from './ability-steps'
import {
  addCreature,
  combatantName,
  type CreatureRef,
  type Encounter,
  type RosterEntry,
  type StartingStats,
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
    ? (
        SOURCE_REGISTRIES.pc as Readonly<
          Record<
            string,
            { name: string; slug: string; avatar: string; url: string; combat?: PcCombat }
          >
        >
      )[source.key]
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
  /** Starting HP and AC: from the stat block, or the numbers a PC's player shared. */
  start?: StartingStats
  /** A PC's quick facts for the party strip. */
  party?: PcCombat
  /** A PC's online character sheet, for anything the quick facts don't cover. */
  sheetUrl?: string
  /** Campaign effects active on this PC, NPC, or beast, read-only in the fight. */
  effects: readonly EntityOf<'effect'>['data'][]
  /** Whether the tracker follows HP and abilities for this entry. */
  tracked: boolean
}

/** A stat block's derived numbers plus the step-by-step rolls for each ability, as the DM plays it. */
export function playableStats(stats: StatBlock): DerivedStats {
  return { ...deriveStatBlock(stats), steps: stepsByAbility(stats) }
}

/** Resolve a roster entry against the full campaign source, including unmet NPCs and beasts. */
export function combatantView(entry: RosterEntry, roster: readonly RosterEntry[]): CombatantView {
  if (entry.kind === 'placeholder')
    return { id: entry.id, name: entry.label, kind: 'Player', tracked: false, effects: [] }
  if (entry.kind === 'pc') {
    const record = pcRecord(entry.source)
    return {
      id: entry.id,
      name: record?.name ?? entry.source.key,
      kind: 'PC',
      avatar: realAvatar(record?.avatar),
      start: { maxHp: record?.combat?.maxHp, ac: record?.combat?.ac },
      party: record?.combat ?? {},
      sheetUrl: record?.url || undefined,
      effects: record ? activeEffects('pc', record.slug) : [],
      tracked: true,
    }
  }
  const record = creatureRecord(entry.source)
  const stats = resolveStatBlock(record?.stats)
  const derived = stats ? playableStats(stats) : undefined
  return {
    id: entry.id,
    name: combatantName(entry, roster, record?.name ?? entry.source.key),
    kind: entry.source.ref === 'npc' ? 'NPC' : 'Beast',
    avatar: realAvatar(record?.avatar),
    stats,
    derived,
    start: derived ? { maxHp: derived.maxHp, ac: derived.ac } : undefined,
    effects: record ? activeEffects(entry.source.ref, record.slug) : [],
    tracked: true,
  }
}

/** The campaign effects in force on a record now. */
function activeEffects(kind: 'pc' | 'npc' | 'beast', slug: string) {
  return effectsOn(kind, slug)
    .filter((entry) => entry.status === 'active')
    .map((entry) => entry.effect.data)
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

/** A scene's opponents, each as many times as its count, are the starting roster. */
export function sceneRoster(scene: Scene) {
  return (encounter: Encounter) =>
    scene.opponents
      .flatMap(({ creature, count }) => Array.from({ length: count }, () => creature))
      .reduce<Encounter>(addCreature, encounter)
}
