import { EntityReference } from '#/components/entity-reference'
import { resolveSourceRef } from '#/lib/dm-campaign'
import type { DashboardLocationNode } from '#/lib/dm-dashboard'
import { cn } from '#/lib/utils'

import { DmFaces } from './dm-faces'
import { DmSceneRow } from './dm-scene-row'

/** One place in the location tree: its heading, the party there, its scenes, then the places inside it. */
export function DmLocationBranch({
  node: start,
  depth,
}: {
  node: DashboardLocationNode
  depth: number
}) {
  // Places that only lead to one other place fold into a breadcrumb: Ethium › Reve › Fajanet.
  const trail: DashboardLocationNode[] = []
  let node = start
  while (node.party.length === 0 && node.scenes.length === 0 && node.children.length === 1) {
    trail.push(node)
    node = node.children[0]!
  }
  const location = resolveSourceRef(node.location)
  return (
    <section
      className={cn('grid grid-cols-1 gap-1', depth > 0 && 'border-border ml-2 border-l pl-3')}
      aria-label={location?.name}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-3 pb-1',
          depth === 0 && 'border-border border-b',
        )}
      >
        <p className="flex min-w-0 flex-wrap items-center gap-x-1">
          {trail.map((step) => (
            <span key={step.location.key} className="text-muted-foreground text-sm">
              {resolveSourceRef(step.location)?.name} ›
            </span>
          ))}
          <EntityReference
            kind="location"
            slug={location?.slug ?? ''}
            className={depth === 0 ? 'font-semibold' : 'text-sm font-semibold'}
          />
        </p>
        <DmFaces people={node.party} />
      </div>
      {node.scenes.length > 0 ? (
        <ul className="grid grid-cols-1">
          {node.scenes.map((item) => (
            <DmSceneRow key={item.key} scene={item.scene} pinned={item.pinned} plots={item.plots} />
          ))}
        </ul>
      ) : node.children.length === 0 ? (
        <p className="text-muted-foreground px-1 py-2 text-sm">No scenes selected here yet.</p>
      ) : null}
      {node.children.map((child) => (
        <DmLocationBranch key={child.location.key} node={child} depth={depth + 1} />
      ))}
    </section>
  )
}
