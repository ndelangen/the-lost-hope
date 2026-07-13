import { ItemReference } from '#/components/item-reference'
import { Grid, Inline, Stack } from '#/components/ui/layout'
import type { EntityOf } from '#/lib/campaign'

type CharacterItemsProps = {
  owned: readonly EntityOf<'item'>[]
  carried: readonly EntityOf<'item'>[]
}

export function CharacterItems({ owned, carried }: CharacterItemsProps) {
  if (owned.length === 0 && carried.length === 0) return null

  return (
    <Grid as="section" gap="xl" smTemplate={2}>
      <ItemGroup label="Owned items" items={owned} />
      <ItemGroup label="Carried items" items={carried} />
    </Grid>
  )
}

function ItemGroup({ label, items }: { label: string; items: readonly EntityOf<'item'>[] }) {
  return (
    <Stack gap="md">
      <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        {label}
      </h2>
      {items.length > 0 ? (
        <Stack as="ul" gap="sm">
          {items.map((item) => (
            <li key={item.slug}>
              <ItemReference
                slug={item.slug}
                unstyled
                wrapperClassName="block"
                className="border-border bg-card hover:border-primary/40 hover:bg-accent/20 block rounded-lg border px-3 py-2 transition-colors"
              >
                {({ icon, label: itemLabel }) => (
                  <Inline as="span" gap="sm">
                    <span className="text-primary">{icon}</span>
                    <span className="text-sm font-medium">{itemLabel}</span>
                  </Inline>
                )}
              </ItemReference>
            </li>
          ))}
        </Stack>
      ) : (
        <p className="text-muted-foreground text-sm">None recorded.</p>
      )}
    </Stack>
  )
}
