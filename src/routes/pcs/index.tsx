import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { EntityKindPill } from '#/components/entity-kind-pill'
import { PcReference } from '#/components/pc-reference'
import { Avatar } from '#/components/ui/avatar'
import { Center, Grid, Inline, Stack } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
import {
  activePcs,
  nonActivePcs,
  pcStatLine,
  pcStatusLabel,
  sortEntitiesByName,
  type EntityOf,
} from '#/lib/campaign'
import { ENTITY_KIND_VISUALS } from '#/lib/entity-kind-visuals'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/pcs/')({
  head: () => publicPageHeadForPath('/pcs'),
  component: PcsPage,
})

function PcsPage() {
  const party = sortEntitiesByName(activePcs())
  const otherCharacters = sortEntitiesByName(nonActivePcs())

  return (
    <Stack gap="4xl">
      <Stack as="header" gap="md" className="max-w-2xl">
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">PCs</p>
        <h1 className="text-4xl font-bold tracking-tight">Meet the party</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          The adventurers at the heart of {party.length === 1 ? 'this story' : 'the current story'}.
          Select a character to explore their history, affiliations, and campaign connections.
        </p>
      </Stack>

      <PcRoster
        title="Current party"
        description="Travelling together in the latest chapter."
        characters={party}
        featured
      />

      {otherCharacters.length > 0 ? (
        <PcRoster
          title="Other adventurers"
          description="Occasional, retired, and missing characters who remain part of the campaign history."
          characters={otherCharacters}
        />
      ) : null}
    </Stack>
  )
}

function PcRoster({
  title,
  description,
  characters,
  featured = false,
}: {
  title: string
  description: string
  characters: readonly EntityOf<'pc'>[]
  featured?: boolean
}) {
  return (
    <Stack as="section" gap="xl">
      <Stack gap="2xs">
        <Inline gap="sm">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <EntityKindPill kind="pc">{characters.length}</EntityKindPill>
        </Inline>
        <p className="text-muted-foreground text-sm">{description}</p>
      </Stack>

      <Grid template={2} mdTemplate={4} gap="3xl">
        {characters.map((character) => (
          <PcPortraitLink key={character.slug} character={character} featured={featured} />
        ))}
      </Grid>
    </Stack>
  )
}

function PcPortraitLink({ character, featured }: { character: EntityOf<'pc'>; featured: boolean }) {
  const pc = character.data
  const visual = ENTITY_KIND_VISUALS.pc
  const rawStatLine = pcStatLine(pc)
  const statLine = rawStatLine.toLowerCase() === 'unknown unknown' ? '' : rawStatLine
  const playerLabel =
    pc.player.toLowerCase() === 'unknown' ? 'Player unknown' : `Played by ${pc.player}`

  return (
    <PcReference
      slug={character.slug}
      label={pc.name}
      unstyled
      wrapperClassName="block"
      className={cn(
        'group block min-w-0 rounded-2xl text-center transition-opacity focus-visible:outline-none',
        !featured && 'opacity-60 hover:opacity-100 focus-visible:opacity-100',
      )}
    >
      {() => (
        <Stack as="span" gap="lg" align="center">
          <Center
            as="span"
            maxWidth={featured ? 'xl' : 'sm'}
            className={cn(
              'border-border bg-card relative aspect-square overflow-hidden rounded-full border shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-focus-visible:ring-2',
              visual.ringClassName,
              featured ? 'w-full max-w-44' : 'w-full max-w-28',
            )}
          >
            <Avatar
              src={pc.avatar}
              alt={pc.name}
              loading="lazy"
              className={cn(
                'size-full rounded-full transition-all duration-500 group-hover:scale-105',
                !featured && 'grayscale group-hover:grayscale-0',
              )}
            />
            <div className="from-foreground/30 pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <ArrowUpRight className="text-primary-foreground absolute right-[14%] bottom-[12%] size-5 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
          </Center>

          <Stack as="span" gap="2xs" align="center" className="max-w-48">
            <h3 className="group-hover:text-primary text-base font-semibold transition-colors">
              {pc.name}
            </h3>
            {statLine ? (
              <p
                className={cn(
                  'text-sm font-medium',
                  featured ? visual.accentClassName : 'text-muted-foreground',
                )}
              >
                {statLine}
              </p>
            ) : null}
            <p className="text-muted-foreground text-xs">{playerLabel}</p>
            {!featured ? (
              <Pill
                variant="outline"
                className="max-w-full text-center leading-tight whitespace-normal capitalize"
              >
                {pcStatusLabel(pc.status)}
              </Pill>
            ) : null}
          </Stack>
        </Stack>
      )}
    </PcReference>
  )
}
