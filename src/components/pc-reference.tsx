import { EntityReference } from '#/components/entity-reference'
import type { EntityReferenceProps } from '#/components/entity-reference'

/** Canonical player-character reference with shared hover/focus preview behavior. */
export function PcReference(props: Omit<EntityReferenceProps, 'kind'>) {
  return <EntityReference kind="pc" {...props} />
}
