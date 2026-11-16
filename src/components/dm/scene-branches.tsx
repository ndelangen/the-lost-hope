import { ChevronRight } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { DmNpcBrief } from '#/components/dm/dm-npc-brief'
import type { SceneBranch } from '#/lib/scene-branches'

const followUpLabel = (count: number) => `${count} follow-up${count === 1 ? '' : 's'}`

/** A scene's "if…" branches as a folding tree: follow-ups sit inside the branch they depend on. */
export function SceneBranches({
  branches,
  showCast = false,
}: {
  branches: SceneBranch[]
  /** Show a brief for each NPC a branch names, inside that branch. */
  showCast?: boolean
}) {
  return (
    <ul className="grid gap-2">
      {branches.map((branch) => (
        <FoldingBranch key={branch.id} branch={branch} depth={0} showCast={showCast} />
      ))}
    </ul>
  )
}

function FoldingBranch({
  branch,
  depth,
  showCast,
}: {
  branch: SceneBranch
  depth: number
  showCast: boolean
}) {
  return (
    <li>
      <details open={depth === 0} className="group bg-muted/50 rounded-md">
        <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 p-3 font-medium [&::-webkit-details-marker]:hidden">
          <ChevronRight className="text-muted-foreground size-5 shrink-0 transition-transform group-open:rotate-90" />
          <span className="min-w-0 flex-1">
            <ContentRenderer content={branch.when} />
          </span>
          {branch.descendantCount > 0 ? (
            <span className="text-muted-foreground bg-background/60 shrink-0 rounded-full px-2 py-0.5 text-xs">
              {followUpLabel(branch.descendantCount)}
            </span>
          ) : null}
        </summary>
        <div className="grid gap-3 px-3 pb-3 pl-11">
          <ContentRenderer content={branch.response} className="text-muted-foreground" />
          {showCast && branch.npcs.length > 0 ? (
            <ul className="grid gap-2 md:grid-cols-2">
              {branch.npcs.map((npc) => (
                <li key={npc.key} className="border-border bg-card rounded-lg border p-3">
                  <DmNpcBrief npc={npc} />
                </li>
              ))}
            </ul>
          ) : null}
          {branch.followUps.length > 0 ? (
            <div className="border-border grid gap-2 border-l-2 pl-3">
              <p className="text-muted-foreground text-xs font-semibold uppercase">Then, if…</p>
              <ul className="grid gap-2">
                {branch.followUps.map((child) => (
                  <FoldingBranch
                    key={child.id}
                    branch={child}
                    depth={depth + 1}
                    showCast={showCast}
                  />
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </details>
    </li>
  )
}
