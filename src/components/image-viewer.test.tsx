// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { DEFAULT_AVATAR } from '#/definitions/media'

import { ImageViewer } from './image-viewer'

describe('ImageViewer', () => {
  afterEach(() => {
    cleanup()
    document.body.style.overflow = ''
  })

  it('uses caller-provided semantics and restores focus after closing', () => {
    render(
      <ImageViewer
        src="/assets/locations/placeholder.svg"
        alt="Illustration of Fairhaven"
        title="Fairhaven"
        eyebrow="Location illustration"
        accessibleLabel="illustration of Fairhaven"
      />,
    )

    const trigger = screen.getByRole('button', { name: 'View a larger illustration of Fairhaven' })
    fireEvent.click(trigger)

    expect(screen.getByRole('dialog', { name: 'Fairhaven' })).toBeTruthy()
    expect(screen.getByText('Location illustration')).toBeTruthy()
    expect(screen.getAllByAltText('Illustration of Fairhaven')).toHaveLength(2)
    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(screen.queryByRole('dialog', { name: 'Fairhaven' })).toBeNull()
    expect(document.body.style.overflow).toBe('')
    expect(document.activeElement).toBe(trigger)
  })

  it('uses a supplied fallback without imposing it on every image', () => {
    const { rerender } = render(
      <ImageViewer
        src="/assets/pcs/missing.png"
        fallbackSrc={DEFAULT_AVATAR}
        alt="Jim"
        title="Jim"
        eyebrow="Player character portrait"
        accessibleLabel="portrait of Jim"
      />,
    )

    const avatar = screen.getByAltText('Jim') as HTMLImageElement
    fireEvent.error(avatar)
    expect(avatar.getAttribute('src')).toBe(DEFAULT_AVATAR)

    rerender(
      <ImageViewer
        src="/assets/locations/missing.png"
        alt="Illustration of Fairhaven"
        title="Fairhaven"
        eyebrow="Location illustration"
        accessibleLabel="illustration of Fairhaven"
      />,
    )
    const illustration = screen.getByAltText('Illustration of Fairhaven') as HTMLImageElement
    fireEvent.error(illustration)
    expect(illustration.getAttribute('src')).toBe('/assets/locations/missing.png')
  })

  it('does not mount the large portrait candidate before the viewer opens', () => {
    render(
      <ImageViewer
        src="/assets/pcs/jim.jpg"
        fallbackSrc={DEFAULT_AVATAR}
        alt="Jim"
        title="Jim"
        eyebrow="Player character portrait"
        accessibleLabel="portrait of Jim"
      />,
    )

    expect(screen.getAllByAltText('Jim')).toHaveLength(1)
    expect(screen.getByAltText('Jim').getAttribute('sizes')).toBe('160px')

    fireEvent.click(screen.getByRole('button', { name: 'View a larger portrait of Jim' }))

    const images = screen.getAllByAltText('Jim')
    expect(images).toHaveLength(2)
    expect(images.some((image) => image.getAttribute('sizes') === '100vw')).toBe(true)
  })
})
