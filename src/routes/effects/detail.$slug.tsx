import { createFileRoute, notFound } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { DmFields } from '#/components/dm/dm-fields'
import { EffectStatusPill } from '#/components/effect-list'
import { EffectText, EffectTokens } from '#/components/effect-text'
import { EntityContext } from '#/components/entity-context'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { EntityReference } from '#/components/entity-reference'
import { Grid, Stack } from '#/components/ui/layout'
import { EFFECT_TRIGGERS } from '#/definitions/effect'
import { effectEntry, getEntity, refLink } from '#/lib/campaign'
import { EffectIcon } from '#/lib/effect-icons'
import { formatSpan } from '#/lib/effects'
import { entityContextData } from '#/lib/entity-context-data'
import { publicEntityPageHead } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/effects/detail/$slug')({
  loader: ({ params }) => {
    const entity = getEntity('effect', params.slug)
    if (!entity) throw notFound()
    return entity
  },
  head: ({ params }) => publicEntityPageHead('effect', params.slug),
  component: EffectPage,
})

function EffectPage() {
  const entity = Route.useLoaderData()
  const effect = entity.data
  const { status, began, ended, expiryDay } = effectEntry(entity)
  const bearers = effect.on.flatMap((ref) => refLink(ref) ?? [])
  const cause = effect.cause ? refLink(effect.cause) : undefined

  return (
    <EntityDetail
      kind="effect"
      title={effect.name}
      visual={{ variant: 'icon', content: <EffectIcon icon={effect.icon} className="size-10" /> }}
      dm={<DmFields kind="effect" slug={entity.slug} />}
      correction={<EntityCorrectionSubmission entity={entity} />}
      context={
        <EntityContext key={`${entity.kind}:${entity.slug}`} data={entityContextData(entity)} />
      }
    >
      <Grid as="section" gap="lg" smTemplate={2}>
        <Fact label="Status">
          <EffectStatusPill status={status} />
        </Fact>
        <Fact label="On">
          {bearers.length ? (
            <ul className="flex flex-wrap gap-x-3 gap-y-1">
              {bearers.map((link) => (
                <li key={`${link.kind}:${link.slug}`}>
                  <Reference link={link} />
                </li>
              ))}
            </ul>
          ) : (
            'Unknown'
          )}
        </Fact>
        {cause ? (
          <Fact label="Caused by">
            <Reference link={cause} />
          </Fact>
        ) : null}
        <Fact label="Began">
          {began ? (
            <EntityReference
              kind="event"
              slug={began.slug}
              label={`Day ${began.data.day}: ${began.data.name}`}
            />
          ) : (
            'Unknown'
          )}
        </Fact>
        {effect.duration ? (
          <Fact label="Duration">
            {formatSpan(effect.duration)}
            {expiryDay !== undefined && !ended ? `, until day ${expiryDay}` : ''}
          </Fact>
        ) : null}
        {ended ? (
          <Fact label="Lifted">
            <EntityReference
              kind="event"
              slug={ended.slug}
              label={`Day ${ended.data.day}: ${ended.data.name}`}
            />
          </Fact>
        ) : null}
      </Grid>

      <Section title="Rules">
        <EffectText text={effect.rules} />
      </Section>

      {effect.obligations?.length ? (
        <Section title="Obligations">
          <ul className="space-y-2 text-sm">
            {effect.obligations.map((obligation) => (
              <li key={obligation.label}>
                <span className="font-semibold">{obligation.label}</span> within{' '}
                {formatSpan(obligation.within)}, or: <EffectTokens tokens={obligation.otherwise} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {effect.triggers?.length ? (
        <Section title="Reminders">
          <ul className="space-y-2 text-sm">
            {effect.triggers.map((trigger) => (
              <li key={trigger.on}>
                <span className="font-semibold">{EFFECT_TRIGGERS[trigger.on]}:</span>{' '}
                <EffectText text={trigger.reminder} className="inline" />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {effect.removal ? (
        <Section title="Removal">
          <EffectText text={effect.removal} />
        </Section>
      ) : null}
    </EntityDetail>
  )
}

function Reference({ link }: { link: NonNullable<ReturnType<typeof refLink>> }) {
  return <EntityReference kind={link.kind} slug={link.slug} label={link.name} />
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Stack gap="xs">
      <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        {label}
      </p>
      <div className="font-medium">{children}</div>
    </Stack>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Stack as="section" gap="sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </Stack>
  )
}
