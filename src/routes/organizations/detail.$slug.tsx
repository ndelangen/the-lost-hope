import { createFileRoute } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityDetail, EntityNotFound } from '#/components/entity-page'
import { NpcReference } from '#/components/npc-reference'
import { PcReference } from '#/components/pc-reference'
import { Grid, Stack } from '#/components/ui/layout'
import { getEntity, organizationMembers } from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'
import { OrganizationIcon } from '#/lib/organization-icons'

export const Route = createFileRoute('/organizations/detail/$slug')({
  component: OrganizationPage,
})

function OrganizationPage() {
  const { slug } = Route.useParams()
  const entity = getEntity('organization', slug)
  if (!entity) return <EntityNotFound kind="organization" />

  const organization = entity.data
  const memberGroups = organizationMembers(organization)

  return (
    <EntityDetail
      kind="organization"
      title={organization.name}
      visual={{
        variant: 'icon',
        content: <OrganizationIcon icon={organization.icon} className="size-10" />,
      }}
      headerContent={
        organization.notes ? (
          <ContentRenderer content={organization.notes} className="text-muted-foreground text-lg" />
        ) : null
      }
      referencedBy={referencedByItems('organization', slug)}
    >
      {memberGroups.length > 0 ? (
        <Stack as="section" gap="xl">
          <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
            Members
          </h2>
          <Grid gap="2xl" mdTemplate={2}>
            {memberGroups.map((group) => (
              <Stack
                key={group.status}
                gap="lg"
                className={group.status === 'former' ? 'opacity-60 grayscale' : undefined}
              >
                <h3 className="text-lg font-semibold capitalize">{group.status}</h3>
                {group.ranks.map((rankGroup) => (
                  <Stack key={`${group.status}-${rankGroup.rank}`} gap="md">
                    <h4 className="text-muted-foreground text-sm font-medium">{rankGroup.rank}</h4>
                    <Stack as="ul" gap="sm">
                      {rankGroup.members.map((member) => (
                        <li key={`${member.kind}-${member.slug}`}>
                          {member.kind === 'pc' ? (
                            <PcReference slug={member.slug} />
                          ) : (
                            <NpcReference slug={member.slug} />
                          )}
                        </li>
                      ))}
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            ))}
          </Grid>
        </Stack>
      ) : null}
    </EntityDetail>
  )
}
