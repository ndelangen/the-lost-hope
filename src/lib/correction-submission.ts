import type { EntrySnapshotV1 } from '#/lib/entry-snapshot'

export type QuestionCorrectionContext = {
  type: 'question'
  itemNumber: number
  itemMarkdown: string
}

export type EntryCorrectionContext = {
  type: 'entry'
  snapshot: EntrySnapshotV1
}

export type CorrectionContext = QuestionCorrectionContext | EntryCorrectionContext

export type CorrectionSubmission = {
  accessCode: string
  context: CorrectionContext
  text: string
}

export type CorrectionSubmissionResult =
  | { ok: true }
  | {
      ok: false
      status?: number
      code: 'access_denied' | 'submission_failed'
    }

export async function submitCorrection(
  submission: CorrectionSubmission,
  fetcher: typeof fetch = fetch,
): Promise<CorrectionSubmissionResult> {
  try {
    const response = await fetcher('/api/corrections/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(submission),
    })

    if (response.ok) return { ok: true }
    if (response.status === 401) {
      return { ok: false, status: response.status, code: 'access_denied' }
    }
    return { ok: false, status: response.status, code: 'submission_failed' }
  } catch {
    return { ok: false, code: 'submission_failed' }
  }
}
