import { createFileRoute, notFound } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { DeckCardFace } from '#/components/deck-card-face'
import { DmFields } from '#/components/dm/dm-fields'
import { EntityContext } from '#/components/entity-context'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { EntityReference } from '#/components/entity-reference'
import { Stack } from '#/components/ui/layout'
import { CARD_TONE_LABELS } from '#/definitions/card'
import { cards, effects, events, getEntity, refLink } from '#/lib/campaign'
import { CardSuitIcon } from '#/lib/card-icons'
import { buildDeckCards } from '#/lib/deck'
import { entityContextData } from '#/lib/entity-context-data'
import { publicEntityPageHead } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/cards/detail/$slug')({
  loader: ({ params }) => {
    const entity = getEntity('card', params.slug)
    if (!entity) throw notFound()
    return entity
  },
  head: ({ params }) => publicEntityPageHead('card', params.slug),
  component: CardPage,
})

function CardPage() {
  const entity = Route.useLoaderData()
  const card = entity.data
  const [key] = Object.entries(cards).find(([, record]) => record.slug === entity.slug) ?? []
  const draws = key ? (buildDeckCards({ [key]: card }, events, effects)[0]?.draws ?? []) : []
  const deck = refLink(card.deck)

  return (
    <EntityDetail
      kind="card"
      title={card.name}
      visual={{ variant: 'icon', content: <CardSuitIcon suit={card.suit} className="size-10" /> }}
      dm={<DmFields kind="card" slug={entity.slug} />}
      correction={<EntityCorrectionSubmission entity={entity} />}
      context={
        <EntityContext key={`${entity.kind}:${entity.slug}`} data={entityContextData(entity)} />
      }
    >
      <div className="grid gap-6 sm:grid-cols-[12rem_minmax(0,1fr)]">
        <DeckCardFace card={card} className="mx-auto w-48 sm:w-full" />
        <Stack gap="md">
          <p className="text-muted-foreground text-sm">
            {CARD_TONE_LABELS[card.tone]} · {card.suit}
            {card.classic ? ' · one of the 22 classic cards' : ''}
            {deck ? (
              <>
                {' · '}
                <EntityReference kind={deck.kind} slug={deck.slug} label={deck.name} />
              </>
            ) : null}
          </p>
          <p className="text-lg">{card.text}</p>
          {card.extraDraws ? <p className="font-medium">{card.extraDraws}</p> : null}
          {card.benefit ? <Fact label="Benefit">{card.benefit}</Fact> : null}
          {card.drawback ? <Fact label="Drawback">{card.drawback}</Fact> : null}
          {draws.length ? (
            <Fact label="Drawn by">
              <ul className="grid gap-1">
                {draws.map((draw) => {
                  const by = refLink(draw.by)
                  const at = refLink(draw.at)
                  const left = draw.effects.flatMap((ref) => refLink(ref) ?? [])
                  return (
                    <li
                      key={`${draw.by.key}:${draw.at.key}`}
                      className="flex flex-wrap items-center gap-x-2 gap-y-1"
                    >
                      {by ? (
                        <EntityReference kind={by.kind} slug={by.slug} label={by.name} />
                      ) : null}
                      {at ? (
                        <EntityReference kind={at.kind} slug={at.slug} label={`day ${draw.day}`} />
                      ) : null}
                      {left.map((link) => (
                        <EntityReference
                          key={link.slug}
                          kind={link.kind}
                          slug={link.slug}
                          label={link.name}
                        />
                      ))}
                    </li>
                  )
                })}
              </ul>
            </Fact>
          ) : null}
        </Stack>
      </div>
    </EntityDetail>
  )
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
