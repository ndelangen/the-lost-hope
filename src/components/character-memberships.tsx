import { OrganizationReference } from '#/components/organization-reference'
import { Badge } from '#/components/ui/badge'
import { Inline, Stack } from '#/components/ui/layout'
import type { CharacterMembership } from '#/lib/entity-page-data'

export function CharacterMemberships({ items }: { items: CharacterMembership[] }) {
  if (items.length === 0) return null

  return (
    <Stack as="section" gap="md">
      <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        Member of
      </h2>
      <Stack as="ul" gap="sm">
        {items.map((membership) => (
          <Inline
            as="li"
            key={membership.organizationSlug}
            gap="sm"
            wrap
            className="border-border rounded-md border px-3 py-2"
          >
            <OrganizationReference slug={membership.organizationSlug} />
            <Badge variant="secondary">{membership.rank}</Badge>
            <Badge variant={membership.status === 'active' ? 'success' : 'outline'}>
              {membership.status}
            </Badge>
          </Inline>
        ))}
      </Stack>
    </Stack>
  )
}
