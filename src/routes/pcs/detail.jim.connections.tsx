import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { EntityReference } from '#/components/entity-reference'
import { Avatar } from '#/components/ui/avatar'
import { refs } from '#/data/generated/refs'
import { bondConnections, type BondPerson } from '#/lib/bond-outcomes'
import { resolveRef, sessionNumber, sessionSlugForEvent } from '#/lib/campaign'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/pcs/detail/jim/connections')({
  head: () => publicPageHeadForPath('/pcs/detail/jim/connections'),
  component: JimConnectionsPage,
})

function JimConnectionsPage() {
  const jim = resolveRef(refs.pcs.jim)
  const pulse = resolveRef(refs.events.n2_e207)
  if (jim?.kind !== 'pc' || pulse?.kind !== 'event' || !pulse.data.bondOutcomes) throw notFound()
  const bonds = pulse.data.bondOutcomes
  const groups = bondConnections(bonds, (ref) => {
    const entity = resolveRef(ref)
    if (!entity || (entity.kind !== 'pc' && entity.kind !== 'npc' && entity.kind !== 'beast'))
      throw notFound()
    return { ref, name: entity.data.name, slug: entity.slug, avatar: entity.data.avatar }
  })
  const effect = resolveRef(groups.effect)
  if (effect?.kind !== 'effect') throw notFound()
  const sessionSlug = sessionSlugForEvent(pulse.slug)

  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        to="/pcs/detail/$slug"
        params={{ slug: jim.slug }}
        className="text-muted-foreground text-sm hover:underline"
      >
        ← Back to {jim.data.name}
      </Link>
      <header className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
        <Avatar
          src={jim.data.avatar}
          alt=""
          sizes="128px"
          maxWidth={256}
          loading="eager"
          className="ring-border size-28 ring-1 sm:size-32"
        />
        <div>
          <p className="text-primary text-xs font-semibold tracking-widest uppercase">
            After the fortress pulse
          </p>
          <h1 className="font-display mt-2 text-4xl font-bold sm:text-5xl">Jim's connections</h1>
          <p className="text-muted-foreground mt-3 max-w-xl text-base leading-relaxed">
            The pulse left memories of Jim intact, but broke some people's emotional attachment to
            him. Jim could feel which connections he lost.
          </p>
          <p className="text-muted-foreground mt-3 text-sm">
            Last confirmed outcomes ·{' '}
            {sessionSlug ? (
              <EntityReference
                kind="session"
                slug={sessionSlug}
                label={`Session ${sessionNumber(sessionSlug)}`}
              />
            ) : null}{' '}
            · Day {pulse.data.day}
          </p>
        </div>
      </header>
      <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
        <ConnectionGroup
          title="Still cares"
          description="Their emotional bond with Jim survived the pulse."
          entries={groups.retained}
          retained
        />
        <ConnectionGroup
          title="Bond broken"
          description="They remember Jim, but the pulse severed their emotional bond."
          entries={groups.severed}
          effectSlug={effect.slug}
        />
      </div>
      <footer className="text-muted-foreground bg-card mt-8 space-y-3 rounded-xl border p-5 text-sm leading-relaxed">
        <p>
          Caring about Jim does not by itself establish loyalty or willingness to help. People
          without a confirmed outcome are not classified here.
        </p>
        <p>Whether and how a severed bond can return remains unknown.</p>
        <p>
          What happened: <EntityReference kind="event" slug={pulse.slug} />
        </p>
      </footer>
    </article>
  )
}

function ConnectionGroup({
  title,
  description,
  entries,
  effectSlug,
  retained = false,
}: {
  title: string
  description: string
  entries: BondPerson[]
  effectSlug?: string
  retained?: boolean
}) {
  return (
    <section className="bg-card overflow-hidden rounded-xl border" aria-label={title}>
      <div className={`border-b px-5 py-5 ${retained ? 'bg-emerald-500/8' : 'bg-amber-500/8'}`}>
        <h2 className="flex items-center justify-between gap-3 text-xl font-semibold">
          {title}
          <span
            className={`rounded-full px-2.5 py-0.5 text-sm ${retained ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'}`}
          >
            {entries.length}
          </span>
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p>
        {effectSlug ? (
          <p className="text-muted-foreground mt-2 text-xs">
            <EntityReference kind="effect" slug={effectSlug} label="View bond effect" />
          </p>
        ) : null}
      </div>
      <ul className="divide-y">
        {entries.map((entry) => (
          <li key={`${entry.ref.ref}:${entry.ref.key}`} className="px-5 py-3">
            <EntityReference
              kind={entry.ref.ref}
              slug={entry.slug}
              unstyled
              wrapperClassName="block"
              className="hover:text-primary flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {() => (
                <>
                  <Avatar src={entry.avatar} sizes="44px" maxWidth={64} className="size-11" />
                  <span className="font-medium">{entry.name}</span>
                </>
              )}
            </EntityReference>
          </li>
        ))}
      </ul>
    </section>
  )
}
