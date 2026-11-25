import type { ReactNode } from 'react'
import { GiAcrobatic, GiArm, GiBrain, GiConversation, GiHeartBeats, GiOwl } from 'react-icons/gi'

import { HoverPreview } from '#/components/ui/hover-preview'
import { explainHitDice, type publishedCreatureSheet } from '#/lib/published-creature-sheet'
import { modifier, signed } from '#/lib/stat-block'

const heading = 'font-serif text-2xl font-semibold tracking-tight'
const anchor = 'scroll-mt-20'
const factLabel = 'text-xs font-semibold text-muted-foreground'
const statGrid = 'bg-border grid gap-px overflow-hidden rounded-md border'
const statCell = 'bg-card grid min-w-0 content-center gap-0.5 px-1 py-2 text-center'
const statLabel = 'flex flex-wrap items-center justify-center gap-x-1 text-xs font-semibold'
const statValue = 'flex items-baseline justify-center gap-1 text-lg font-semibold tabular-nums'

const scoreIcons: Record<string, typeof GiBrain> = {
  str: GiArm,
  dex: GiAcrobatic,
  con: GiHeartBeats,
  int: GiBrain,
  wis: GiOwl,
  cha: GiConversation,
}

export function LibraryCreatureStatistics({
  sheet,
  fifthEdition,
  linked,
}: {
  sheet: ReturnType<typeof publishedCreatureSheet>
  fifthEdition: boolean
  linked: (text: string, damage?: 'list' | 'prose') => ReactNode
}) {
  return (
    <section
      id="sheet-statistics"
      className={`bg-muted/40 grid min-w-0 gap-4 rounded-lg border p-4 ${anchor}`}
    >
      <h2 className={heading}>Statistics</h2>
      {sheet.abilities.length > 0 ? (
        <dl aria-label="Ability scores" className={statGrid + ' grid-cols-3'}>
          {sheet.abilities.map(([label, value]) => {
            const Icon = scoreIcons[label.slice(0, 3).toLowerCase()]
            return (
              <div key={label} className={statCell}>
                <dt className={statLabel + ' uppercase'}>
                  {Icon && (
                    <Icon aria-hidden="true" className="size-4 text-teal-800 dark:text-teal-300" />
                  )}
                  {linked(label)}
                </dt>
                <dd className={statValue}>
                  {linked(value)}
                  {fifthEdition && /^\d+$/.test(value) ? (
                    <span
                      aria-label={`modifier ${signed(modifier(Number(value)))}`}
                      className="text-muted-foreground text-xs font-medium"
                    >
                      {signed(modifier(Number(value)))}
                    </span>
                  ) : null}
                </dd>
              </div>
            )
          })}
        </dl>
      ) : null}
      {sheet.savingThrows.length > 0 && (
        <section aria-labelledby="sheet-saving-throws" className="grid gap-2">
          <h3 id="sheet-saving-throws" className="text-sm font-semibold">
            {linked('Saving throws')}
          </h3>
          <dl className={statGrid + ' grid-cols-2'}>
            {sheet.savingThrows.map((save) => {
              const Icon = scoreIcons[save.icon]
              return (
                <div key={save.name} className={statCell + ' last:odd:col-span-2'}>
                  <dt className={statLabel}>
                    <Icon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-orange-700 dark:text-orange-400"
                    />
                    {linked(save.name)}
                  </dt>
                  <dd className={statValue}>
                    <span className="text-muted-foreground text-xs font-normal">d20 </span>
                    {signed(save.modifier)}
                  </dd>
                </div>
              )
            })}
          </dl>
        </section>
      )}
      <dl className="grid gap-2 text-sm">
        {sheet.otherStats.map(([label, value]) => (
          <div
            key={label}
            className="flex flex-wrap items-baseline justify-between gap-x-3 border-b pb-1"
          >
            <dt className={factLabel}>
              {label.toLowerCase() === 'hit dice' ? (
                <>
                  <HoverPreview
                    interactive
                    content={explainHitDice(
                      value,
                      sheet.vitals.find(([key]) => key === 'Hit points')?.[1],
                    )}
                  >
                    <button
                      type="button"
                      aria-label="Explain hit dice"
                      className="cursor-help rounded-sm underline decoration-dotted underline-offset-4 focus-visible:ring-2"
                    >
                      {label}
                    </button>
                  </HoverPreview>
                </>
              ) : (
                linked(label)
              )}
            </dt>
            <dd>{linked(value)}</dd>
          </div>
        ))}
        {sheet.defenses.map((section) => (
          <div key={section.title}>
            <dt className={factLabel}>{linked(section.title)}</dt>
            <dd>
              {section.lines.map((line, i) => (
                <span key={line}>
                  {i > 0 && ' · '}
                  {linked(
                    line,
                    /^damage (?:resistances|immunities|vulnerabilities)$/i.test(section.title)
                      ? 'list'
                      : 'prose',
                  )}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
