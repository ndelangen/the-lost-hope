import { EntityReference } from '#/components/entity-reference'
import type { EntityReferenceProps } from '#/components/entity-reference'

/** Canonical session reference with shared hover/focus preview behavior. */
export function SessionReference(props: Omit<EntityReferenceProps, 'kind'>) {
  return <EntityReference kind="session" {...props} />
}
