import { BookOpen, X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'

import {
  ADVANTAGE_SOURCES,
  COVER,
  DIFFICULTY_CLASSES,
  FALLING,
  IMPROVISED_DAMAGE,
  STANDARD_ACTIONS,
  TURN_PARTS,
} from '#/definitions/rules-glossary'

import { IconButton } from './icon-button'

/**
 * A beginner DM screen that slides over the stat panel side in combat focus, leaving the
 * initiative list in view. Everything comes from the rules glossary.
 */
export function DmScreen({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Move focus into the drawer without popping the close button's tooltip.
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (open) headingRef.current?.focus()
  }, [open])
  if (!open) return null

  return (
    <aside
      aria-labelledby="dm-screen-heading"
      className="border-border bg-background fixed inset-y-0 right-0 z-40 flex w-[min(30rem,100vw)] flex-col border-l-2 shadow-2xl md:w-[min(30rem,calc(100vw-17rem))]"
    >
      <header className="border-border flex items-center justify-between gap-3 border-b px-5 py-3">
        <h2
          id="dm-screen-heading"
          ref={headingRef}
          tabIndex={-1}
          className="flex items-center gap-2 text-xl font-bold outline-none"
        >
          <BookOpen aria-hidden className="size-6" /> DM screen
        </h2>
        <IconButton label="Close the DM screen (Esc)" onClick={onClose}>
          <X aria-hidden />
        </IconButton>
      </header>
      <div className="grid content-start gap-6 overflow-y-auto px-5 py-4">
        <Section title="On its turn">
          <Lines items={TURN_PARTS.map(({ label, note }) => [label, note])} />
        </Section>

        <Section title="Actions">
          <Lines items={Object.values(STANDARD_ACTIONS).map(({ label, note }) => [label, note])} />
        </Section>

        <Section title="Advantage">
          <Bullets items={ADVANTAGE_SOURCES.advantage} />
          <h4 className="text-muted-foreground mt-2 text-xs font-semibold uppercase">
            Disadvantage
          </h4>
          <Bullets items={ADVANTAGE_SOURCES.disadvantage} />
          <p className="text-muted-foreground text-sm">{ADVANTAGE_SOURCES.note}</p>
        </Section>

        <Section title="Cover">
          <Lines items={COVER.map(({ label, note }) => [label, note])} />
        </Section>

        <Section title="Difficulty">
          <dl className="grid grid-cols-3 gap-1.5">
            {DIFFICULTY_CLASSES.map(({ dc, label }) => (
              <div key={dc} className="bg-muted/60 rounded-lg px-2 py-1.5">
                <dt className="text-lg font-bold tabular-nums">DC {dc}</dt>
                <dd className="text-muted-foreground text-xs">{label}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Improvised damage">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground text-left text-xs">
                <th scope="col" className="py-1 font-medium">
                  Severity
                </th>
                {IMPROVISED_DAMAGE.levels.map((level) => (
                  <th key={level} scope="col" className="py-1 text-right font-medium">
                    {level.replace('Levels ', '')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {IMPROVISED_DAMAGE.rows.map((row) => (
                <tr key={row.label} className="border-border border-t">
                  <th scope="row" className="py-1.5 text-left font-semibold">
                    {row.label}
                  </th>
                  {row.dice.map((dice, index) => (
                    <td
                      key={IMPROVISED_DAMAGE.levels[index]}
                      className="py-1.5 text-right tabular-nums"
                    >
                      {dice}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-muted-foreground text-xs">Columns are party levels.</p>
        </Section>

        <Section title="Falling">
          <Lines items={FALLING.map(({ label, note }) => [label, note])} />
        </Section>
      </div>
    </aside>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-2">
      <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        {title}
      </h3>
      {children}
    </section>
  )
}

function Lines({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <dl className="grid gap-1.5">
      {items.map(([label, note]) => (
        <div key={label} className="grid grid-cols-[8rem_minmax(0,1fr)] items-baseline gap-3">
          <dt className="font-semibold first-letter:uppercase">{label}</dt>
          <dd className="text-sm leading-snug">{note}</dd>
        </div>
      ))}
    </dl>
  )
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid list-disc gap-1 pl-5 text-sm leading-snug">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
