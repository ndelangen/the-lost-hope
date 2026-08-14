import { ResponsiveImage } from '#/components/responsive-image'
import { DEFAULT_AVATAR } from '#/definitions/media.ts'
import { cn } from '#/lib/utils'

type AvatarProps = {
  src: string
  alt?: string
  className?: string
  sizes: string
  maxWidth: 32 | 64 | 128 | 256 | 384 | 512
  loading?: 'eager' | 'lazy'
}

export function Avatar({
  src,
  alt = '',
  className,
  sizes,
  maxWidth,
  loading = 'lazy',
}: AvatarProps) {
  return (
    <ResponsiveImage
      src={src}
      fallbackSrc={DEFAULT_AVATAR}
      alt={alt}
      loading={loading}
      sizes={sizes}
      maxWidth={maxWidth}
      className={cn('shrink-0 rounded-full object-cover', className)}
    />
  )
}
