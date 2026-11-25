import type { ReactNode } from 'react'

import {
  creatureRuleParagraphs,
  isCreatureAbilitySection,
  printedCreatureAbilityKind,
  publishedCreatureSheet,
} from '#/lib/published-creature-sheet'
import type { getLibraryEntry } from '#/lib/published-library'
import type { librarySearch } from '#/lib/published-library-routing'

import { LibraryAbilityCard } from './library-ability-card'
import { LibraryCreatureStatistics } from './library-creature-statistics'
import { LibraryGallery } from './library-gallery'
import { LibraryRuleText } from './library-rule-text'

export function LibraryCreatureSheet({
  entry,
  category,
  search,
  printings,
  sources,
}: {
  entry: NonNullable<ReturnType<typeof getLibraryEntry>>
  category: string
  search: ReturnType<typeof librarySearch>
  printings: ReactNode
  sources: ReactNode
}) {
  const sheet = publishedCreatureSheet(entry.sections)
  const hasFacts =
    sheet.abilities.length > 0 ||
    sheet.otherStats.length > 0 ||
    sheet.defenses.length > 0 ||
    sheet.savingThrows.length > 0
  const gallery = entry.art?.length ? entry.art : undefined
  const version = entry.selected.glossary
  const linked = (line: string, damage?: 'prose' | 'list') => (
    <LibraryRuleText line={line} search={search} version={version} damage={damage} />
  )

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
                {entry.selected.label}
                {entry.selected.edition && ` · ${entry.selected.edition}`}
              </span>
            </div>
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              {entry.selected.variantName ?? entry.name}
            </h1>
            {sheet.classification?.lines.length ? (
              <p className="text-sm font-medium">
                {linked(sheet.classification.lines.join(' · '))}
              </p>
            ) : null}
            {entry.selected.status && (
              <p className="text-muted-foreground text-xs font-medium">{entry.selected.status}</p>
            )}
            {entry.summary && (
              <p className="max-w-prose text-sm leading-relaxed">{linked(entry.summary)}</p>
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
        {sheet.vitals.length > 0 && (
          <dl
            aria-label="Combat statistics"
            className="flex flex-wrap justify-between gap-x-6 gap-y-2 bg-[#193d3d] px-5 py-3 text-white sm:px-6 [&_a]:text-inherit"
          >
            {sheet.vitals.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs font-medium text-teal-100">
                  <LibraryRuleText line={label} search={search} version={version} statistics />
                </dt>
                <dd className="mt-0.5 text-xl font-semibold tabular-nums">{linked(value)}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>
      {(sheet.rules.length > 0 || hasFacts) && (
        <nav
          aria-label="On this sheet"
          className="flex flex-wrap gap-x-5 gap-y-2 border-b pb-3 text-sm font-medium text-teal-800 dark:text-teal-300"
        >
          {sheet.rules.map(({ title }, index) => (
            <a
              key={title + ':' + index}
              href={`#sheet-section-${index}`}
              className="underline-offset-4 hover:underline"
            >
              {title}
            </a>
          ))}
          {hasFacts && (
            <a href="#sheet-statistics" className="underline-offset-4 hover:underline">
              Statistics
            </a>
          )}
          <a href="#sheet-sources" className="underline-offset-4 hover:underline">
            Sources
          </a>
        </nav>
      )}
      {(sheet.rules.length > 0 || hasFacts) && (
        <div
          className={`grid items-start gap-6 ${hasFacts && sheet.rules.length ? 'lg:grid-cols-[minmax(0,1fr)_minmax(13rem,32%)]' : ''}`}
        >
          {sheet.rules.length > 0 && (
            <div className="grid min-w-0 gap-6">
              {sheet.rules.map(({ title, lines }, index) => (
                <section
                  key={title + ':' + index}
                  id={`sheet-section-${index}`}
                  className="grid scroll-mt-20 gap-2"
                >
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">{title}</h2>
                  {[...new Set(lines)]
                    .flatMap((line) => creatureRuleParagraphs(line, entry.abilityDisplay))
                    .map(({ title: ability, text, presentation }, paragraph) =>
                      ability && isCreatureAbilitySection(title) ? (
                        <LibraryAbilityCard
                          key={text + ':' + paragraph}
                          section={title}
                          title={linked(ability)}
                          kind={presentation?.kind ?? printedCreatureAbilityKind(ability, text)}
                          icon={presentation?.icon}
                        >
                          {linked(text, 'prose')}
                        </LibraryAbilityCard>
                      ) : (
                        <p
                          className="text-sm leading-relaxed whitespace-pre-line"
                          key={text + ':' + paragraph}
                        >
                          {ability && <strong className="mr-1">{linked(ability)}</strong>}
                          {linked(text, 'prose')}
                        </p>
                      ),
                    )}
                </section>
              ))}
            </div>
          )}
          {hasFacts && (
            <LibraryCreatureStatistics
              sheet={sheet}
              fifthEdition={version === 'srd-5-1' || version === 'srd-5-2-1'}
              linked={(line, damage) => (
                <LibraryRuleText
                  line={line}
                  search={search}
                  version={version}
                  damage={damage}
                  statistics
                />
              )}
            />
          )}
        </div>
      )}
      {sources}
    </article>
  )
}
