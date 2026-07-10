import { createFileRoute } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityChip, EntityDetail, EntityNotFound } from '#/components/entity-page'
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
      <header className="space-y-3">
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Organization
        </p>
        <div className="flex items-center gap-4">
          <OrganizationAvatar icon={organization.icon} />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{organization.name}</h1>
            {organization.notes ? (
              <ContentRenderer
                content={organization.notes}
                className="text-muted-foreground text-lg"
              />
            ) : null}
          </div>
        </div>
      </header>

      {memberGroups.length > 0 ? (
        <section className="space-y-6">
          <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
            Members
          </h2>
          {memberGroups.map((group) => (
            <div key={group.status} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">{group.status}</h3>
              {group.ranks.map((rankGroup) => (
                <div key={`${group.status}-${rankGroup.rank}`} className="space-y-3">
                  <h4 className="text-muted-foreground text-sm font-medium">{rankGroup.rank}</h4>
                  <ul className="flex flex-wrap gap-3">
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
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </section>
      ) : null}
    </EntityDetail>
  )
}
