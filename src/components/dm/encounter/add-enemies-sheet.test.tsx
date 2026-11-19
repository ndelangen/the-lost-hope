// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { EnemyCandidate } from '#/lib/dm-encounter'
import type { Arrival } from '#/lib/encounter'
import { partyBudget } from '#/lib/encounter-difficulty'

import { AddEnemiesSheet, type EnemyPick } from './add-enemies-sheet'

const snatcher: EnemyCandidate = {
  source: { ref: 'npc', key: 'snatcher' },
  name: 'Snatcher',
  kind: 'NPC',
  cr: '1/2',
}
const wolf: EnemyCandidate = {
  source: { ref: 'beast', key: 'wolf' },
  name: 'Wolf',
  kind: 'Beast',
  cr: '1/4',
}

function sheet(
  onAdd = vi.fn<(picks: EnemyPick[], arrival: Arrival) => void>(),
  activeName?: string,
) {
  render(
    <AddEnemiesSheet
      open
      onClose={() => {}}
      sceneName="The bow"
      sceneEnemies={[snatcher]}
      candidates={[snatcher, wolf]}
      budget={partyBudget([5, 5, 5, 5])}
      standingXp={500}
      activeName={activeName}
      onAdd={onAdd}
    />,
  )
  return onAdd
}

describe('AddEnemiesSheet', () => {
  afterEach(cleanup)

  it('adds a count of the scene enemies and anyone found by search, at the chosen time', () => {
    const onAdd = sheet(vi.fn<(picks: EnemyPick[], arrival: Arrival) => void>(), 'Devan')
    expect(screen.getByRole('button', { name: 'Pick enemies to add' })).toHaveProperty(
      'disabled',
      true,
    )
    const more = screen.getByRole('button', { name: 'One more Snatcher' })
    fireEvent.click(more)
    fireEvent.click(more)
    fireEvent.click(more)
    fireEvent.click(screen.getByRole('button', { name: 'One fewer Snatcher' }))
    fireEvent.change(screen.getByLabelText('Anyone else'), { target: { value: 'wol' } })
    fireEvent.click(screen.getByRole('button', { name: /Wolf/ }))
    fireEvent.click(screen.getByRole('button', { name: 'Right after Devan' }))
    expect(screen.getByText(/with these/)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Add 3 enemies' }))
    expect(onAdd).toHaveBeenCalledWith(
      [
        { source: snatcher.source, count: 2 },
        { source: wolf.source, count: 1 },
      ],
      'next',
    )
  })

  it('only offers the end of the round before anyone has a turn', () => {
    sheet()
    expect(screen.getByRole('button', { name: 'Right after this turn' })).toHaveProperty(
      'disabled',
      true,
    )
  })
})
