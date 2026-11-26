import { createFileRoute, Outlet } from '@tanstack/react-router'

import { DmReferenceContext } from '#/components/dm-reference-context'
import { DmReference } from '#/components/dm/dm-reference'

/** DM pages name and link records players have not met, where player pages leave them out. */
export const Route = createFileRoute('/dm')({
  component: () => (
    <DmReferenceContext value={DmReference}>
      <Outlet />
    </DmReferenceContext>
  ),
})
