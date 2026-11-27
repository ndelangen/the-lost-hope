import { useMemo, useState } from 'react'

import type { PrintedStatBlock } from '#/definitions/stat-block'
import type { DerivedStats, ScaleInputs } from '#/lib/stat-block'
import {
  deriveStatBlock,
  scaleCreature,
  scaledOwnerAbility,
  typicalInputs,
  withOptions,
} from '#/lib/stat-block'

type Field = 'proficiencyBonus' | 'spellAttack' | 'spellSaveDc' | 'owner'

/**
 * The stat block a library page shows: the printed block with the options the DM picked, worked
 * out at the level they chose for a summoned creature or companion.
 */
export function useCreatureBlock(printed: PrintedStatBlock, printedDerived: DerivedStats) {
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
  const owner = scaledOwnerAbility(printed)
  const [level, setLevel] = useState<number | undefined>(undefined)
  const [overrides, setOverrides] = useState<Partial<Record<Field, number>>>({})
  const inputs = useMemo((): ScaleInputs | undefined => {
    if (!scaling) return undefined
    const at = Math.min(scaling.max, Math.max(scaling.min, level ?? scaling.min))
    const typical = typicalInputs(scaling, at)
    return {
      ...typical,
      proficiencyBonus: overrides.proficiencyBonus ?? typical.proficiencyBonus,
      spellAttack: overrides.spellAttack ?? typical.spellAttack,
      spellSaveDc: overrides.spellSaveDc ?? typical.spellSaveDc,
      modifiers:
        owner && overrides.owner !== undefined
          ? { ...typical.modifiers, [owner]: overrides.owner }
          : typical.modifiers,
    }
  }, [scaling, level, overrides, owner])

  const stats = useMemo(() => {
    const withPicked = withOptions(printed, picked)
    return inputs ? scaleCreature(withPicked, inputs) : withPicked
  }, [printed, picked, inputs])
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
    inputs,
    owner,
    // A new level starts from that level's typical owner again.
    setLevel: (next: number) => {
      setLevel(next)
      setOverrides({})
    },
    setInput: (field: Field, value: number) =>
      setOverrides((current) => ({ ...current, [field]: value })),
  }
}
