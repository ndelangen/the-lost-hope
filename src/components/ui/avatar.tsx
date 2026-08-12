import { DEFAULT_AVATAR } from '#/definitions/media.ts'
import { publicAssetUrl } from '#/lib/public-media'
import { cn } from '#/lib/utils'

type AvatarProps = {
  src: string
  alt?: string
  className?: string
  loading?: 'eager' | 'lazy'
}

export function Avatar({ src, alt = '', className, loading }: AvatarProps) {
  return (
    <img
      src={publicAssetUrl(src)}
      alt={alt}
      loading={loading}
      className={cn('shrink-0 rounded-full object-cover', className)}
      onError={(event) => {
        const img = event.currentTarget
        if (img.dataset.fallbackApplied) return
        img.dataset.fallbackApplied = 'true'
        img.src = DEFAULT_AVATAR
      }}
    />
  )
}
