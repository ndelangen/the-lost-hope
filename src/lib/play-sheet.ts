import { REST_RECHARGE } from '#/definitions/stat-block'

import {
  abilityKey,
  adjustHp,
  backUp,
  deathSave,
  liveStats,
  remainingUses,
  setConcentration,
  setExhaustion,
  setStat,
  setUses,
  startDying,
  type CombatantValues,
  type Encounter,
  type StartingStats,
  type UseCount,
} from './encounter'
import type { PlayablePcStats } from './stat-block'

/**
 * A player's play sheet is the encounter of one character: the same live values the DM's tracker
 * keeps for a combatant (HP, uses, conditions, death saves), plus what only a player counts down
 * between fights: spell slots, Hit Point Dice and rests. This module names those resources from
 * the PC's stat block and applies the player-side rules; everything is stored by `./encounter`.
 */

/** Anything the player counts down: spell slots, Hit Point Dice, limited features and pools. */
export type Track = {
  /** Where its uses are stored on the combatant's values. Abilities use their `abilityKey`. */
  key: string
  name: string
  max: number
  group: 'slots' | 'hit-dice' | 'features'
  /** What a short rest gives back: everything, one use, or nothing. A long rest refills all. */
  shortRest: 'all' | 'one' | 'none'
  /** Spent by amount (Lay on Hands) instead of one use at a time. */
  pool: boolean
  /** Hit Point Dice only: the die's faces. */
  die?: number
}

function shortRestOf(recharge: string | undefined): Track['shortRest'] {
  const match = REST_RECHARGE.exec(recharge ?? '')
  if (match?.[1] === 'Short rest') return 'all'
  return match?.[2] ? 'one' : 'none'
}

/** Every resource a PC's stat block gives its player to track, in sheet order. */
export function playTracks(stats: PlayablePcStats): Track[] {
  const slots = (stats.spellSlots ?? []).flatMap((max, index): Track[] =>
    max > 0
      ? [
          {
            key: `slot:${index + 1}`,
            name: `Level ${index + 1}`,
            max,
            group: 'slots',
            shortRest: 'none',
            pool: false,
          },
        ]
      : [],
  )
  const pact: Track[] = stats.pactSlots
    ? [
        {
          key: 'slot:pact',
          name: `Pact Magic, level ${stats.pactSlots.level}`,
          max: stats.pactSlots.count,
          group: 'slots',
          shortRest: 'all',
          pool: false,
        },
      ]
    : []
  const features = stats.abilities.flatMap((ability): Track[] => {
    const max = ability.pool ?? ability.uses
    return max
      ? [
          {
            key: abilityKey(ability.timing, ability.name),
            name: ability.name,
            max,
            group: 'features',
            shortRest: shortRestOf(ability.recharge),
            pool: ability.pool !== undefined,
          },
        ]
      : []
  })
  const hitDice = (stats.hitDice ?? []).map((notation): Track => {
    const [count, die] = notation.split('d').map(Number)
    return {
      key: `hit-die:${die}`,
      name: `d${die}`,
      max: count!,
      group: 'hit-dice',
      shortRest: 'none',
      pool: false,
      die,
    }
  })
  return [...slots, ...pact, ...features, ...hitDice]
}

export function trackCount(track: Track, values: CombatantValues | undefined): UseCount {
  return remainingUses(track.max, values, track.key)!
}

/** Spend (positive) or regain (negative) some of a track, within what it holds. */
export function spendTrack(encounter: Encounter, id: string, track: Track, amount = 1): Encounter {
  const { uses, maxUses } = trackCount(track, encounter.values[id])
  return setUses(encounter, id, track.key, 'uses', Math.max(0, Math.min(maxUses, uses - amount)))
}

/**
 * The player takes damage. Dropping to 0 HP starts death saves and ends concentration; damage while
 * already dying is a failed death save.
 */
export function takeDamage(
  encounter: Encounter,
  id: string,
  start: StartingStats,
  amount: number,
): Encounter {
  if (amount <= 0) return encounter
  if (encounter.values[id]?.dying) return deathSave(encounter, id, 'failure')
  const hurt = adjustHp(encounter, id, start, -amount)
  const wasUp = liveStats(start, encounter.values[id]).hp !== 0
  if (!wasUp || liveStats(start, hurt.values[id]).hp !== 0) return hurt
  // At 0 HP the character is Unconscious, which ends concentration.
  return startDying(setConcentration(hurt, id, undefined), id)
}

/**
 * The player corrects a number by hand. Setting HP to 0 starts death saves and raising it from 0
 * ends them, the same as damage and healing do.
 */
export function setPlayStat(
  encounter: Encounter,
  id: string,
  field: 'hp' | 'maxHp' | 'ac',
  value: number,
): Encounter {
  const set = setStat(encounter, id, field, value)
  if (field !== 'hp' || set === encounter) return set
  if (value > 0) return backUp(set, id)
  const { dying, stable, dead } = set.values[id] ?? {}
  return dying || stable || dead ? set : startDying(set, id)
}

/** Any healing brings a character at 0 HP back up and ends the death saves. */
export function heal(
  encounter: Encounter,
  id: string,
  start: StartingStats,
  amount: number,
): Encounter {
  if (amount <= 0) return encounter
  return adjustHp(backUp(encounter, id), id, start, amount)
}

/** Spend one Hit Point Die on a short rest: the player rolls it and enters the total healed. */
export function spendHitDie(
  encounter: Encounter,
  id: string,
  start: StartingStats,
  track: Track,
  healed: number,
): Encounter {
  if (trackCount(track, encounter.values[id]).uses === 0) return encounter
  return heal(spendTrack(encounter, id, track), id, start, healed)
}

/** A short rest refills what the sheet says comes back on one. Hit Point Dice are spent by hand. */
export function shortRest(encounter: Encounter, id: string, tracks: readonly Track[]): Encounter {
  return tracks.reduce((current, track) => {
    if (track.shortRest === 'none') return current
    const { uses, maxUses } = trackCount(track, current.values[id])
    const next = track.shortRest === 'all' ? maxUses : Math.min(maxUses, uses + 1)
    return next === uses ? current : setUses(current, id, track.key, 'uses', next)
  }, encounter)
}

/**
 * A long rest restores all hit points, slots, features and Hit Point Dice, ends temporary hit
 * points, concentration and death saves, and lowers exhaustion by one. Conditions and any maximum
 * the player corrected by hand stay.
 */
export function longRest(encounter: Encounter, id: string): Encounter {
  const {
    hp: _hp,
    temp: _temp,
    uses: _uses,
    dying: _dying,
    stable: _stable,
    concentration: _concentration,
    ...kept
  } = encounter.values[id] ?? {}
  const rested = { ...encounter, values: { ...encounter.values, [id]: kept } }
  return setExhaustion(rested, id, (kept.exhaustion ?? 0) - 1)
}
