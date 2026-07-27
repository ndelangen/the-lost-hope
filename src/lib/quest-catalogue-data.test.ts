import { describe, expect, it } from 'vitest'

import type { QuestCatalogueSource } from '#/lib/quest-catalogue-data'
import { buildQuestCatalogue } from '#/lib/quest-catalogue-data'

function source({
  name,
  type,
  status = 'open',
  campaignDaysAgo,
}: {
  name: string
  type: QuestCatalogueSource['quest']['type']
  status?: QuestCatalogueSource['quest']['status']
  campaignDaysAgo?: number
}): QuestCatalogueSource {
  return {
    slug: name.toLowerCase().replaceAll(' ', '-'),
    quest: {
      name,
      icon: 'test/QuestIcon',
      type,
      status,
    },
    progress: campaignDaysAgo === undefined ? undefined : { campaignDaysAgo },
  }
}

describe('buildQuestCatalogue', () => {
  it('groups open quests by objective, archives resolved quests, and sorts every section', () => {
    const data = buildQuestCatalogue([
      source({ name: 'Zulu Mission', type: 'mission', campaignDaysAgo: 3 }),
      source({ name: 'Beta Archive', type: 'mission', status: 'resolved' }),
      source({ name: 'Zulu Mystery', type: 'mystery', campaignDaysAgo: 1 }),
      source({ name: 'Alpha Archive', type: 'mystery', status: 'resolved' }),
      source({ name: 'Alpha Mystery', type: 'mystery', campaignDaysAgo: 0 }),
      source({ name: 'Alpha Mission', type: 'mission' }),
    ])

    expect(data.mysteries.map(({ name }) => name)).toEqual(['Alpha Mystery', 'Zulu Mystery'])
    expect(data.missions.map(({ name }) => name)).toEqual(['Alpha Mission', 'Zulu Mission'])
    expect(data.resolved.map(({ name }) => name)).toEqual(['Alpha Archive', 'Beta Archive'])
    expect(data.resolved.map(({ typeLabel }) => typeLabel)).toEqual(['Mystery', 'Mission'])
  })

  it('builds display-ready progress labels', () => {
    const data = buildQuestCatalogue([
      source({ name: 'Current', type: 'mystery', campaignDaysAgo: 0 }),
      source({ name: 'One Day', type: 'mystery', campaignDaysAgo: 1 }),
      source({ name: 'Several Days', type: 'mystery', campaignDaysAgo: 4 }),
      source({ name: 'Unlinked', type: 'mystery' }),
    ])

    expect(
      Object.fromEntries(data.mysteries.map(({ name, progressText }) => [name, progressText])),
    ).toEqual({
      Current: 'Current day',
      'One Day': '1 day ago',
      'Several Days': '4 days ago',
      Unlinked: 'No linked progress',
    })
  })
})
