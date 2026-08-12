import { createFileRoute, notFound } from '@tanstack/react-router'

import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { QuestInvestigation } from '#/components/quest-investigation'
import { Pill } from '#/components/ui/pill'
import { getEntity } from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'
import { publicEntityPageHead } from '#/lib/public-page-metadata'
import { questDetailData } from '#/lib/quest-detail-data'
import { QuestIcon } from '#/lib/quest-icons'

export const Route = createFileRoute('/quests/detail/$slug')({
  loader: ({ params }) => {
    const entity = getEntity('quest', params.slug)
    if (!entity) throw notFound()
    return entity
  },
  head: ({ params }) => publicEntityPageHead('quest', params.slug),
  component: QuestPage,
})

function QuestPage() {
  const { slug } = Route.useParams()
  const entity = Route.useLoaderData()

  const quest = entity.data
  const detail = questDetailData(quest)

  return (
    <EntityDetail
      kind="quest"
      title={quest.name}
      visual={{
        variant: 'icon',
        content: <QuestIcon icon={quest.icon} className="size-10" />,
      }}
      headerAside={
        <Pill variant={quest.status === 'open' ? 'warning' : 'success'}>{quest.status}</Pill>
      }
      correction={<EntityCorrectionSubmission entity={entity} />}
      referencedBy={referencedByItems('quest', slug)}
    >
      <QuestInvestigation detail={detail} conclusion={quest.conclusion} status={quest.status} />
    </EntityDetail>
  )
}
