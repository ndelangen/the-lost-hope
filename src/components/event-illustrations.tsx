import { ImageViewer } from '#/components/image-viewer'
import { cn } from '#/lib/utils'

/** The pictures the players were shown during an event, each opening full screen. */
export function EventIllustrations({
  illustrations,
  eventName,
  className,
}: {
  illustrations: readonly string[]
  eventName: string
  className?: string
}) {
  if (illustrations.length === 0) return null
  const single = illustrations.length === 1

  return (
    <div className={cn('grid gap-2', !single && 'sm:grid-cols-2', className)}>
      {illustrations.map((src, index) => (
        <ImageViewer
          key={src}
          src={src}
          alt={single ? eventName : `${eventName}, picture ${index + 1}`}
          title={eventName}
          eyebrow="Event illustration"
          accessibleLabel={`illustration of ${eventName}`}
          previewSizes={
            single ? '(min-width: 1024px) 760px, 100vw' : '(min-width: 640px) 380px, 100vw'
          }
          previewMaxWidth={single ? 1280 : 768}
          className={cn(
            'w-full',
            single ? 'aspect-[16/9]' : 'aspect-[3/2]',
            !single &&
              index === 0 &&
              illustrations.length % 2 === 1 &&
              'sm:col-span-2 sm:aspect-[16/9]',
          )}
        />
      ))}
    </div>
  )
}
