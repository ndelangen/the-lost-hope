import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { Copy, Plus, Swords, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { z } from 'zod'

import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { IconButton } from '#/components/dm/encounter/icon-button'
import { newEncounterId, useEncounterStore } from '#/components/dm/encounter/use-encounter-store'
import { Input } from '#/components/ui/input'
import { resolveScene, scenes } from '#/lib/dm-campaign'
import { sceneRoster } from '#/lib/dm-encounter'
import {
  createEncounter,
  deleteEncounter,
  duplicateEncounter,
  encounterForScene,
  renameEncounter,
} from '#/lib/encounter'

const Search = z.strictObject({
  /** Open this scene's encounter, preparing one from its NPCs if there is none yet. */
  scene: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/dm/encounter/')({
  validateSearch: Search,
  head: () => ({
    meta: [{ title: 'Encounters | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: EncountersRoute,
})

function EncountersRoute() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const [store, update] = useEncounterStore()
  const [name, setName] = useState('')

  // Arriving from a scene: open its encounter, or prepare one linked to it.
  useEffect(() => {
    if (!store || !search.scene) return
    const entry = Object.entries(scenes).find(([, scene]) => scene.slug === search.scene)
    if (!entry) return void navigate({ search: {}, replace: true })
    const [key, scene] = entry
    const ref = { ref: 'scene' as const, key }
    const existing = encounterForScene(store, ref)
    const id = existing?.id ?? newEncounterId()
    if (!existing)
      update((current) =>
        createEncounter(current, { id, name: scene.name, scene: ref, build: sceneRoster(scene) }),
      )
    void navigate({ to: '/dm/encounter/$id', params: { id }, search: {}, replace: true })
  }, [store, search.scene, navigate, update])

  if (!store || search.scene) {
    return <p className="text-muted-foreground">Loading encounters…</p>
  }

  const create = () => {
    const id = newEncounterId()
    update((current) =>
      createEncounter(current, {
        id,
        name: name || `Encounter ${current.encounters.length + 1}`,
      }),
    )
    setName('')
    void navigate({ to: '/dm/encounter/$id', params: { id } })
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-4">
        <h1 className="text-3xl font-bold">Encounters</h1>

        <form
          className="flex max-w-xl gap-3"
          onSubmit={(event) => {
            event.preventDefault()
            create()
          }}
        >
          <label htmlFor="new-encounter" className="sr-only">
            New encounter name
          </label>
          <Input
            id="new-encounter"
            placeholder="New encounter name"
            className="h-10"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-10 shrink-0 items-center gap-2 rounded-lg px-4 text-sm font-semibold"
          >
            <Plus aria-hidden className="size-4" /> Prepare
          </button>
        </form>

        {store.encounters.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No encounters yet. Prepare one here or use Run encounter on a scene.
          </p>
        ) : (
          <ul className="grid gap-2">
            {store.encounters.map((encounter) => {
              const scene = encounter.scene ? resolveScene(encounter.scene) : undefined
              const started = encounter.round > 1 || encounter.active !== encounter.roster[0]?.id
              return (
                <li
                  key={encounter.id}
                  className="border-border bg-card flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3"
                >
                  <div className="grid min-w-48 grow gap-1">
                    <label className="sr-only" htmlFor={`name-${encounter.id}`}>
                      Rename {encounter.name}
                    </label>
                    <input
                      id={`name-${encounter.id}`}
                      defaultValue={encounter.name}
                      onBlur={(event) => {
                        const value = event.currentTarget.value
                        update((current) => renameEncounter(current, encounter.id, value))
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') event.currentTarget.blur()
                      }}
                      className="hover:border-border focus:border-input -mx-2 rounded-md border border-transparent bg-transparent px-2 py-0.5 text-base font-semibold outline-none"
                    />
                    <p className="text-muted-foreground text-sm">
                      {encounter.roster.length} combatants
                      {started ? ` · Round ${encounter.round}` : ''}
                      {scene ? (
                        <>
                          {' · '}
                          <Link
                            to="/dm/scenes/$slug"
                            params={{ slug: scene.slug }}
                            className="hover:underline"
                          >
                            {scene.name}
                          </Link>
                        </>
                      ) : null}
                    </p>
                  </div>
                  <Link
                    to="/dm/encounter/$id"
                    params={{ id: encounter.id }}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center gap-2 rounded-lg px-4 text-sm font-semibold"
                  >
                    <Swords aria-hidden className="size-4" /> {started ? 'Resume' : 'Run'}
                  </Link>
                  <IconButton
                    label={`Duplicate ${encounter.name}`}
                    onClick={() =>
                      update((current) =>
                        duplicateEncounter(current, encounter.id, newEncounterId()),
                      )
                    }
                  >
                    <Copy aria-hidden />
                  </IconButton>
                  <IconButton
                    label={`Delete ${encounter.name}`}
                    tone="danger"
                    onClick={() => {
                      if (window.confirm(`Delete “${encounter.name}”? Combatant HP stays saved.`))
                        update((current) => deleteEncounter(current, encounter.id))
                    }}
                  >
                    <Trash2 aria-hidden />
                  </IconButton>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <aside className="min-w-0">
        <DmQuickLinks stackAt="xl" />
      </aside>
    </div>
  )
}
