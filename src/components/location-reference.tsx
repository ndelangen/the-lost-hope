import { EntityReference } from '#/components/entity-reference'
import type { EntityReferenceProps } from '#/components/entity-reference'

/** Canonical location reference with shared hover/focus preview behavior. */
export function LocationReference(props: Omit<EntityReferenceProps, 'kind'>) {
  return <EntityReference kind="location" {...props} />
}
