import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { QuestInvestigation } from '#/components/quest-investigation'
import type { QuestDetailData } from '#/lib/quest-detail-data'

function questDetail(openQuestions: QuestDetailData['openQuestions'] = []): QuestDetailData {
  return {
    discoveries: [{ position: 1, content: [['A recorded discovery.']] }],
    openQuestions,
    totalClues: 1 + openQuestions.length,
    linkedEventCount: 0,
  }
}

describe('QuestInvestigation', () => {
  it('uses the full reading column for resolved quests', () => {
    const markup = renderToStaticMarkup(
      <QuestInvestigation detail={questDetail()} conclusion={[]} status="resolved" />,
    )

    expect(markup).toContain('Investigation trail')
    expect(markup).toContain('max-w-3xl')
    expect(markup).not.toContain('Open questions')
    expect(markup).not.toContain('Thread state')
  })

  it('keeps investigation context beside open quests', () => {
    const markup = renderToStaticMarkup(
      <QuestInvestigation
        detail={questDetail([{ position: 2, content: [['What remains unknown?']] }])}
        conclusion={[]}
        status="open"
      />,
    )

    expect(markup).toContain('Open question')
    expect(markup).toContain('Thread state')
    expect(markup).toContain('lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]')
  })
})
