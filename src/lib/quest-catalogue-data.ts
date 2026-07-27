import type { Quest, QuestType } from '#/definitions/quest'
import type { QuestProgress } from '#/lib/campaign'

export type QuestCatalogueSource = {
  slug: string
  quest: Pick<Quest, 'name' | 'icon' | 'type' | 'status'>
  progress?: Pick<QuestProgress, 'campaignDaysAgo'>
}

export type QuestCatalogueItem = {
  slug: string
  name: string
  icon: string
  type: QuestType
  typeLabel: string
  progressText: string
}

export type QuestCatalogueData = {
  mysteries: QuestCatalogueItem[]
  missions: QuestCatalogueItem[]
  resolved: QuestCatalogueItem[]
}

const QUEST_TYPE_LABELS: Record<QuestType, string> = {
  mystery: 'Mystery',
  mission: 'Mission',
}

function byName(left: QuestCatalogueItem, right: QuestCatalogueItem): number {
  return left.name.localeCompare(right.name)
}

export function questProgressText(
  progress: Pick<QuestProgress, 'campaignDaysAgo'> | undefined,
): string {
  if (!progress) return 'No linked progress'
  if (progress.campaignDaysAgo === 0) return 'Current day'
  const unit = progress.campaignDaysAgo === 1 ? 'day' : 'days'
  return `${progress.campaignDaysAgo} ${unit} ago`
}

/** Build the alphabetical, display-ready groups for the quest catalogue screen. */
export function buildQuestCatalogue(sources: readonly QuestCatalogueSource[]): QuestCatalogueData {
  const items = sources.map(({ slug, quest, progress }) => ({
    slug,
    name: quest.name,
    icon: quest.icon,
    type: quest.type,
    typeLabel: QUEST_TYPE_LABELS[quest.type],
    progressText: questProgressText(progress),
    status: quest.status,
  }))

  return {
    mysteries: items
      .filter((item) => item.status === 'open' && item.type === 'mystery')
      .toSorted(byName),
    missions: items
      .filter((item) => item.status === 'open' && item.type === 'mission')
      .toSorted(byName),
    resolved: items.filter((item) => item.status === 'resolved').toSorted(byName),
  }
}
