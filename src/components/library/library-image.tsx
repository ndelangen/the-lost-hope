import { Suspense, type ComponentProps } from 'react'

import { ResponsiveImage } from '#/components/responsive-image'
import { deferredModule, lazyFrom, loadAfterPageLoad } from '#/lib/deferred-module'

type Props = Omit<ComponentProps<typeof ResponsiveImage>, 'image'>

/**
 * The sizes of every library picture (about 330 KB gzip). They load on their own, so a library page
 * hydrates without waiting for them: the server loads them before it renders, so its HTML already
 * carries each picture's sizes, and the browser keeps that HTML until they arrive.
 */
const sizes = deferredModule(() => import('#/generated/library-responsive-images'))

/** Load the library picture sizes, so a render that follows draws every picture at once. */
export const loadLibraryImages = () => sizes.load()

loadAfterPageLoad(loadLibraryImages)

const SizedLibraryImage = lazyFrom(
  sizes,
  ({ GENERATED_LIBRARY_RESPONSIVE_IMAGES }) =>
    function LibraryImageWithSizes(props: Props) {
      const images: Readonly<Record<string, ComponentProps<typeof ResponsiveImage>['image']>> =
        GENERATED_LIBRARY_RESPONSIVE_IMAGES
      return <ResponsiveImage {...props} image={images[props.src]} />
    },
)

/** A library picture, holding its place with an empty box until the picture sizes arrive. */
export function LibraryImage(props: Props) {
  return (
    <Suspense fallback={<span aria-hidden className={`block ${props.className ?? ''}`} />}>
      <SizedLibraryImage {...props} />
    </Suspense>
  )
}
