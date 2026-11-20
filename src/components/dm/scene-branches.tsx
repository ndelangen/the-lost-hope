import { CornerDownRight } from 'lucide-react'
import { useId, useState, type KeyboardEvent, type MouseEvent } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { OUTCOME_ICONS } from '#/lib/outcome-icons'
import type { SceneBranch } from '#/lib/scene-branches'
import { cn } from '#/lib/utils'

const followUpLabel = (count: number) => `${count} follow-up${count === 1 ? '' : 's'}`

/** The icon an outcome shows on its tab: what the players do, or what happens. */
function OutcomeIcon({ icon, className }: { icon: string; className: string }) {
  const Icon = OUTCOME_ICONS[icon]
  return Icon ? <Icon className={cn('shrink-0', className)} aria-hidden /> : null
}

/** Side by side while the conditions stay readable; four or more wrap into two columns. */
function columnsFor(count: number) {
  if (count <= 1) return 'grid-cols-1'
  if (count === 3) return 'grid-cols-1 sm:grid-cols-3'
  return 'grid-cols-1 sm:grid-cols-2'
}

/**
 * A scene's "if…" outcomes as tabs: the conditions sit side by side, and only the one the players
 * chose shows what follows. The chosen tab and its panel share one surface, so they read as one
 * piece. Follow-ups repeat the pattern inside the panel without a frame.
 */
export function SceneBranches({ branches, label }: { branches: SceneBranch[]; label?: string }) {
  return <BranchTabs branches={branches} label={label} nested={false} />
}

function tabSurface(nested: boolean, selected: boolean) {
  if (nested) return selected ? 'border-primary' : 'border-border'
  return selected ? 'border-primary bg-muted' : 'bg-card border-transparent'
}

function BranchTabs({
  branches,
  label,
  nested,
}: {
  branches: SceneBranch[]
  label?: string
  nested: boolean
}) {
  const baseId = useId()
  const [selectedId, setSelectedId] = useState(branches[0]?.id)
  const selected = branches.find((branch) => branch.id === selectedId) ?? branches[0]
  if (!selected) return null

  const labelId = `${baseId}-label`
  const panelId = `${baseId}-panel`
  const tabId = (id: string) => `${baseId}-tab-${id}`
  // An odd tab left alone on the last row of two columns takes the whole row.
  const lastSpansRow = branches.length > 3 && branches.length % 2 === 1

  const select = (branch: SceneBranch) => {
    setSelectedId(branch.id)
    document.getElementById(tabId(branch.id))?.focus()
  }

  const onTabClick = (event: MouseEvent<HTMLDivElement>, branch: SceneBranch) => {
    // Links and buttons inside the condition keep their own behaviour.
    if (event.target instanceof Element && event.target.closest('a, button')) return
    setSelectedId(branch.id)
  }

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    // Keys pressed on a link inside the condition belong to the link.
    if (event.target !== event.currentTarget) return
    const last = branches.length - 1
    let next: number
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = index === last ? 0 : index + 1
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        next = index === 0 ? last : index - 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = last
        break
      case 'Enter':
      case ' ':
        next = index
        break
      default:
        return
    }
    event.preventDefault()
    const target = branches[next]
    if (target) select(target)
  }

  const tabs = (
    <section className="grid min-w-0 gap-2">
      {label ? (
        <p id={labelId} className="text-muted-foreground text-sm font-medium">
          {label}
        </p>
      ) : null}
      <div className={cn(!nested && 'border-border overflow-hidden rounded-lg border')}>
        <div
          role="tablist"
          aria-labelledby={label ? labelId : undefined}
          aria-label={label ? undefined : 'Outcomes'}
          className={cn('grid', columnsFor(branches.length), !nested && 'bg-border gap-px')}
        >
          {branches.map((branch, index) => {
            const isSelected = branch.id === selected.id
            return (
              <div
                key={branch.id}
                id={tabId(branch.id)}
                role="tab"
                aria-selected={isSelected}
                aria-controls={isSelected ? panelId : undefined}
                tabIndex={isSelected ? 0 : -1}
                onClick={(event) => onTabClick(event, branch)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={cn(
                  'focus-visible:ring-ring grid min-h-12 cursor-pointer grid-cols-[auto_minmax(0,1fr)] items-start gap-3 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset',
                  lastSpansRow && 'sm:last:col-span-2',
                  nested ? 'border-b-2 px-3 py-2.5' : 'border-t-2 px-4 py-3',
                  isSelected ? 'text-foreground' : 'text-foreground/80 hover:text-foreground',
                  tabSurface(nested, isSelected),
                )}
              >
                <OutcomeIcon
                  icon={branch.icon}
                  className={cn(
                    nested ? 'size-7' : 'size-10',
                    isSelected ? 'text-primary' : 'text-muted-foreground',
                  )}
                />
                <div className="grid gap-1">
                  <ContentRenderer content={branch.when} />
                  {branch.descendantCount > 0 ? (
                    <span className="text-muted-foreground flex items-center gap-1 text-xs">
                      <CornerDownRight className="size-3.5 shrink-0" aria-hidden />
                      {followUpLabel(branch.descendantCount)}
                    </span>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
        <div
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId(selected.id)}
          className={cn('grid gap-4', nested ? 'px-3 pt-3' : 'bg-muted p-4')}
        >
          <ContentRenderer content={selected.response} />
          {selected.followUps.length > 0 ? (
            // Keyed by the outcome, so each one's follow-ups start on their own first tab.
            <BranchTabs key={selected.id} branches={selected.followUps} label="Then, if…" nested />
          ) : null}
        </div>
      </div>
    </section>
  )

  if (!nested) return tabs

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2">
      <CornerDownRight className="text-muted-foreground mt-0.5 size-4" aria-hidden />
      {tabs}
    </div>
  )
}
