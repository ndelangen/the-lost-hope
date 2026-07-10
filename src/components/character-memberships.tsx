import { OrganizationReference } from '#/components/organization-reference'
import { Badge } from '#/components/ui/badge'
import type { CharacterMembership } from '#/lib/entity-page-data'

export function CharacterMemberships({ items }: { items: CharacterMembership[] }) {
  if (items.length === 0) return null

  return (
    <section className="space-y-3">
      <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        Member of
      </h2>
      <ul className="space-y-2">
        {items.map((membership) => (
          <li
            key={membership.organizationSlug}
            className="border-border flex flex-wrap items-center gap-2 rounded-md border px-3 py-2"
          >
            <OrganizationReference slug={membership.organizationSlug} />
            <Badge variant="secondary">{membership.rank}</Badge>
            <Badge variant={membership.status === 'active' ? 'success' : 'outline'}>
              {membership.status}
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  )
}
