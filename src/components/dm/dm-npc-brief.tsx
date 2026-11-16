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
    <div className="grid gap-2 text-left text-sm">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Avatar src={record.avatar} alt="" sizes="40px" maxWidth={64} className="size-10" />
        <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2">
          <Link
            to="/dm/npcs/$key"
            params={{ key: npc.key }}
            className="text-primary font-semibold underline-offset-4 hover:underline"
          >
            {record.name}
          </Link>
          <span className="text-muted-foreground inline-flex items-center gap-2 text-xs">
            {record.species ? <span>{record.species}</span> : null}
            {met ? null : (
              <span className="inline-flex items-center gap-1">
                <EyeOff aria-hidden className="size-3" /> Not met yet
              </span>
            )}
          </span>
        </div>
        <div className="text-muted-foreground [&_p]:text-xs">
          <StatBlockSummary stats={record.stats} />
        </div>
      </div>
      <dl className="grid gap-x-3 gap-y-1.5 sm:grid-cols-[5.5rem_minmax(0,1fr)]">
        {record.notes ? (
          <BriefPart title="Who">
            <ContentRenderer content={record.notes} />
          </BriefPart>
        ) : null}
        {record.motivations ? (
          <BriefPart title="Wants">
            <ContentRenderer content={record.motivations} />
          </BriefPart>
        ) : null}
        {record.background ? (
          <BriefPart title="Voice, offer">
            <ContentRenderer content={record.background} className="gap-1" />
          </BriefPart>
        ) : null}
      </dl>
    </div>
  )
}

function BriefPart({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <dt className="text-muted-foreground pt-0.5 text-[0.7rem] font-semibold tracking-wide uppercase">
        {title}
      </dt>
      <dd>{children}</dd>
    </>
  )
}
