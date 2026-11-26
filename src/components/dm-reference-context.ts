import { createContext, type ComponentType } from 'react'

import type { EntityRef } from '#/definitions/kind.ts'
import type { Reference } from '#/definitions/reference.ts'

/** A reference a DM page renders itself: any record, or a prepared scene. */
export type DmReferenceTarget = Reference | EntityRef<'scene'>

/**
 * How DM pages render references: characters and creatures with their numbers at a glance,
 * records players have not met, and prepared scenes. The player app never provides it, so it
 * shows only what players have met.
 */
export const DmReferenceContext = createContext<
  ComponentType<{ reference: DmReferenceTarget }> | undefined
>(undefined)
