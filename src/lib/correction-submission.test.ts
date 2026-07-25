import { describe, expect, it, vi } from 'vitest'

import { submitCorrection, type CorrectionSubmission } from './correction-submission'

const submission: CorrectionSubmission = {
  accessCode: 'correct-shared-code',
  context: {
    type: 'question',
    itemNumber: 1,
    itemMarkdown: 'Question context',
  },
  text: 'A sufficiently long correction.',
}

describe('submitCorrection', () => {
  it('posts the exact shared contract to the canonical endpoint', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(Response.json({ ok: true }, { status: 201 }))

    await expect(submitCorrection(submission, fetcher)).resolves.toEqual({ ok: true })
    expect(fetcher).toHaveBeenCalledWith('/api/corrections/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(submission),
    })
  })

  it('distinguishes revoked access from recoverable failures without retrying', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(Response.json({ ok: false, code: 'access_denied' }, { status: 401 }))
      .mockRejectedValueOnce(new Error('offline'))

    await expect(submitCorrection(submission, fetcher)).resolves.toEqual({
      ok: false,
      status: 401,
      code: 'access_denied',
    })
    await expect(submitCorrection(submission, fetcher)).resolves.toEqual({
      ok: false,
      code: 'submission_failed',
    })
    expect(fetcher).toHaveBeenCalledTimes(2)
  })
})
