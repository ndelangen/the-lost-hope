import { createFileRoute, Outlet } from '@tanstack/react-router'

import { HiddenReferenceContext } from '#/components/content-renderer'
import { DmHiddenReference } from '#/components/dm/dm-hidden-reference'

/** DM pages name and link records players have not met, where player pages leave them out. */
export const Route = createFileRoute('/dm')({
  component: () => (
    <HiddenReferenceContext value={DmHiddenReference}>
      <Outlet />
    </HiddenReferenceContext>
  ),
})
