import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
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
 * not clip it. An `interactive` preview can hold links: the pointer can move
 * into it, and a click or tap on the trigger pins it open.
 */
export function HoverPreview({
  children,
  content,
  side = 'top',
  interactive = false,
  className,
  style,
}: {
  children: ReactNode
  content: ReactNode
  side?: PreviewSide
  interactive?: boolean
  className?: string
  style?: CSSProperties
}) {
  const id = useId()
  const triggerRef = useRef<HTMLSpanElement>(null)
  const previewRef = useRef<HTMLSpanElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [position, setPosition] = useState<Position>()

  const show = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const hide = () => {
    clearTimeout(closeTimer.current)
    setOpen(false)
    setPinned(false)
    setPosition(undefined)
  }
  // An interactive preview waits a moment so the pointer can cross the gap into it.
  const leave = () => {
    if (pinned) return
    if (!interactive) return hide()
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(hide, 150)
  }

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  useEffect(() => {
    if (!pinned) return
    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Node
      if (triggerRef.current?.contains(target) || previewRef.current?.contains(target)) return
      hide()
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [pinned])

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
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- handles the trigger child's events
    <span
      ref={triggerRef}
      className={cn(side === 'right' ? 'block' : 'inline align-baseline', className)}
      style={style}
      onMouseEnter={show}
      onMouseLeave={leave}
      onFocusCapture={show}
      onBlurCapture={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return
        if (previewRef.current?.contains(event.relatedTarget)) return
        hide()
      }}
      onClickCapture={
        interactive
          ? (event) => {
              // Clicks inside the portalled preview bubble here through React; leave them be.
              if (previewRef.current?.contains(event.target as Node)) return
              setOpen(true)
              setPinned((value) => !value)
            }
          : undefined
      }
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) hide()
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
              role={interactive ? undefined : 'tooltip'}
              style={{ left: position?.left ?? 0, top: position?.top ?? 0 }}
              onMouseEnter={interactive ? show : undefined}
              onMouseLeave={interactive ? leave : undefined}
              onBlurCapture={
                interactive
                  ? (event) => {
                      const inside =
                        previewRef.current?.contains(event.relatedTarget) ||
                        triggerRef.current?.contains(event.relatedTarget)
                      if (!inside) hide()
                    }
                  : undefined
              }
              onKeyDown={(event) => {
                if (event.key === 'Escape') hide()
              }}
              className={cn(
                'border-border bg-card text-foreground fixed z-[100] w-max rounded-lg border px-3 py-2 text-xs shadow-lg',
                interactive ? 'max-w-72' : 'pointer-events-none max-w-64',
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
