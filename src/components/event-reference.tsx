import { EntityReference } from '#/components/entity-reference'
import type { EntityReferenceProps } from '#/components/entity-reference'

/** Canonical event reference with shared hover/focus preview behavior. */
export function EventReference(props: Omit<EntityReferenceProps, 'kind'>) {
  return <EntityReference kind="event" {...props} />
}
