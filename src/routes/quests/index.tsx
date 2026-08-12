import { createFileRoute } from '@tanstack/react-router'

import { QuestCatalogue } from '#/components/quest-catalogue'
import { allEntities, questProgress } from '#/lib/campaign'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'
import { buildQuestCatalogue } from '#/lib/quest-catalogue-data'

export const Route = createFileRoute('/quests/')({
  head: () => publicPageHeadForPath('/quests'),
  component: QuestsPage,
})

function QuestsPage() {
  const data = buildQuestCatalogue(
    allEntities('quest').map((quest) => ({
      slug: quest.slug,
      quest: quest.data,
      progress: questProgress(quest.data),
    })),
  )

  return <QuestCatalogue data={data} />
}
