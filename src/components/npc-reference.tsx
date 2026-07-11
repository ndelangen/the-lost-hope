import { EntityReference } from '#/components/entity-reference'
import type { EntityReferenceProps } from '#/components/entity-reference'

/** Canonical NPC reference with shared hover/focus preview behavior. */
export function NpcReference(props: Omit<EntityReferenceProps, 'kind'>) {
  return <EntityReference kind="npc" {...props} />
}
