import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { StatBlockSheet } from '#/components/dm/stat-block-sheet'
import type { TypedMonsterPrinting } from '#/lib/monster-printing'
import type { getLibraryEntry } from '#/lib/published-library'

import { CreatureOptionToggles } from './creature-option-toggles'
import { LibraryGallery } from './library-gallery'
import { ScalingControls } from './scaling-controls'
import { useCreatureBlock } from './use-creature-block'

/** A library monster whose printing is typed data: the same stat block the encounter runs. */
export function LibraryTypedCreature({
  entry,
  typed,
  category,
  dm,
  printings,
}: {
  entry: NonNullable<ReturnType<typeof getLibraryEntry>>
  typed: TypedMonsterPrinting
  category: string
  dm: boolean
  printings: ReactNode
}) {
  const { printing, heldBy, reprints } = typed
  const block = useCreatureBlock(printing.stats, typed.derived, typed.owned)
  const { stats, derived } = block
  const gallery = entry.art?.length ? entry.art : undefined
  const classification = [
    `${cap(stats.size)} ${stats.swarmOf ? `swarm of ${cap(stats.swarmOf)} ${cap(stats.type)}s` : cap(stats.type)}${printing.tags ? ` (${printing.tags.join(', ')})` : ''}`,
    printing.alignment,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <article className="grid min-w-0 gap-5 break-words">
      <header className="bg-card overflow-hidden rounded-xl border border-teal-950/20 shadow-sm dark:border-teal-100/20">
        <div
          className={`grid items-start gap-4 p-4 sm:gap-6 sm:p-6 ${gallery ? 'grid-cols-[minmax(0,1fr)_minmax(6.5rem,34%)]' : ''}`}
        >
          <div className="grid min-w-0 content-start gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide">
              <span className="text-teal-800 uppercase dark:text-teal-300">{category}</span>
              <span className="text-muted-foreground">
                {heldBy.name}
                {heldBy.year ? ` (${heldBy.year})` : ''}
              </span>
            </div>
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              {printing.name}
            </h1>
            <p className="text-sm font-medium">{classification}</p>
            {reprints.length > 0 && (
              <p className="text-muted-foreground text-xs">
                Also printed unchanged in{' '}
                {reprints.map(({ name, year }) => (year ? `${name} (${year})` : name)).join(', ')}.
              </p>
            )}
            {printing.appearance && (
              <div className="max-w-prose text-sm leading-relaxed">
                <ContentRenderer content={printing.appearance} />
              </div>
            )}
          </div>
          {gallery && (
            <div className="col-start-2 row-start-1 sm:row-span-2">
              <LibraryGallery key={gallery[0].file} images={gallery} name={entry.name} />
            </div>
          )}
          {printings && (
            <div className="col-span-full sm:col-span-1 sm:col-start-1">{printings}</div>
          )}
        </div>
      </header>
      <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
        {printing.habitats && (
          <>
            <dt className="font-semibold">Habitats</dt>
            <dd>{printing.habitats.join(', ')}</dd>
          </>
        )}
        <dt className="font-semibold">Languages</dt>
        <dd>
          {printing.languages === undefined ? (
            // A gap in our source, not a creature without languages: the DM checks the book.
            <span className="text-amber-700 dark:text-amber-400">Not recorded</span>
          ) : printing.languages.length ? (
            printing.languages.join(', ')
          ) : (
            'None'
          )}
        </dd>
        {printing.page && (
          <>
            <dt className="font-semibold">Page</dt>
            <dd>{printing.page}</dd>
          </>
        )}
      </dl>
      {printing.lore ? (
        <section aria-label="Lore" className="grid max-w-prose gap-2 text-sm">
          <h2 className="text-sm font-semibold">Lore</h2>
          <ContentRenderer content={printing.lore} />
        </section>
      ) : null}
      {dm && printing.tableNotes ? (
        <section aria-label="At the table" className="grid gap-2">
          <h2 className="text-sm font-semibold">At the table</h2>
          <div className="text-muted-foreground max-w-prose text-sm">
            <ContentRenderer content={printing.tableNotes} />
          </div>
          <p className="text-muted-foreground text-xs">Library rulings, not printed in the book.</p>
        </section>
      ) : null}
      {heldBy.notice ? (
        <p className="text-muted-foreground text-xs">
          {heldBy.notice}{' '}
          <Link to="/library/licenses" className="underline">
            Licenses
          </Link>
        </p>
      ) : null}
      {dm ? (
        <section className="bg-card rounded-xl border p-4 sm:p-6">
          {block.scaling && block.owner && (
            <div className="mb-4">
              <ScalingControls
                scaling={block.scaling}
                owner={block.owner}
                reads={block.reads}
                onLevel={block.setLevel}
                onNumber={block.setOwnerNumber}
              />
            </div>
          )}
          {printing.stats.options && (
            <div className="mb-4">
              <CreatureOptionToggles
                options={printing.stats.options}
                picked={block.picked}
                onToggle={block.toggle}
              />
            </div>
          )}
          <StatBlockSheet stats={stats} block={derived} />
        </section>
      ) : null}
    </article>
  )
}

function cap(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
