import type { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { QuestCatalogue } from '#/components/quest-catalogue'
import type { QuestCatalogueData, QuestCatalogueItem } from '#/lib/quest-catalogue-data'

vi.mock('#/components/entity-reference', () => ({
  EntityReference: ({
    slug,
    children,
    className,
  }: {
    slug: string
    children: () => ReactNode
    className?: string
  }) => (
    <a href={`/quests/${slug}`} className={className}>
      {children()}
    </a>
  ),
}))

vi.mock('#/lib/quest-icons', () => ({
  QuestIcon: ({ icon }: { icon: string }) => <span data-quest-icon={icon} />,
}))

function item({
  name,
  type = 'mystery',
}: {
  name: string
  type?: QuestCatalogueItem['type']
}): QuestCatalogueItem {
  return {
    slug: name.toLowerCase().replaceAll(' ', '-'),
    name,
    icon: 'test/QuestIcon',
    type,
    typeLabel: type === 'mystery' ? 'Mystery' : 'Mission',
    progressText: '2 days ago',
  }
}

describe('QuestCatalogue', () => {
  it('renders the approved stacked field index with resolved records last', () => {
    const data: QuestCatalogueData = {
      mysteries: [item({ name: 'Alpha Mystery' }), item({ name: 'Zulu Mystery' })],
      missions: [item({ name: 'Assigned Mission', type: 'mission' })],
      resolved: [item({ name: 'Closed Mission', type: 'mission' })],
    }

    const markup = renderToStaticMarkup(<QuestCatalogue data={data} />)

    expect(markup).toContain('Questions to unravel')
    expect(markup).toContain('Commitments to complete')
    expect(markup).toContain('Closed records')
    expect(markup).toContain('<dd class="text-xl font-semibold">2</dd>')
    expect(markup).toContain('href="/quests/alpha-mystery"')
    expect(markup).toContain('2 days ago')
    expect(markup).toContain('Closed Mission')
    expect(markup).toContain('Mission')
    expect(markup.indexOf('Mysteries')).toBeLessThan(markup.indexOf('Missions'))
    expect(markup.indexOf('Missions')).toBeLessThan(markup.indexOf('Resolved'))
    expect(markup.indexOf('Alpha Mystery')).toBeLessThan(markup.indexOf('Zulu Mystery'))
    expect(markup.indexOf('Assigned Mission')).toBeLessThan(markup.indexOf('Closed Mission'))
  })

  it('keeps all three catalogue sections visible when they are empty', () => {
    const markup = renderToStaticMarkup(
      <QuestCatalogue data={{ mysteries: [], missions: [], resolved: [] }} />,
    )

    expect(markup.match(/No entries\./g)).toHaveLength(3)
  })
})
