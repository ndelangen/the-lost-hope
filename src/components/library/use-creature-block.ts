import { useMemo, useState } from 'react'

import type { PrintedStatBlock } from '#/definitions/stat-block'
import type { MonsterOwner } from '#/lib/monster-printing'
import {
  ownedStats,
  ownerNumbersRead,
  typicalOwner,
  type Owner,
  type OwnerNumber,
} from '#/lib/owned-creature'
import { ownedCreatureOf } from '#/lib/owned-creatures'
import type { DerivedStats } from '#/lib/stat-block'
import { deriveStatBlock, withOptions } from '#/lib/stat-block'

/**
 * The stat block a library page shows: the printed block at the level and owner the DM chose for
 * a summoned creature or companion, with the options they picked.
 */
export function useCreatureBlock(
  printed: PrintedStatBlock,
  printedDerived: DerivedStats,
  owned: MonsterOwner | undefined,
) {
  const options = printed.options
  const firstForm = options?.find((option) => option.form)?.key
  const [chosen, setChosen] = useState<readonly string[] | undefined>(undefined)
  // Picks only count for options this printing has, so moving to another creature starts clean;
  // a creature that takes one of several forms starts in the first.
  const picked = useMemo(() => {
    const valid = (chosen ?? []).filter((key) => options?.some((option) => option.key === key))
    return chosen === undefined || (firstForm && !valid.some((key) => isForm(key)))
      ? [...valid, ...(firstForm ? [firstForm] : [])]
      : valid
    function isForm(key: string) {
      return options?.some((option) => option.key === key && option.form)
    }
  }, [chosen, options, firstForm])

  const scaling = printed.scaling
  const creature = owned ? ownedCreatureOf(owned.publication, owned.monster) : undefined
  const [level, setLevel] = useState<number | undefined>(undefined)
  const [overrides, setOverrides] = useState<Partial<Record<OwnerNumber, number>>>({})
  const owner = useMemo((): Owner | undefined => {
    if (!scaling) return undefined
    const typical = typicalOwner(
      scaling,
      Math.min(scaling.max, Math.max(scaling.min, level ?? scaling.min)),
    )
    const { proficiencyBonus, spellAttack, spellSaveDc, ...modifiers } = overrides
    return {
      ...typical,
      proficiencyBonus: proficiencyBonus ?? typical.proficiencyBonus,
      spellAttack: spellAttack ?? typical.spellAttack,
      spellSaveDc: spellSaveDc ?? typical.spellSaveDc,
      modifiers: { ...typical.modifiers, ...modifiers },
    }
  }, [scaling, level, overrides])

  // The creature works itself out from its owner first; the options it prints join after.
  const stats = useMemo(
    () =>
      creature && owner
        ? ownedStats(creature, printed, owner, picked)
        : withOptions(printed, picked),
    [printed, creature, owner, picked],
  )
  const reads = useMemo(
    () => (creature && scaling ? ownerNumbersRead(creature, printed, scaling, picked) : []),
    [creature, printed, scaling, picked],
  )
  const derived = useMemo(
    () => (stats === printed ? printedDerived : deriveStatBlock(stats)),
    [stats, printed, printedDerived],
  )

  const toggle = (key: string) => {
    const form = options?.find((option) => option.key === key)?.form
    setChosen(
      picked.includes(key)
        ? // A form is swapped for another, never left empty.
          form
          ? picked
          : picked.filter((other) => other !== key)
        : form
          ? [
              ...picked.filter((other) => !options?.find((option) => option.key === other)?.form),
              key,
            ]
          : [...picked, key],
    )
  }

  return {
    stats,
    derived,
    picked,
    toggle,
    scaling,
    owner,
    reads,
    // A new level starts from that level's typical owner again.
    setLevel: (next: number) => {
      setLevel(next)
      setOverrides({})
    },
    setOwnerNumber: (field: OwnerNumber, value: number) =>
      setOverrides((current) => ({ ...current, [field]: value })),
  }
}
