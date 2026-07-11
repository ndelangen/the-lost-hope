import { cloneElement, isValidElement, useId, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactElement, ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '#/lib/utils'

import { Stack } from './layout'

export type PreviewSide = 'top' | 'right'

type Position = {
  left: number
  top: number
}

/**
 * Adds one accessible, viewport-aware hover/focus preview to an existing trigger.
 * The preview renders in a portal so scroll containers such as the sidebar do
 * not clip it.
 */
export function HoverPreview({
  children,
  content,
  side = 'top',
  className,
  style,
}: {
  children: ReactNode
  content: ReactNode
  side?: PreviewSide
  className?: string
  style?: CSSProperties
}) {
  const id = useId()
  const triggerRef = useRef<HTMLSpanElement>(null)
  const previewRef = useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<Position>()

  useLayoutEffect(() => {
    if (!open) return

    const updatePosition = () => {
      const trigger = triggerRef.current
      const preview = previewRef.current
      if (!trigger || !preview) return

      const triggerBox = trigger.getBoundingClientRect()
      const previewBox = preview.getBoundingClientRect()
      const viewportPadding = 8
      const gap = 8
      let left: number
      let top: number

      if (side === 'right') {
        left = triggerBox.right + gap
        if (left + previewBox.width > window.innerWidth - viewportPadding) {
          left = triggerBox.left - previewBox.width - gap
        }
        top = triggerBox.top + triggerBox.height / 2 - previewBox.height / 2
      } else {
        left = triggerBox.left
        top = triggerBox.top - previewBox.height - gap
        if (top < viewportPadding) top = triggerBox.bottom + gap
      }

      setPosition({
        left: Math.max(
          viewportPadding,
          Math.min(left, window.innerWidth - previewBox.width - viewportPadding),
        ),
        top: Math.max(
          viewportPadding,
          Math.min(top, window.innerHeight - previewBox.height - viewportPadding),
        ),
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open, side])

  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<{ 'aria-describedby'?: string }>, {
        'aria-describedby': id,
      })
    : children

  return (
    <span
      ref={triggerRef}
      className={cn(side === 'right' ? 'block' : 'inline align-baseline', className)}
      style={style}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false)
        setPosition(undefined)
      }}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return
        setOpen(false)
        setPosition(undefined)
      }}
    >
      {trigger}
      {open
        ? createPortal(
            <Stack
              as="span"
              gap="2xs"
              ref={previewRef}
              id={id}
              role="tooltip"
              style={{ left: position?.left ?? 0, top: position?.top ?? 0 }}
              className={cn(
                'border-border bg-card text-foreground pointer-events-none fixed z-[100] w-max max-w-64 rounded-lg border px-3 py-2 text-xs shadow-lg',
                position ? 'opacity-100' : 'opacity-0',
              )}
            >
              {content}
            </Stack>,
            document.body,
          )
        : null}
    </span>
  )
}
