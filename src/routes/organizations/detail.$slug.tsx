import { createFileRoute } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityChip, EntityDetail, EntityNotFound } from '#/components/entity-page'
import { Inline, Stack } from '#/components/ui/layout'
import { getEntity, organizationMembers } from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'
import { OrganizationAvatar } from '#/lib/organization-icons'

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
    <EntityDetail kind="organization" referencedBy={referencedByItems('organization', slug)}>
      <Stack as="header" gap="md">
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Organization
        </p>
        <Inline gap="lg">
          <OrganizationAvatar icon={organization.icon} />
          <Stack gap="sm">
            <h1 className="text-4xl font-bold tracking-tight">{organization.name}</h1>
            {organization.notes ? (
              <ContentRenderer
                content={organization.notes}
                className="text-muted-foreground text-lg"
              />
            ) : null}
          </Stack>
        </Inline>
      </Stack>

      {memberGroups.length > 0 ? (
        <Stack as="section" gap="xl">
          <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
            Members
          </h2>
          {memberGroups.map((group) => (
            <Stack key={group.status} gap="lg">
              <h3 className="text-lg font-semibold capitalize">{group.status}</h3>
              {group.ranks.map((rankGroup) => (
                <Stack key={`${group.status}-${rankGroup.rank}`} gap="md">
                  <h4 className="text-muted-foreground text-sm font-medium">{rankGroup.rank}</h4>
                  <Inline as="ul" gap="md" wrap>
                    {rankGroup.members.map((member) => (
                      <li key={`${member.kind}-${member.slug}`}>
                        <EntityChip
                          kind={member.kind}
                          slug={member.slug}
                          name={member.name}
                          avatar={member.avatar}
                        />
                      </li>
                    ))}
                  </Inline>
                </Stack>
              ))}
            </Stack>
          ))}
        </Stack>
      ) : null}
    </EntityDetail>
  )
}
