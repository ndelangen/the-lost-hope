import { EntityReference } from '#/components/entity-reference'
import type { EntityReferenceProps } from '#/components/entity-reference'

/** Canonical quest reference with shared hover/focus preview behavior. */
export function QuestReference(props: Omit<EntityReferenceProps, 'kind'>) {
  return <EntityReference kind="quest" {...props} />
}
