import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { publicationOf } from '#/lib/library-monsters'
import { spellLevelLabel, spells } from '#/lib/library-spells'

export const Route = createFileRoute('/library/spells/$key')({
  beforeLoad: ({ params }) => {
    const spell = spells[params.key]
    if (!spell) throw notFound()
    return { spell }
  },
  head: ({ match }) => ({
    meta: [{ title: (match.context.spell?.name ?? 'Spell') + ' | The Lost Hope Library' }],
  }),
  component: SpellPage,
})

function SpellPage() {
  const { spell } = Route.useRouteContext()
  const publication = publicationOf(spell.publication)
  const facts = [
    ['Casting time', spell.castingTime],
    ['Range', spell.range],
    ['Components', spell.components],
    ['Duration', spell.duration],
    ['Classes', spell.classes.join(', ')],
  ] as const
  return (
    <article className="grid max-w-3xl min-w-0 gap-5">
      <Link
        to="/library/spells"
        className="text-muted-foreground hover:text-foreground inline-flex w-fit items-center gap-2 text-sm"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> All spells
      </Link>
      <header className="grid gap-1">
        <p className="text-sm font-semibold tracking-wide text-teal-800 uppercase dark:text-teal-300">
          {spellLevelLabel(spell)}
        </p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">{spell.name}</h1>
        <p className="text-muted-foreground text-sm">
          {publication.name}
          {publication.year ? ` (${publication.year})` : ''}
        </p>
      </header>
      <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[auto_1fr]">
        {facts.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="font-semibold">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <ContentRenderer content={spell.text} />
      {publication.notice ? (
        <p className="text-muted-foreground border-border border-t pt-3 text-xs">
          {publication.notice}{' '}
          <Link to="/library/licenses" className="underline">
            Licenses
          </Link>
        </p>
      ) : null}
    </article>
  )
}
