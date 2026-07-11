import { EntityReference } from '#/components/entity-reference'
import type { EntityReferenceProps } from '#/components/entity-reference'

/** Canonical beast reference with shared hover/focus preview behavior. */
export function BeastReference(props: Omit<EntityReferenceProps, 'kind'>) {
  return <EntityReference kind="beast" {...props} />
}
