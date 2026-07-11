import { EntityReference } from '#/components/entity-reference'
import type { EntityReferenceProps } from '#/components/entity-reference'

/** Canonical organization reference with shared hover/focus preview behavior. */
export function OrganizationReference(props: Omit<EntityReferenceProps, 'kind'>) {
  return <EntityReference kind="organization" {...props} />
}
