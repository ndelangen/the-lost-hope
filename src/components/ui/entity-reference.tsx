import { Link } from '@tanstack/react-router'
import type { CSSProperties, ReactNode } from 'react'

import { entityLink, type EntityKind } from '#/lib/campaign'
import { cn } from '#/lib/utils'

import { HoverPreview } from './hover-preview'
import type { PreviewSide } from './hover-preview'
import { Inline } from './layout'

export function EntityReference({
  kind,
  slug,
  label,
  icon,
  tooltip,
  className,
  wrapperClassName,
  wrapperStyle,
  previewSide,
  unstyled,
  children,
  onNavigate,
}: {
  kind: EntityKind
  slug: string
  label: string
  icon: ReactNode
  tooltip: ReactNode
  className?: string
  wrapperClassName?: string
  wrapperStyle?: CSSProperties
  previewSide?: PreviewSide
  unstyled?: boolean
  children?: ReactNode
  onNavigate?: () => void
}) {
  return (
    <HoverPreview
      content={tooltip}
      side={previewSide}
      className={wrapperClassName}
      style={wrapperStyle}
    >
      <Link
        {...entityLink(kind, slug)}
        data-entity-kind={kind}
        onClick={onNavigate}
        className={cn(
          !unstyled && 'text-primary inline font-medium underline-offset-4 hover:underline',
          className,
        )}
      >
        {children ?? (
          <>
            <Inline
              as="span"
              inline
              gap="none"
              marginEnd="2xs"
              className="relative -top-px align-middle"
            >
              {icon}
            </Inline>
            {label}
          </>
        )}
      </Link>
    </HoverPreview>
  )
}
