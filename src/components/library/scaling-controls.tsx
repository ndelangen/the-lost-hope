import type { Scaling } from '#/definitions/stat-block'
import type { ScaleInputs } from '#/lib/stat-block'

const ABILITY_NAMES = {
  str: 'Strength',
  dex: 'Dexterity',
  con: 'Constitution',
  int: 'Intelligence',
  wis: 'Wisdom',
  cha: 'Charisma',
} as const

/**
 * The level a summoned creature or companion is worked out at, and its owner's numbers: the
 * spell slot or class level, then what the stat block borrows from whoever summoned or keeps it.
 */
export function ScalingControls({
  scaling,
  inputs,
  owner,
  onLevel,
  onInput,
}: {
  scaling: Scaling
  inputs: ScaleInputs
  /** The owner's ability whose modifier the stat block adds, if it uses one. */
  owner?: keyof typeof ABILITY_NAMES
  onLevel: (level: number) => void
  onInput: (
    field: 'proficiencyBonus' | 'spellAttack' | 'spellSaveDc' | 'owner',
    value: number,
  ) => void
}) {
  const levels = Array.from({ length: scaling.max - scaling.min + 1 }, (_, i) => scaling.min + i)
  const field = (label: string, value: number, onChange: (value: number) => void) => (
    <label className="grid gap-1">
      <span className="text-muted-foreground text-xs">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(event) => {
          if (event.target.value === '') return
          const next = Number(event.target.value)
          if (Number.isFinite(next)) onChange(next)
        }}
        className="bg-background w-20 rounded-md border px-2 py-1"
      />
    </label>
  )
  return (
    <fieldset className="flex flex-wrap items-end gap-3 text-sm">
      <legend className="text-muted-foreground mb-2 font-semibold">
        {scaling.by === 'spell' ? `Cast as ${scaling.of} at` : `${scaling.of} level`}
      </legend>
      <label className="grid gap-1">
        <span className="text-muted-foreground text-xs">
          {scaling.by === 'spell' ? 'Spell level' : 'Class level'}
        </span>
        <select
          value={inputs.level}
          onChange={(event) => onLevel(Number(event.target.value))}
          className="bg-background rounded-md border px-2 py-1"
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>
      {field('Owner’s proficiency bonus', inputs.proficiencyBonus, (value) =>
        onInput('proficiencyBonus', value),
      )}
      {scaling.attackBonus &&
        field('Spell attack', inputs.spellAttack, (value) => onInput('spellAttack', value))}
      {scaling.saveDc &&
        field('Spell save DC', inputs.spellSaveDc, (value) => onInput('spellSaveDc', value))}
      {owner &&
        field(`Owner’s ${ABILITY_NAMES[owner]} modifier`, inputs.modifiers[owner], (value) =>
          onInput('owner', value),
        )}
    </fieldset>
  )
}
