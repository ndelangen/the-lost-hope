import type { Scaling } from '#/definitions/stat-block'
import type { Owner, OwnerNumber } from '#/lib/owned-creature'

const LABELS: Record<OwnerNumber, string> = {
  proficiencyBonus: 'Owner’s proficiency bonus',
  spellAttack: 'Spell attack',
  spellSaveDc: 'Spell save DC',
  str: 'Owner’s Strength modifier',
  dex: 'Owner’s Dexterity modifier',
  con: 'Owner’s Constitution modifier',
  int: 'Owner’s Intelligence modifier',
  wis: 'Owner’s Wisdom modifier',
  cha: 'Owner’s Charisma modifier',
}

/**
 * The level a summoned creature or companion is worked out at, and the owner's numbers its stat
 * block reads: the spell slot or class level, then what it borrows from whoever summoned or keeps it.
 */
export function ScalingControls({
  scaling,
  owner,
  reads,
  onLevel,
  onNumber,
}: {
  scaling: Scaling
  owner: Owner
  reads: readonly OwnerNumber[]
  onLevel: (level: number) => void
  onNumber: (field: OwnerNumber, value: number) => void
}) {
  const levels = Array.from({ length: scaling.max - scaling.min + 1 }, (_, i) => scaling.min + i)
  const valueOf = (field: OwnerNumber) =>
    field === 'proficiencyBonus' || field === 'spellAttack' || field === 'spellSaveDc'
      ? owner[field]
      : owner.modifiers[field]
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
          value={owner.level}
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
      {reads.map((field) => (
        <label key={field} className="grid gap-1">
          <span className="text-muted-foreground text-xs">{LABELS[field]}</span>
          <input
            type="number"
            value={valueOf(field)}
            onChange={(event) => {
              if (event.target.value === '') return
              const next = Number(event.target.value)
              if (Number.isFinite(next)) onNumber(field, next)
            }}
            className="bg-background w-20 rounded-md border px-2 py-1"
          />
        </label>
      ))}
    </fieldset>
  )
}
