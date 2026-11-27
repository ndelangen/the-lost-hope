import { Check } from 'lucide-react'

/** Toggles for the optional abilities a book prints for a creature, such as Summoner. */
export function CreatureOptionToggles({
  options,
  picked,
  onToggle,
}: {
  options: readonly { key: string; name: string }[]
  picked: readonly string[]
  onToggle: (key: string) => void
}) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2 text-sm">
      <legend className="text-muted-foreground float-left mr-1 font-semibold">Options</legend>
      {options.map((option) => {
        const on = picked.includes(option.key)
        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(option.key)}
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 ${on ? 'border-teal-700 bg-teal-700 text-white dark:border-teal-300 dark:bg-teal-300 dark:text-teal-950' : 'hover:bg-muted'}`}
          >
            {on && <Check aria-hidden className="size-3.5" />}
            {option.name}
          </button>
        )
      })}
    </fieldset>
  )
}
