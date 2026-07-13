import { EntityReference, type EntityReferenceProps } from '#/components/entity-reference'

/** Canonical item reference with shared hover/focus preview behavior. */
export function ItemReference(props: Omit<EntityReferenceProps, 'kind'>) {
  return <EntityReference kind="item" {...props} />
}
