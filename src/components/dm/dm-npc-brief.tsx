import { Link } from '@tanstack/react-router'
import { EyeOff } from 'lucide-react'
import type { ReactNode } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { StatBlockSummary } from '#/components/dm/stat-block-summary'
import { Avatar } from '#/components/ui/avatar'
import type { EntityRef } from '#/definitions/kind'
import { refLink } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'

const npcRecords: Readonly<
  Record<string, (typeof SOURCE_REGISTRIES.npc)[keyof typeof SOURCE_REGISTRIES.npc]>
> = SOURCE_REGISTRIES.npc

/** Everything a DM needs to play an NPC on the spot: who they are, what they want, what they say, and their numbers. */
export function DmNpcBrief({ npc }: { npc: EntityRef<'npc'> }) {
  const record = Object.hasOwn(npcRecords, npc.key) ? npcRecords[npc.key] : undefined
  if (!record) return null
  const met = refLink(npc) !== undefined

  return (
    <div className="grid gap-2 text-left">
      <div className="flex items-center gap-3">
        <Avatar src={record.avatar} alt="" sizes="56px" maxWidth={128} className="size-14" />
        <div className="grid min-w-0 gap-0.5">
          <Link
            to="/dm/npcs/$key"
            params={{ key: npc.key }}
            className="text-primary w-fit text-base font-semibold underline-offset-4 hover:underline"
          >
            {record.name}
          </Link>
          <span className="text-muted-foreground flex flex-wrap items-center gap-x-2 text-xs">
            {record.species ? <span>{record.species}</span> : null}
            {met ? null : (
              <span className="inline-flex items-center gap-1">
                <EyeOff aria-hidden className="size-3" /> Not met yet
              </span>
            )}
          </span>
        </div>
      </div>
      {record.notes ? <ContentRenderer content={record.notes} /> : null}
      {record.motivations ? (
        <BriefPart title="Wants">
          <ContentRenderer content={record.motivations} />
        </BriefPart>
      ) : null}
      {record.background ? (
        <BriefPart title="Voice and what they offer">
          <ContentRenderer content={record.background} />
        </BriefPart>
      ) : null}
      <BriefPart title="Stats">
        <StatBlockSummary stats={record.stats} />
      </BriefPart>
    </div>
  )
}

function BriefPart({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-0.5">
      <h4 className="text-muted-foreground text-[0.7rem] font-semibold tracking-wide uppercase">
        {title}
      </h4>
      {children}
    </section>
  )
}
