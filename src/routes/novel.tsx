import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import { z } from 'zod'

import { NovelReader } from '#/components/novel/novel-reader'
import { buildNovel, novelArtCoverage, novelUnplacedEvents } from '#/lib/novel-data'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/novel')({
  head: () => publicPageHeadForPath('/novel'),
  validateSearch: z.object({ page: z.coerce.number().int().positive().optional() }),
  component: NovelRoute,
})

const novel = buildNovel()
const { chapters, pages } = novel
const coverage = novelArtCoverage(novel)
const unplaced = novelUnplacedEvents(novel)
const status = [
  ...(coverage.missing ? [`${coverage.missing} missing`] : []),
  ...(coverage.regenerate ? [`${coverage.regenerate} to regenerate`] : []),
  ...(coverage.extend ? [`${coverage.extend} to extend`] : []),
  ...(unplaced.length ? [`${unplaced.length} events without a panel`] : []),
].join(' · ')

function NovelRoute() {
  const { page = 1 } = Route.useSearch()
  const navigate = useNavigate({ from: '/novel' })
  const turnTo = useCallback(
    (next: number) => void navigate({ search: { page: next }, replace: true }),
    [navigate],
  )

  return (
    <NovelReader
      chapters={chapters}
      pages={pages}
      page={page}
      onPageChange={turnTo}
      status={status}
    />
  )
}
