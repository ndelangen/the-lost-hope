import type { ReactNode } from 'react'

import { ABILITY_ICONS } from '#/lib/ability-icons'
import { ABILITY_KIND } from '#/lib/ability-kind-presentation'
import { RULE_ICONS } from '#/lib/rule-icons'
import type { AbilityKind } from '#/lib/stat-block'

const styles = {
  ...ABILITY_KIND,
  save: {
    label: ABILITY_KIND.save.label,
    tone: 'text-orange-700 dark:text-orange-400 border-orange-500/40 bg-orange-500/10',
    edge: 'border-l-orange-500',
  },
  other: {
    label: ABILITY_KIND.other.label,
    tone: 'text-slate-700 dark:text-slate-300 border-slate-500/40 bg-slate-500/10',
    edge: 'border-l-slate-500',
  },
}
const icons = { ...ABILITY_ICONS, ...RULE_ICONS }

const sectionIcons: Readonly<Record<string, string>> = {
  reactions: 'lucide/Shield',
  traits: 'gi/GiPaw',
  'legendary actions': 'gi/GiSpikedHalo',
  'lair actions': 'gi/GiWaterSplash',
  'regional effects': 'gi/GiEchoRipples',
  spellcasting: 'gi/GiWizardStaff',
}

export function LibraryAbilityCard({
  section,
  title,
  kind,
  icon,
  children,
}: {
  section: string
  title: ReactNode
  kind?: AbilityKind
  icon?: string
  children: ReactNode
}) {
  const style = styles[kind ?? 'other']
  const iconId = icon ?? sectionIcons[section.toLowerCase()]
  const Icon = (iconId && icons[iconId as keyof typeof icons]) || ABILITY_ICONS['gi/GiBroadsword']

  return (
    <div
      className={`bg-card flex items-start gap-3 rounded-md border border-l-4 p-3 ${style.edge}`}
    >
      <span
        className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-md border ${style.tone}`}
      >
        <Icon aria-hidden className="size-5" />
      </span>
      <div className="min-w-0 text-sm leading-relaxed">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <strong>{title}</strong>
          {kind && (
            <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${style.tone}`}>
              {style.label}
            </span>
          )}
        </div>
        <p className="whitespace-pre-line">{children}</p>
      </div>
    </div>
  )
}
