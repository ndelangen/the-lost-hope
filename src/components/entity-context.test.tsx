// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { getEntity } from '#/lib/campaign'
import { entityContextData, type ContextEntity } from '#/lib/entity-context-data'

import { EntityContext } from './entity-context'

vi.mock('#/components/entity-reference', () => ({
  EntityReference: ({ kind, slug, label }: ContextEntity & { label?: string }) => (
    <a href={`/${kind}/${slug}`}>{label ?? getEntity(kind, slug)?.data.name}</a>
  ),
}))

describe('EntityContext', () => {
  afterEach(cleanup)

  it('filters quest-linked events without claiming that the events reference the quest', () => {
    const data = entityContextData(getEntity('quest', 'settle-the-shipwright-s-favors')!)
    render(<EntityContext data={data} />)

    fireEvent.change(screen.getByLabelText('Explore shared history'), {
      target: { value: 'npc:esia' },
    })

    expect(
      screen.getByText(
        'These linked events mention the selected person. A shared record does not establish an encounter.',
      ),
    ).toBeTruthy()
    expect(screen.queryByText(/Both are referenced/)).toBeNull()
    expect(
      screen.getAllByRole('heading', { level: 4 }).map((heading) => heading.textContent),
    ).toEqual([
      'The shipwright describes grievances against the Tempests',
      'The party commissions an airship for gold and two favors',
    ])
    expect(screen.getAllByText('Linked event')).toHaveLength(2)
  })
})
