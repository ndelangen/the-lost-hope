import { Link } from '@tanstack/react-router'
import { EyeOff } from 'lucide-react'
import type { ReactNode } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { useDmMode } from '#/components/dm-mode'
import { DmReferenceContext } from '#/components/dm-reference-context'
import { DmReference } from '#/components/dm/dm-reference'
import { StatBlockSummary } from '#/components/dm/stat-block-summary'
import { EntityReference } from '#/components/entity-reference'
import { RuleTerm } from '#/components/rule-term'
import { Pill } from '#/components/ui/pill'
import { refs } from '#/data/generated/refs'
import type { Content } from '#/definitions/content'
import { ITEM_STATUS_LABELS, type ItemStatus } from '#/definitions/item'
import type { EntityKind } from '#/definitions/kind'
import type { Membership } from '#/definitions/organization'
import type { OwnOrSharedStatBlock, PcStatBlock } from '#/definitions/stat-block'
import { refLink } from '#/lib/campaign'
import { sourceRecordBySlug } from '#/lib/dm-campaign'
import { DM_FIELDS } from '#/lib/player-visibility'
import { allAbilities, deriveStatBlock } from '#/lib/stat-block'

/** The values of every field `DM_FIELDS` lists, across all kinds. */
type DmFieldValues = {
  background?: Content
  motivations?: Content
  stats?: OwnOrSharedStatBlock | PcStatBlock
  level?: number
  secretMemberships?: Membership[]
  status?: ItemStatus
}

type DmFieldName = keyof DmFieldValues

const FIELD_TITLES: Record<DmFieldName, string> = {
  motivations: 'Motivations',
  background: 'Background',
  stats: 'Stat block',
  level: 'Level',
  secretMemberships: 'Secret memberships',
  status: 'Status',
}

/**
 * In DM mode, a player page's DM-only fields, read from the campaign source. The fields shown are
 * exactly the ones the player projection removes.
 */
export function DmFields({ kind, slug }: { kind: EntityKind; slug: string }) {
  const dmMode = useDmMode()
  if (!dmMode) return null
  const source = sourceRecordBySlug(kind, slug)
  if (!source) return null
  const values = source.record as DmFieldValues
  // A location's shop has its own panel (`ShopPanel`).
  const fields = (DM_FIELDS[kind] as readonly DmFieldName[]).filter(
    (field) => Object.hasOwn(FIELD_TITLES, field) && values[field] !== undefined,
  )

  return (
    <DmReferenceContext value={DmReference}>
      <section
        aria-label="DM only"
        className="grid gap-4 rounded-xl border border-dashed border-amber-500/60 bg-amber-500/5 p-5"
      >
        <header className="flex flex-wrap items-center justify-between gap-2">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-700 uppercase dark:text-amber-300">
            <EyeOff className="size-3.5" aria-hidden /> DM only
          </p>
          {kind === 'npc' ? (
            <Link
              to="/dm/npcs/$slug"
              params={{ slug }}
              className="text-primary text-sm font-medium underline-offset-4 hover:underline"
            >
              Open DM view →
            </Link>
          ) : null}
        </header>
        {fields.length === 0 ? (
          <p className="text-muted-foreground text-sm">No DM-only notes recorded.</p>
        ) : (
          fields.map((field) => (
            <section key={field} className="grid gap-2">
              <h2 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                {FIELD_TITLES[field]}
              </h2>
              <DmFieldValue field={field} values={values} />
            </section>
          ))
        )}
      </section>
    </DmReferenceContext>
  )
}

function DmFieldValue({ field, values }: { field: DmFieldName; values: DmFieldValues }): ReactNode {
  switch (field) {
    case 'background':
    case 'motivations': {
      const content = values[field]
      return content ? <ContentRenderer content={content} /> : null
    }
    case 'stats':
      if (!values.stats) return null
      return 'maxHp' in values.stats ? (
        <PcStatSummary stats={values.stats} level={values.level} />
      ) : (
        <StatBlockSummary stats={values.stats} />
      )
    case 'level':
      return null
    case 'secretMemberships':
      return values.secretMemberships ? (
        <SecretMemberships memberships={values.secretMemberships} />
      ) : null
    case 'status':
      return values.status ? (
        <p className="font-medium">{ITEM_STATUS_LABELS[values.status]}</p>
      ) : null
  }
}

/** A PC's armor class, hit points, passive Perception and save DCs, derived from the sheet. */
function PcStatSummary({ stats, level }: { stats: PcStatBlock; level: number | undefined }) {
  if (!level) return null
  const block = deriveStatBlock({ ...stats, level })
  const dcs = [
    ...new Set(allAbilities({ ...stats, level }).flatMap((a) => (a.save ? [a.save.dc] : []))),
  ]
  return (
    <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
      <span>
        <RuleTerm rule={refs.rules.armor_class} /> {block.ac}
      </span>
      <span>
        {block.maxHp} <RuleTerm rule={refs.rules.hit_points} />
      </span>
      <span>
        <RuleTerm rule={refs.rules.passive_perception} /> {block.passivePerception}
      </span>
      {dcs.map((ability) => (
        <span key={ability}>
          Spell save <RuleTerm rule={refs.rules.difficulty_class} /> {block.saveDc[ability]}
        </span>
      ))}
      <span className="text-muted-foreground">
        {stats.abilities.length} abilities, spells and features in the encounter
      </span>
    </p>
  )
}

function SecretMemberships({ memberships }: { memberships: Membership[] }) {
  return (
    <ul className="grid gap-2">
      {memberships.map((membership) => {
        const link = refLink(membership.organization)
        return (
          <li
            key={membership.organization.key}
            className="border-border flex flex-wrap items-center gap-2 rounded-md border px-3 py-2"
          >
            {link ? (
              <EntityReference kind={link.kind} slug={link.slug} label={link.name} />
            ) : (
              <DmReference reference={membership.organization} />
            )}
            <Pill variant="secondary">{membership.rank}</Pill>
            <Pill variant={membership.status === 'active' ? 'success' : 'outline'}>
              {membership.status}
            </Pill>
          </li>
        )
      })}
    </ul>
  )
}
