// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { AbilityIndexEntry, AbilityIndexGroup } from '#/lib/ability-index'

import { AbilityQuickList } from './ability-quick-list'

afterEach(cleanup)

const groups: AbilityIndexGroup[] = [
  {
    key: 'action',
    label: 'Actions',
    entries: [
      {
        key: 'silence',
        name: 'Silence',
        icon: 'gi/GiSilence',
        kind: 'other',
        uses: 3,
        anchor: 'ability-silence',
      },
      {
        key: 'rapier',
        name: 'Rapier',
        icon: 'no/SuchIcon',
        kind: 'melee',
        anchor: 'ability-rapier',
      },
    ],
  },
]

describe('AbilityQuickList', () => {
  it('links each ability to its card on the page', () => {
    render(<AbilityQuickList groups={groups} />)
    expect(screen.getByRole('navigation', { name: 'Abilities and spells' })).toBeTruthy()
    expect(screen.getByText('Actions')).toBeTruthy()
    expect(screen.getByRole('link', { name: /Silence/ }).getAttribute('href')).toBe(
      '#ability-silence',
    )
    expect(screen.getByRole('link', { name: /Silence/ }).textContent).toContain('3×')
    expect(screen.getByRole('link', { name: 'Rapier' })).toBeTruthy()
  })

  it('hands the choice to the caller when asked, and marks the open one', () => {
    const onSelect = vi.fn<(entry: AbilityIndexEntry) => void>()
    render(<AbilityQuickList groups={groups} current="rapier" onSelect={onSelect} />)
    const rapier = screen.getByRole('button', { name: 'Rapier' })
    expect(rapier.getAttribute('aria-pressed')).toBe('true')
    fireEvent.click(screen.getByRole('button', { name: /Silence/ }))
    expect(onSelect).toHaveBeenCalledWith(groups[0]!.entries[0])
  })

  it('renders nothing for a creature without abilities', () => {
    const { container } = render(<AbilityQuickList groups={[]} />)
    expect(container.innerHTML).toBe('')
  })
})
