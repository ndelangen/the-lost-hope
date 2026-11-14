import { X } from 'lucide-react'

import { EffectText } from '#/components/effect-text'
import { EntityReference } from '#/components/entity-reference'
import type { Reminder } from '#/lib/effect-reminders'

import { IconButton } from './icon-button'

/** Reminders that campaign effects ask for as the encounter begins. */
export function EncounterStartReminders({
  reminders,
  onDismiss,
}: {
  reminders: readonly Reminder[]
  onDismiss: () => void
}) {
  if (reminders.length === 0) return null
  return (
    <output className="grid gap-2 rounded-xl bg-indigo-50 p-3 dark:bg-indigo-950/30">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">As the encounter starts</p>
        <IconButton label="Dismiss start-of-encounter reminders" tone="ghost" onClick={onDismiss}>
          <X aria-hidden />
        </IconButton>
      </div>
      <ul className="grid gap-2">
        {reminders.map((reminder) => (
          <li key={reminder.id} className="bg-card flex items-start gap-3 rounded-lg p-3">
            <div className="grid min-w-0 gap-1">
              <p className="text-sm">
                <EntityReference
                  kind="effect"
                  slug={reminder.effect.slug}
                  label={reminder.effect.name}
                />
                <span className="text-muted-foreground"> · {reminder.effect.carrier}</span>
              </p>
              <EffectText text={reminder.text} />
            </div>
          </li>
        ))}
      </ul>
    </output>
  )
}
