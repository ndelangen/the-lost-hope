import { describe, expect, it } from 'vitest'

import { allEntities, getEntity } from '#/lib/campaign'
import { questDetailData } from '#/lib/quest-detail-data'

describe('questDetailData', () => {
  it('turns the dinosaur quest into an ordered, source-aware investigation trail', () => {
    const quest = getEntity('quest', 'the-dinosaur-migration')
    expect(quest).toBeDefined()
    if (!quest) return

    const detail = questDetailData(quest.data)

    expect(detail.summary).toBeUndefined()
    expect(detail.totalClues).toBe(4)
    expect(detail.linkedEventCount).toBe(3)
    expect(detail.discoveries.map((entry) => entry.position)).toEqual([1, 2, 3])
    expect(detail.openQuestions.map((entry) => entry.position)).toEqual([4])
    expect(detail.discoveries.map((entry) => entry.source?.day)).toEqual([10, 10, 10])
    expect(detail.latestActivity).toMatchObject({
      eventSlug: 'reach-badesh-victor-s-hometown',
      day: 10,
      campaignDaysAgo: 8,
    })
  })

  it('keeps an event-backed uncertainty in the ordered trail', () => {
    const quest = getEntity('quest', 'the-dinosaur-migration')
    expect(quest).toBeDefined()
    if (!quest) return

    const detail = questDetailData(quest.data)

    expect(detail.discoveries[2]?.source?.eventSlug).toBe('reach-badesh-victor-s-hometown')
    expect(detail.openQuestions).toHaveLength(1)
  })

  it('partitions every quest clue once without changing its authored position', () => {
    for (const quest of allEntities('quest')) {
      const detail = questDetailData(quest.data)
      const positions = [...detail.discoveries, ...detail.openQuestions]
        .map((entry) => entry.position)
        .toSorted((a, b) => a - b)

      expect(positions).toEqual(quest.data.clues.map((_, index) => index + 1))
    }
  })
})
