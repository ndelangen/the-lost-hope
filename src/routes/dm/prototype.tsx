// PROTOTYPE ONLY: three DM dashboard layouts to compare. Pick one, then this file is replaced.
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { BookOpen, Map, Pin, ScrollText, Swords, Users } from 'lucide-react'
import { useState } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { Avatar } from '#/components/ui/avatar'
import { SegmentedControl, SegmentedControlItem } from '#/components/ui/segmented-control'
import type { EntityRef } from '#/definitions/kind'
import { entityHref, refLink, resolveRef, sortedSessions } from '#/lib/campaign'
import { cn } from '#/lib/utils'

import { PARTY_GROUPS, SCENES, type PrototypeScene } from './-prototype-fixtures'

const LAYOUTS = {
  a: 'A · Split party',
  b: 'B · Scene list',
  c: 'C · Scene focus',
} as const
type Layout = keyof typeof LAYOUTS

export const Route = createFileRoute('/dm/prototype')({
  validateSearch: (search: Record<string, unknown>): { layout: Layout } => ({
    layout: search.layout === 'b' || search.layout === 'c' ? search.layout : 'a',
  }),
  head: () => ({ meta: [{ title: 'DM dashboard prototype' }, { name: 'robots', content: 'noindex' }] }),
  component: PrototypeRoute,
})

