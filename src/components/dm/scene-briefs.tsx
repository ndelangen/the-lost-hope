import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { DmFaces } from '#/components/dm/dm-faces'
import { DmItemBrief } from '#/components/dm/dm-item-brief'
import { StatBlockSummary } from '#/components/dm/stat-block-summary'
import { ShowToPlayersButton } from '#/components/player-screen/show-to-players-button'
import type { EntityRef } from '#/definitions/kind'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { resolveSourceRef, type SceneBriefs } from '#/lib/dm-campaign'
import { resolvePlayerScreenImage } from '#/lib/player-screen'
import type { PlayerScreenImage } from '#/lib/player-screen-state'

const npcRecords: Readonly<
  Record<string, (typeof SOURCE_REGISTRIES.npc)[keyof typeof SOURCE_REGISTRIES.npc]>
> = SOURCE_REGISTRIES.npc

/**
 * The one place a scene page details its people and secret items: each NPC folded to a face and a
 * name, opened in place when the DM needs them. The script and outcomes only link here.
 */
export function SceneBriefsPanel({ briefs }: { briefs: SceneBriefs }) {
  return (
    <div className="grid gap-4">
      {briefs.cast.length > 0 ? (
        <Group title="NPCs">
          {briefs.cast.map((npc) => (
            <NpcEntry key={npc.key} npc={npc} />
          ))}
        </Group>
      ) : null}
      {briefs.named.length > 0 ? (
        <Group title="Also named">
          {briefs.named.map((npc) => (
            <NpcEntry key={npc.key} npc={npc} />
          ))}
        </Group>
      ) : null}
      {briefs.items.length > 0 ? (
        <Group title="Items with a secret">
          {briefs.items.map((item) => (
            <li key={item.key} className="border-border rounded-lg border p-3">
              <DmItemBrief item={item} />
            </li>
          ))}
        </Group>
      ) : null}
    </div>
  )
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-2">
      <h2 className="text-muted-foreground text-xs font-semibold uppercase">{title}</h2>
      <ul className="grid gap-2">{children}</ul>
    </section>
  )
}

/** One NPC: face, name and the player-screen button, with everything else folded under them. */
function NpcEntry({ npc }: { npc: EntityRef<'npc'> }) {
  const record = Object.hasOwn(npcRecords, npc.key) ? npcRecords[npc.key] : undefined
  const portrait: PlayerScreenImage = { image: 'avatar', ref: npc }
  // The player screen only runs in local dev.
  const canShow = import.meta.env.DEV && resolvePlayerScreenImage(portrait)
  const name = record?.name ?? resolveSourceRef(npc)?.name

  return (
    <li className="border-border grid rounded-lg border">
      <details className="group">
        <summary className="hover:bg-muted flex min-h-12 cursor-pointer list-none items-center gap-3 rounded-lg py-1 pr-1 pl-2 [&::-webkit-details-marker]:hidden">
          <ChevronRight
            className="text-muted-foreground size-4 shrink-0 transition-transform group-open:rotate-90"
            aria-hidden
          />
          <DmFaces people={[npc]} size="sm" />
          <span className="min-w-0 flex-1 font-medium">{name}</span>
          {canShow ? <ShowToPlayersButton selection={portrait} tone="card" compact /> : null}
        </summary>
        {record ? (
          <div className="grid gap-3 px-3 pt-1 pb-3">
            {record.motivations ? (
              <Detail title="Wants">
                <ContentRenderer content={record.motivations} />
              </Detail>
            ) : null}
            {record.notes ? (
              <Detail title="What players can learn">
                <ContentRenderer content={record.notes} />
              </Detail>
            ) : null}
            {record.background ? (
              <Detail title="Background">
                <ContentRenderer content={record.background} />
              </Detail>
            ) : null}
            <Detail title="Stat block">
              <StatBlockSummary stats={record.stats} />
            </Detail>
            <Link
              to="/dm/npcs/$slug"
              params={{ slug: record.slug }}
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Open {record.name}’s DM page
            </Link>
          </div>
        ) : null}
      </details>
    </li>
  )
}

function Detail({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-1">
      <h3 className="text-muted-foreground text-xs font-semibold uppercase">{title}</h3>
      {children}
    </section>
  )
}
