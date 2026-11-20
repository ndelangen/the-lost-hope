// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import type { SceneBranch } from '#/lib/scene-branches'

import { SceneBranches } from './scene-branches'

const branch = (id: string, when: string, followUps: SceneBranch[] = []): SceneBranch => ({
  id,
  icon: 'gi/GiConversation',
  when: [[when]],
  response: [[`Then ${when.toLowerCase()}`]],
  followUps,
  descendantCount: followUps.reduce((sum, child) => sum + 1 + child.descendantCount, 0),
})

const branches = [
  branch('1', 'They talk'),
  branch('2', 'They sneak', [branch('2.1', 'They are seen'), branch('2.2', 'They get in')]),
  branch('3', 'They fight'),
]

describe('SceneBranches', () => {
  afterEach(cleanup)

  it('shows every outcome as a tab and only the picked one’s response', () => {
    render(<SceneBranches branches={branches} label="If…" />)

    expect(screen.getAllByRole('tab')).toHaveLength(3)
    expect(screen.getByText('Then they talk')).toBeTruthy()
    expect(screen.queryByText('Then they sneak')).toBeNull()
    expect(screen.getByText('2 follow-ups')).toBeTruthy()

    fireEvent.click(screen.getByText('They sneak'))

    expect(screen.queryByText('Then they talk')).toBeNull()
    expect(screen.getByText('Then they sneak')).toBeTruthy()
    expect(screen.getByText('Then, if…')).toBeTruthy()
    expect(screen.getByText('Then they are seen')).toBeTruthy()
    expect(screen.queryByText('Then they get in')).toBeNull()
  })

  it('moves between tabs with the arrow keys, wrapping at the ends', () => {
    render(<SceneBranches branches={branches} />)
    const [first, , last] = screen.getAllByRole('tab')
    if (!first || !last) throw new Error('missing tabs')

    fireEvent.keyDown(first, { key: 'ArrowLeft' })
    expect(last.getAttribute('aria-selected')).toBe('true')
    expect(document.activeElement).toBe(last)

    fireEvent.keyDown(last, { key: 'ArrowRight' })
    expect(first.getAttribute('aria-selected')).toBe('true')

    fireEvent.keyDown(first, { key: 'End' })
    expect(screen.getByText('Then they fight')).toBeTruthy()
    fireEvent.keyDown(last, { key: 'Home' })
    expect(screen.getByText('Then they talk')).toBeTruthy()
  })

  it('shows a single outcome as one selected tab with its response', () => {
    render(<SceneBranches branches={[branch('1', 'They talk')]} />)

    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(1)
    expect(tabs[0]?.getAttribute('aria-selected')).toBe('true')
    expect(screen.getByText('Then they talk')).toBeTruthy()

    if (!tabs[0]) throw new Error('missing tab')
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' })
    expect(tabs[0].getAttribute('aria-selected')).toBe('true')
  })
})
