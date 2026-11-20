import { Link } from '@tanstack/react-router'
import { EyeOff } from 'lucide-react'
import type { ReactNode } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { DmFaces } from '#/components/dm/dm-faces'
import { StatBlockSummary } from '#/components/dm/stat-block-summary'
import { Inline, Stack } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
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
    <Stack gap="sm" className="text-left">
      <Inline gap="md" align="start">
        <DmFaces people={[npc]} size="md" />
        <Stack gap="2xs" className="min-w-0 flex-1">
          <Inline gap="sm" wrap>
            <Link
              to="/dm/npcs/$slug"
              params={{ slug: record.slug }}
              className="text-primary font-semibold underline-offset-4 hover:underline"
            >
              {record.name}
            </Link>
            {record.species ? (
              <Pill variant="outline" className="whitespace-nowrap">
                {record.species}
              </Pill>
            ) : null}
            {met ? null : (
              <Pill variant="warning" className="gap-1 whitespace-nowrap">
                <EyeOff aria-hidden className="size-3" /> Not met yet
              </Pill>
            )}
          </Inline>
          <StatBlockSummary stats={record.stats} />
        </Stack>
      </Inline>
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
    </Stack>
  )
}

/** A labelled part of the brief, titled the same way as the sections of an NPC's DM page. */
function BriefPart({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Stack as="section" gap="2xs">
      <h4 className="text-muted-foreground text-xs font-semibold uppercase">{title}</h4>
      {children}
    </Stack>
  )
}
