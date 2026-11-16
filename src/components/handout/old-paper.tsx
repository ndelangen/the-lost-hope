import type { ReactNode } from 'react'

import { cn } from '#/lib/utils'

/** An aged, stained sheet of paper that handwritten handouts are written on. */
export function OldPaper({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('old-paper', className)}>{children}</div>
}