function PrototypeRoute() {
  const { layout } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-amber-500/60 bg-amber-500/10 px-4 py-2 text-sm">
        <span>Prototype with sample prep. Compare the layouts:</span>
        <SegmentedControl>
          {(Object.keys(LAYOUTS) as Layout[]).map((key) => (
            <SegmentedControlItem
              key={key}
              label={LAYOUTS[key]}
              active={layout === key}
              onClick={() => navigate({ search: { layout: key } })}
              className="px-3 py-1"
            >
              {LAYOUTS[key]}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
      </div>
      {layout === 'a' ? <SplitPartyLayout /> : layout === 'b' ? <SceneListLayout /> : <SceneFocusLayout />}
    </div>
  )
}

/* ---------- shared bits ---------- */

const pinned = SCENES.filter((scene) => scene.pinned)
const likely = SCENES.filter((scene) => !scene.pinned)
const latestSession = sortedSessions()[0]

function avatarOf(ref: EntityRef): string | undefined {
  const data = resolveRef(ref)?.data as { avatar?: string } | undefined
  return data?.avatar
}

function RefLink({ entityRef, className }: { entityRef: EntityRef; className?: string }) {
  const link = refLink(entityRef)
  if (!link) return null
  return (
    <Link to={entityHref(link.kind, link.slug)} className={cn('hover:underline', className)}>
      {link.name}
    </Link>
  )
}

function Faces({ refs, size = 'md' }: { refs: EntityRef[]; size?: 'sm' | 'md' }) {
  return (
    <div className="flex -space-x-2">
      {refs.map((ref) => (
        <Avatar
          key={ref.key}
          src={avatarOf(ref) ?? ''}
          alt={refLink(ref)?.name ?? ''}
          sizes={size === 'sm' ? '28px' : '40px'}
          maxWidth={64}
          className={cn('ring-background ring-2', size === 'sm' ? 'size-7' : 'size-10')}
        />
      ))}
    </div>
  )
}

function QuickLinks({ vertical = false }: { vertical?: boolean }) {
  const items = [
    { to: '/dm/prototype', label: 'Scenes', icon: Swords },
    { to: '/dm/prototype', label: 'Arcs', icon: BookOpen },
    { to: '/pcs', label: 'PCs', icon: Users },
    { to: '/locations/map', label: 'Map', icon: Map },
  ]
  return (
    <nav className={cn('flex gap-2', vertical ? 'flex-col' : 'flex-wrap')}>
      {items.map(({ to, label, icon: Icon }) => (
        <Link
          key={label}
          to={to}
          className="border-border hover:bg-muted flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm"
        >
          <Icon className="size-4" /> {label}
        </Link>
      ))}
      {latestSession ? (
        <Link
          to={entityHref('session', latestSession.slug)}
          className="border-border hover:bg-muted flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm"
        >
          <ScrollText className="size-4" /> Session {latestSession.data.number}
        </Link>
      ) : null}
    </nav>
  )
}

function SceneCard({ scene }: { scene: PrototypeScene }) {
  return (
    <article className="border-border bg-card grid gap-2 rounded-xl border p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold leading-tight">{scene.name}</h3>
        {scene.pinned ? <Pin className="size-4 shrink-0 text-amber-600" aria-label="Pinned" /> : null}
      </div>
      <p className="text-muted-foreground text-xs">
        <RefLink entityRef={scene.location} /> · {scene.arc}
      </p>
      <div className="flex items-center gap-3">
        <Faces refs={[...scene.present, ...scene.npcs]} size="sm" />
      </div>
      <ContentRenderer content={scene.setup} className="text-sm" />
    </article>
  )
}

/* ---------- A: one column per party group ---------- */

function SplitPartyLayout() {
  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-3xl font-bold">Tonight's table</h1>
        <QuickLinks />
      </header>
      <section className="grid gap-3">
        <h2 className="text-muted-foreground flex items-center gap-2 text-xs font-semibold uppercase">
          <Pin className="size-3.5" /> Pinned
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {pinned.map((scene) => (
            <SceneCard key={scene.key} scene={scene} />
          ))}
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {PARTY_GROUPS.map((group) => (
          <div key={group.location.key} className="bg-muted/40 grid content-start gap-3 rounded-xl p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-muted-foreground text-xs uppercase">Party at</p>
                <RefLink entityRef={group.location} className="text-lg font-semibold" />
              </div>
              <Faces refs={group.members} />
            </div>
            {likely
              .filter((scene) => scene.location.key === group.location.key)
              .map((scene) => (
                <SceneCard key={scene.key} scene={scene} />
              ))}
          </div>
        ))}
      </section>
    </div>
  )
}

/* ---------- B: dense list grouped by location, side rail ---------- */

function SceneListLayout() {
  const locations = [...new Set(SCENES.map((scene) => scene.location.key))]
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
      <div className="grid content-start gap-5">
        <h1 className="text-3xl font-bold">Likely scenes</h1>
        {locations.map((locationKey) => {
          const scenes = SCENES.filter((scene) => scene.location.key === locationKey)
          const group = PARTY_GROUPS.find((g) => g.location.key === locationKey)
          return (
            <section key={locationKey} className="grid gap-1">
              <div className="border-border flex items-center justify-between border-b pb-1">
                <RefLink entityRef={scenes[0]!.location} className="font-semibold" />
                {group ? <Faces refs={group.members} size="sm" /> : null}
              </div>
              <ul className="divide-border divide-y">
                {scenes.map((scene) => (
                  <li key={scene.key} className="hover:bg-muted/50 flex items-center gap-3 px-1 py-2">
                    <Pin
                      className={cn('size-4 shrink-0', scene.pinned ? 'text-amber-600' : 'text-muted-foreground/30')}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{scene.name}</p>
                      <p className="text-muted-foreground truncate text-xs">
                        {scene.arc} › {scene.plot}
                      </p>
                    </div>
                    <Faces refs={[...scene.present, ...scene.npcs]} size="sm" />
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
      <aside className="grid content-start gap-4">
        <QuickLinks vertical />
      </aside>
    </div>
  )
}

/* ---------- C: pick a scene on the left, full prep on the right ---------- */

function SceneFocusLayout() {
  const [selected, setSelected] = useState(SCENES[0]!.key)
  const scene = SCENES.find((s) => s.key === selected)!
  return (
    <div className="grid gap-4">
      <QuickLinks />
      <div className="grid gap-4 md:grid-cols-[18rem_1fr]">
        <nav className="grid content-start gap-1">
          {SCENES.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSelected(s.key)}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm',
                s.key === selected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
              )}
            >
              {s.pinned ? <Pin className="size-3.5 shrink-0" /> : <span className="size-3.5 shrink-0" />}
              <span className="min-w-0 flex-1 truncate">{s.name}</span>
            </button>
          ))}
        </nav>
        <article className="border-border bg-card grid content-start gap-4 rounded-xl border p-6">
          <header className="grid gap-1">
            <p className="text-muted-foreground text-xs">
              {scene.arc} › {scene.plot}
            </p>
            <h1 className="text-2xl font-bold">{scene.name}</h1>
            <p className="text-sm">
              at <RefLink entityRef={scene.location} className="font-medium" />
            </p>
          </header>
          <div className="flex flex-wrap gap-3">
            {[...scene.present, ...scene.npcs].map((ref) => (
              <div key={ref.key} className="flex items-center gap-2">
                <Avatar src={avatarOf(ref) ?? ''} alt="" sizes="32px" maxWidth={64} className="size-8" />
                <RefLink entityRef={ref} className="text-sm" />
              </div>
            ))}
          </div>
          <section className="grid gap-1">
            <h2 className="text-muted-foreground text-xs font-semibold uppercase">Setup</h2>
            <ContentRenderer content={scene.setup} />
          </section>
          <section className="grid gap-2">
            <h2 className="text-muted-foreground text-xs font-semibold uppercase">If…</h2>
            <dl className="grid gap-2">
              {scene.outcomes.map((outcome) => (
                <div key={outcome.when} className="bg-muted/50 rounded-md p-3 text-sm">
                  <dt className="font-medium">{outcome.when}</dt>
                  <dd className="text-muted-foreground">{outcome.response}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </div>
    </div>
  )
}
