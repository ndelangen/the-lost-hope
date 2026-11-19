import type { DmContent } from '#/definitions/content'
import type { EntityRef } from '#/definitions/kind'
import { DEFAULT_AVATAR } from '#/definitions/media'
import type { PcCombat } from '#/definitions/pc'
import type { FightPlace, Scene, SceneBeatFight, SceneOpponent } from '#/definitions/scene'
import type { OwnOrSharedStatBlock, StatBlock } from '#/definitions/stat-block'
import { effectsOn, type EntityOf } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { resolveStatBlock } from '#/lib/dm-campaign'
import { partyBudget, xpForCr, type DifficultyBudget } from '#/lib/encounter-difficulty'
import { deriveStatBlock, type DerivedStats } from '#/lib/stat-block'

import { stepsByAbility } from './ability-steps'
import {
  combatantName,
  type CreatureRef,
  type Preset,
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
            {
              name: string
              slug: string
              avatar: string
              url: string
              level?: number
              combat?: PcCombat
            }
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

/** A scene's starting enemies, each as many times as its count, when it has any. */
export function startPreset(sceneRef: EntityRef<'scene'>, scene: Scene): Preset | undefined {
  return scene.opponents.length > 0
    ? { scene: sceneRef, creatures: creaturesOf(scene.opponents) }
    : undefined
}

/** One of a scene's prepared groups, as the encounter loads it. */
export function fightPreset(sceneRef: EntityRef<'scene'>, fight: SceneFight): Preset {
  return { scene: sceneRef, fight: fight.key, creatures: fight.creatures }
}

function creaturesOf(groups: readonly SceneOpponent[]): CreatureRef[] {
  return groups.flatMap(({ creature, count }) => Array.from({ length: count }, () => creature))
}

/** One kind of creature in a fight, named and counted for display. */
export type FightGroup = { creature: CreatureRef; name: string; count: number }

/** A beat's fight ready to display: who is in it, on which side, and how to play them. */
export type FightLineUp = {
  opponents: FightGroup[]
  allies: FightGroup[]
  tactics: DmContent | undefined
}

function fightGroups(groups: readonly SceneOpponent[]): FightGroup[] {
  return groups.map(({ creature, count }) => ({
    creature,
    name: creatureRecord(creature)?.name ?? creature.key,
    count,
  }))
}

export function fightLineUp(fight: SceneBeatFight): FightLineUp {
  return {
    opponents: fightGroups(fight.opponents),
    allies: fightGroups(fight.allies),
    tactics: fight.tactics,
  }
}

/** A fight the encounter can bring in: a beat's line-up, and everyone who joins the roster with it. */
export type SceneFight = FightLineUp & {
  /** The title of its beat, which tells the fights of one scene apart. */
  key: string
  onlyIf: DmContent | undefined
  creatures: CreatureRef[]
  /** The rooms of the vessel it is fought in. Empty when it is not tied to a room. */
  where: FightPlace[]
}

/** The fights of a scene, in the order of its script. */
export function sceneFights(scene: Scene): SceneFight[] {
  return scene.beats.flatMap((beat) =>
    beat.fight
      ? [
          {
            key: beat.title,
            onlyIf: beat.onlyIf,
            ...fightLineUp(beat.fight),
            creatures: creaturesOf([...beat.fight.opponents, ...beat.fight.allies]),
            where: beat.fight.where,
          },
        ]
      : [],
  )
}

const sourceId = ({ ref, key }: CreatureRef) => `${ref}:${key}`

/**
 * The enemies a scene brings, once each: those present from the start, then each fight's
 * opponents in script order. Creatures that only ever fight beside the party are left out.
 */
export function sceneEnemies(scene: Scene): CreatureRef[] {
  const seen = new Map<string, CreatureRef>()
  for (const { creature } of [
    ...scene.opponents,
    ...scene.beats.flatMap((beat) => beat.fight?.opponents ?? []),
  ])
    if (!seen.has(sourceId(creature))) seen.set(sourceId(creature), creature)
  return [...seen.values()]
}

/** Creatures a scene only ever puts on the party's side, which do not count toward difficulty. */
export function sceneAllies(scene: Scene): ReadonlySet<string> {
  const enemies = new Set(sceneEnemies(scene).map(sourceId))
  return new Set(
    scene.beats
      .flatMap((beat) => beat.fight?.allies ?? [])
      .map(({ creature }) => sourceId(creature))
      .filter((id) => !enemies.has(id)),
  )
}

/** An NPC or beast the DM can add as an enemy, with its portrait when it has a real one. */
export type EnemyCandidate = EncounterCandidate & { source: CreatureRef; avatar?: string }

/** The candidate entry for a creature, to list it beside the search results. */
export function creatureCandidate(source: CreatureRef): EnemyCandidate {
  const record = creatureRecord(source)
  return {
    source,
    name: record?.name ?? source.key,
    kind: source.ref === 'npc' ? 'NPC' : 'Beast',
    cr: resolveStatBlock(record?.stats)?.cr,
    avatar: realAvatar(record?.avatar),
  }
}

/**
 * How hard the fight is for the PCs in it: their combined XP budget, and the XP of the enemies
 * still standing. Creatures the scene only puts on the party's side do not count.
 */
export function encounterDifficulty(
  roster: readonly RosterEntry[],
  isOut: (id: string) => boolean,
  allies: ReadonlySet<string> = new Set(),
): { budget: DifficultyBudget; standingXp: number } {
  const budget = partyBudget(
    roster.flatMap((entry) => (entry.kind === 'pc' ? [pcRecord(entry.source)?.level] : [])),
  )
  const standingXp = roster.reduce((sum, entry) => {
    if (entry.kind !== 'creature' || isOut(entry.id) || allies.has(sourceId(entry.source)))
      return sum
    return sum + xpForCr(resolveStatBlock(creatureRecord(entry.source)?.stats)?.cr)
  }, 0)
  return { budget, standingXp }
}
