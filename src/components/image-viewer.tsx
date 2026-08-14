import { Expand, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { publicAssetUrl } from '#/lib/public-media'
import { cn } from '#/lib/utils'

type ImageViewerProps = {
  src: string
  alt: string
  title: string
  eyebrow: string
  accessibleLabel: string
  fallbackSrc?: string
  className?: string
}

export function ImageViewer({
  src,
  alt,
  title,
  eyebrow,
  accessibleLabel,
  fallbackSrc,
  className,
}: ImageViewerProps) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  const close = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (typeof dialog.close === 'function') {
      dialog.close()
    } else {
      dialog.removeAttribute('open')
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    if (!open) return

    const dialog = dialogRef.current
    if (!dialog) return

    const previousOverflow = document.body.style.overflow
    const trigger = triggerRef.current
    document.body.style.overflow = 'hidden'

    if (typeof dialog.showModal === 'function') {
      dialog.showModal()
    } else {
      dialog.setAttribute('open', '')
    }
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      close()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (dialog.open && typeof dialog.close === 'function') dialog.close()
      trigger?.focus()
    }
  }, [close, open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View a larger ${accessibleLabel}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          'group relative size-full cursor-zoom-in overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
          className,
        )}
      >
        <ViewerImage
          src={src}
          fallbackSrc={fallbackSrc}
          alt={alt}
          loading="lazy"
          className="size-full object-cover"
        />
        <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20 group-focus-visible:bg-black/20" />
        <span className="absolute right-2 bottom-2 rounded-full bg-black/70 p-2 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Expand className="size-4" aria-hidden />
        </span>
      </button>

      {open
        ? createPortal(
            <dialog
              ref={dialogRef}
              aria-labelledby={titleId}
              onClose={() => setOpen(false)}
              className="fixed inset-0 z-[200] m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-[#090a0d] p-0 text-white backdrop:bg-black"
            >
              <button
                type="button"
                onClick={close}
                aria-label={`Close ${accessibleLabel} viewer`}
                tabIndex={-1}
                className="absolute inset-0 z-0 cursor-zoom-out"
              />

              <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center p-3 sm:p-8">
                <ViewerImage
                  src={src}
                  fallbackSrc={fallbackSrc}
                  alt={alt}
                  className="h-full w-full object-contain [filter:drop-shadow(0_32px_48px_rgb(0_0_0/0.55))]"
                />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-56 bg-gradient-to-t from-black via-black/45 to-transparent" />
              <div className="pointer-events-none absolute right-6 bottom-6 left-6 z-30 sm:right-10 sm:bottom-9 sm:left-10">
                <p className="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
                  {eyebrow}
                </p>
                <h2
                  id={titleId}
                  className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl"
                >
                  {title}
                </h2>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={`Close larger ${accessibleLabel}`}
                className="absolute top-5 right-5 z-40 grid size-11 place-items-center rounded-full bg-black/55 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-black/75 focus-visible:ring-2 focus-visible:ring-white sm:top-8 sm:right-8"
              >
                <X className="size-5" aria-hidden />
              </button>
            </dialog>,
            document.body,
          )
        : null}
    </>
  )
}

function ViewerImage({
  src,
  fallbackSrc,
  alt,
  className,
  loading,
}: {
  src: string
  fallbackSrc?: string
  alt: string
  className: string
  loading?: 'eager' | 'lazy'
}) {
  return (
    <img
      src={publicAssetUrl(src, fallbackSrc ?? src)}
      alt={alt}
      loading={loading}
      className={className}
      onError={
        fallbackSrc
          ? (event) => {
              const image = event.currentTarget
              if (image.dataset.fallbackApplied) return
              image.dataset.fallbackApplied = 'true'
              image.src = fallbackSrc
            }
          : undefined
      }
    />
  )
}
