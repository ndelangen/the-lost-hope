import type { Content } from '#/definitions/content'
import type { Quest } from '#/definitions/quest'
import {
  contentToText,
  eventLocation,
  questProgress,
  resolveRef,
  sessionNumber,
  sessionSlugForEvent,
  type EntityOf,
} from '#/lib/campaign'
import { collectReferences } from '#/lib/campaign-read-model'

export type QuestClueSource = {
  eventSlug: string
  day: number
  sessionNumber?: number
  locationSlug?: string
}

export type QuestClueEntry = {
  position: number
  content: Content
  source?: QuestClueSource
}

export type QuestDetailData = {
  summary?: Content
  discoveries: QuestClueEntry[]
  openQuestions: QuestClueEntry[]
  totalClues: number
  linkedEventCount: number
  latestActivity?: QuestClueSource & { campaignDaysAgo: number }
}

function normalizedText(value: string): string {
  return value
    .toLocaleLowerCase()
    .replaceAll(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

function eventSource(event: EntityOf<'event'>): QuestClueSource {
  const place = eventLocation(event.data)
  const sessionSlug = sessionSlugForEvent(event.slug)
  return {
    eventSlug: event.slug,
    day: event.data.day,
    sessionNumber: sessionSlug ? sessionNumber(sessionSlug) : undefined,
    locationSlug: place?.slug,
  }
}

function clueSource(content: Content): QuestClueSource | undefined {
  const eventRef = collectReferences(content).find((ref) => ref.ref === 'event')
  if (!eventRef) return undefined

  const event = resolveRef(eventRef)
  return event?.kind === 'event' ? eventSource(event) : undefined
}

function isOpenQuestion(entry: QuestClueEntry): boolean {
  if (entry.source) return false
  const text = contentToText(entry.content).trim()
  return /\?|^open:\s|\bunknown\b|\bunconfirmed\b/i.test(text)
}

/** Build the display-ready, ordered investigation model for a quest detail screen. */
export function questDetailData(quest: Quest): QuestDetailData {
  const entries = quest.clues.map((clue, index): QuestClueEntry => {
    const content: Content = [clue]
    return { position: index + 1, content, source: clueSource(content) }
  })
  const progress = questProgress(quest)
  const summaryText = contentToText(quest.notes)

  return {
    summary:
      normalizedText(summaryText) === normalizedText(quest.name) || !summaryText.trim()
        ? undefined
        : quest.notes,
    discoveries: entries.filter((entry) => !isOpenQuestion(entry)),
    openQuestions: entries.filter(isOpenQuestion),
    totalClues: entries.length,
    linkedEventCount: new Set(
      entries.flatMap((entry) => (entry.source ? [entry.source.eventSlug] : [])),
    ).size,
    latestActivity: progress
      ? { ...eventSource(progress.event), campaignDaysAgo: progress.campaignDaysAgo }
      : undefined,
  }
}
