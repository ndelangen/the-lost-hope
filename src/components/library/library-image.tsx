import { type ComponentProps } from 'react'

import { ResponsiveImage } from '#/components/responsive-image'
import { GENERATED_LIBRARY_RESPONSIVE_IMAGES } from '#/generated/library-responsive-images'

type Props = ComponentProps<typeof ResponsiveImage>
const images: Readonly<Record<string, Props['image']>> = GENERATED_LIBRARY_RESPONSIVE_IMAGES

export function LibraryImage(props: Omit<Props, 'image'>) {
  return <ResponsiveImage {...props} image={images[props.src]} />
}
