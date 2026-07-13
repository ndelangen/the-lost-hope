import { OrganizationReference } from '#/components/organization-reference'
import { Inline, Stack } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
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
            <Pill variant="secondary">{membership.rank}</Pill>
            <Pill variant={membership.status === 'active' ? 'success' : 'outline'}>
              {membership.status}
            </Pill>
          </Inline>
        ))}
      </Stack>
    </Stack>
  )
}
