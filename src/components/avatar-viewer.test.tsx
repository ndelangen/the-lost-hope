// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { AvatarViewer } from './avatar-viewer'

describe('AvatarViewer', () => {
  afterEach(() => {
    cleanup()
    document.body.style.overflow = ''
  })

  it('opens an immersive dialog and restores page scrolling when closed', () => {
    render(
      <AvatarViewer src="/assets/pcs/jim.jpg" name="Jim" eyebrow="Player character portrait" />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'View a larger portrait of Jim' }))

    expect(screen.getByRole('dialog', { name: 'Jim' })).toBeTruthy()
    expect(screen.getByText('Player character portrait')).toBeTruthy()
    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(screen.queryByRole('dialog', { name: 'Jim' })).toBeNull()
    expect(document.body.style.overflow).toBe('')
  })
})
