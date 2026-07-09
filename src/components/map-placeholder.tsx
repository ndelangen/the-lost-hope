import { MapPin } from 'lucide-react'
import { useState } from 'react'

import { cn } from '#/lib/utils'

type MapPlaceholderProps = {
  name: string
  coordinates?: [number, number]
  className?: string
  compact?: boolean
}

export function MapPlaceholder({ name, coordinates, className, compact }: MapPlaceholderProps) {
  return (
    <div
      className={cn(
        'border-border relative overflow-hidden rounded-xl border bg-gradient-to-br from-amber-50/80 via-stone-100/90 to-amber-100/60 dark:from-amber-950/30 dark:via-stone-900/50 dark:to-amber-900/20',
        compact ? 'aspect-[3/1]' : 'aspect-[10/7]',
        className,
      )}
    >
      <svg
        className="absolute inset-0 size-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-amber-900/40 dark:text-amber-200/20"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
      </svg>

      <div className="relative flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
        <MapPin className="text-primary/60 size-8" aria-hidden />
        <p className="text-foreground/80 max-w-md text-sm font-medium">{name}</p>
        {coordinates ? (
          <p className="text-muted-foreground font-mono text-xs">
            {coordinates[0]}, {coordinates[1]}
          </p>
        ) : null}
        <p className="text-muted-foreground text-xs tracking-wide uppercase">Map forthcoming</p>
      </div>
    </div>
  )
}

export function LocationMapImage({
  src,
  alt,
  coordinates,
  className,
}: {
  src: string
  alt: string
  coordinates?: [number, number]
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed || src.includes('placehold')) {
    return <MapPlaceholder name={alt} coordinates={coordinates} className={className} />
  }

  return (
    <div className={cn('border-border overflow-hidden rounded-xl border', className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="aspect-[3/1] w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
