import { createFileRoute, notFound } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { DmFaces } from '#/components/dm/dm-faces'
import { DmHiddenReference } from '#/components/dm/dm-hidden-reference'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { EntityReference } from '#/components/entity-reference'
import { RuleTerm } from '#/components/rule-term'
import { refs } from '#/data/generated/refs'
import { refLink } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { creatures, resolveSourceRef, resolveStatBlock } from '#/lib/dm-campaign'
import { ruleOf, ruleRef } from '#/lib/rules'
import { deriveStatBlock } from '#/lib/stat-block'

const npcs: Readonly<
  Record<string, (typeof SOURCE_REGISTRIES.npc)[keyof typeof SOURCE_REGISTRIES.npc]>
> = SOURCE_REGISTRIES.npc

/** The portrait job only exists in local dev; the static build drops this import. */
const PortraitStatus = import.meta.env.DEV
  ? lazy(() =>
      import('#/components/dm/npc-portrait-status').then((module) => ({
        default: module.NpcPortraitStatus,
      })),
    )
  : undefined

export const Route = createFileRoute('/dm/npcs/$key')({
  loader: ({ params }) => {
    if (!Object.hasOwn(npcs, params.key)) throw notFound()
    return { key: params.key }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData ? npcs[loaderData.key]?.name : 'NPC'} | DM` },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: DmNpcRoute,
})

function DmNpcRoute() {
  const { key } = Route.useLoaderData()
  const npc = npcs[key]!
  const stats = resolveStatBlock(npc.stats)
  const block = stats ? deriveStatBlock(stats) : undefined
  const location = npc.location ? resolveSourceRef(npc.location) : undefined
  const shared = 'ref' in npc.stats ? creatures[npc.stats.key] : undefined

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <article className="border-border bg-card grid min-w-0 content-start gap-5 rounded-xl border p-6">
        <header className="flex items-start gap-4">
          <DmFaces people={[{ ref: 'npc', key }]} size="md" />
          <div className="grid gap-1">
            <p className="text-muted-foreground text-xs font-semibold uppercase">NPC · DM view</p>
            <h1 className="text-2xl font-bold">{npc.name}</h1>
            <p className="text-muted-foreground text-sm">
              {[npc.species, npc.languages?.join(', ')].filter(Boolean).join(' · ')}
              {npc.location && location ? (
                <>
                  {' · '}
                  {refLink(npc.location) ? (
                    <EntityReference kind="location" slug={location.slug} />
                  ) : (
                    <DmHiddenReference reference={npc.location} />
                  )}
                </>
              ) : null}
            </p>
          </div>
        </header>

        {PortraitStatus ? (
          <Suspense fallback={null}>
            <PortraitStatus npcKey={key} />
          </Suspense>
        ) : null}

        <Section title="What players can learn">
          {npc.notes ? <ContentRenderer content={npc.notes} /> : <Empty />}
        </Section>
        <Section title="Motivations">
          {npc.motivations ? <ContentRenderer content={npc.motivations} /> : <Empty />}
        </Section>
        <Section title="Background">
          {npc.background ? <ContentRenderer content={npc.background} /> : <Empty />}
        </Section>
        {stats && block ? (
          <Section title="Stat block">
            <p className="text-sm">
              {shared ? `${shared.name} · ` : ''}
              <RuleTerm rule={ruleRef(stats.size)} />{' '}
              <RuleTerm rule={ruleRef(stats.type)}>
                {ruleOf(ruleRef(stats.type)).name.toLowerCase()}
              </RuleTerm>{' '}
              · <RuleTerm rule={refs.rules.challenge_rating} /> {stats.cr} ·{' '}
              <RuleTerm rule={refs.rules.armor_class} /> {stats.ac} · {block.hitPoints}{' '}
              <RuleTerm rule={refs.rules.hit_points} />
            </p>
          </Section>
        ) : null}
      </article>
      <aside className="min-w-0">
        <DmQuickLinks />
      </aside>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-2">
      <h2 className="text-muted-foreground text-xs font-semibold uppercase">{title}</h2>
      {children}
    </section>
  )
}

function Empty() {
  return <p className="text-muted-foreground text-sm">Nothing recorded.</p>
}
