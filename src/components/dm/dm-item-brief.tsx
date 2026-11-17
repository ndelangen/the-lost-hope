import { EyeOff } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityReference } from '#/components/entity-reference'
import { Inline, Stack } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
import type { Item } from '#/definitions/item'
import type { EntityRef } from '#/definitions/kind'
import { refLink } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { ItemIcon } from '#/lib/item-icons'

const itemRecords: Readonly<Partial<Record<string, Item>>> = SOURCE_REGISTRIES.item

/** What a DM needs to hand out an item on the spot: what players are told, and the truth behind it. */
export function DmItemBrief({ item }: { item: EntityRef<'item'> }) {
  const record = Object.hasOwn(itemRecords, item.key) ? itemRecords[item.key] : undefined
  if (!record) return null
  const link = refLink(item)

  return (
    <Stack gap="sm" className="text-left">
      <Inline gap="sm" wrap>
        {link ? (
          <EntityReference kind="item" slug={link.slug} className="font-semibold" />
        ) : (
          <Inline gap="xs" className="font-semibold">
            <ItemIcon icon={record.icon} className="size-4" />
            {record.name}
          </Inline>
        )}
        {link ? null : (
          <Pill variant="warning" className="gap-1 whitespace-nowrap">
            <EyeOff aria-hidden className="size-3" /> Not seen yet
          </Pill>
        )}
      </Inline>
      {record.notes ? <ContentRenderer content={record.notes} /> : null}
      {record.background ? (
        <Stack as="section" gap="2xs">
          <h4 className="text-muted-foreground text-xs font-semibold uppercase">
            What players do not know
          </h4>
          <ContentRenderer content={record.background} />
        </Stack>
      ) : null}
    </Stack>
  )
}
