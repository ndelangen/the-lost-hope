import type { ImgHTMLAttributes, SyntheticEvent } from 'react'

import { publicAssetUrl, responsiveImageFor } from '#/lib/public-media'

type ResponsiveImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'alt' | 'height' | 'sizes' | 'src' | 'srcSet' | 'width'
> & {
  src: string
  alt: string
  sizes: string
  fallbackSrc?: string
  maxWidth?: number
  width?: number
  height?: number
}

export function ResponsiveImage({
  src,
  alt,
  sizes,
  fallbackSrc,
  maxWidth,
  width,
  height,
  onError,
  ...props
}: ResponsiveImageProps) {
  const image = responsiveImageFor(src)
  const resolvedSource = image?.candidates[0]?.src ?? publicAssetUrl(src, fallbackSrc ?? src)
  const candidates = (image?.candidates ?? []).filter(
    (candidate) => maxWidth === undefined || candidate.width <= maxWidth,
  )
  const sourceSet = candidates.map((candidate) => `${candidate.src} ${candidate.width}w`).join(', ')

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    const element = event.currentTarget
    if (fallbackSrc && !element.dataset.fallbackApplied) {
      element.dataset.fallbackApplied = 'true'
      element.srcset = ''
      element.sizes = ''
      element.src = publicAssetUrl(fallbackSrc, fallbackSrc)
    }
    onError?.(event)
  }

  return (
    <img
      {...props}
      alt={alt}
      src={resolvedSource}
      srcSet={sourceSet}
      sizes={sourceSet ? sizes : undefined}
      width={width ?? image?.width}
      height={height ?? image?.height}
      onError={fallbackSrc || onError ? handleError : undefined}
    />
  )
}
