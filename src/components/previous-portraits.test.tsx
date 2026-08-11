// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { PreviousPortraits } from './previous-portraits'

describe('PreviousPortraits', () => {
  afterEach(() => {
    cleanup()
    document.body.style.overflow = ''
  })

  it('shows described thumbnails that open in the portrait viewer', () => {
    render(
      <PreviousPortraits
        characterName="Jim"
        portraits={[
          {
            url: '/assets/pcs/jim-kenku.jpg',
            description: 'Jim wearing his former kenku disguise',
          },
        ]}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Previous portraits' })).toBeTruthy()
    expect(screen.getByAltText('Jim wearing his former kenku disguise')).toBeTruthy()
    expect(screen.getByText('Jim wearing his former kenku disguise')).toBeTruthy()

    fireEvent.click(
      screen.getByRole('button', {
        name: 'View a larger portrait of Jim wearing his former kenku disguise',
      }),
    )

    expect(
      screen.getByRole('dialog', { name: 'Jim wearing his former kenku disguise' }),
    ).toBeTruthy()
    expect(screen.getByText('Previous portrait of Jim')).toBeTruthy()
  })
})
