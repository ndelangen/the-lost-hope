import { createHash } from 'node:crypto'

import { describe, expect, it, vi } from 'vitest'

import submitCorrection, {
  config,
  createCorrectionSubmissionHandler,
  type IssueInput,
} from '../functions/submit-correction'

const accessCode = 'correct-shared-code'
const expectedAccessCodeHash = createHash('sha256').update(accessCode).digest('hex')
type CreateIssue = (issue: IssueInput) => Promise<void>
type Log = (entry: Record<string, string | number>) => void

const questionSubmission = {
  accessCode,
  context: {
    type: 'question',
    itemNumber: 12,
    itemMarkdown: '## Who was there?\r\n\r\n@Cassian was present.',
  },
  text: '  I remember @Cassian being there too.\r\n  ',
}

const entrySnapshot = {
  snapshotVersion: 1,
  entity: {
    kind: 'npc',
    slug: 'roberto',
    name: 'Roberto',
    path: '/npcs/detail/roberto',
  },
  data: {
    appeared: { $date: '2025-01-02T03:04:05.000Z' },
    location: {
      $ref: {
        kind: 'location',
        key: 'fairhaven',
        slug: 'fairhaven',
        name: 'Fairhaven',
      },
    },
    notes: 'A canonical ``` code-fence-like value.',
  },
}

const entrySubmission = {
  accessCode,
  context: {
    type: 'entry',
    snapshot: entrySnapshot,
  },
  text: 'Roberto also traded a map with @Jim.',
}

function createIssueMock() {
  return vi.fn<CreateIssue>(async () => undefined)
}

function logMock() {
  return vi.fn<Log>()
}

function requestFor(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request('https://campaign.example/api/corrections/submit', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
}

describe('POST /api/corrections/submit', () => {
  it('exports only the canonical route with the established platform rate limit', () => {
    expect(typeof submitCorrection).toBe('function')
    expect(config).toEqual({
      path: '/api/corrections/submit',
      rateLimit: {
        windowLimit: 10,
        windowSize: 60,
        aggregateBy: ['ip', 'domain'],
      },
    })
  })

  it('preserves the exact question issue output through the new context union', async () => {
    const createIssue = createIssueMock()
    const log = logMock()
    const handler = createCorrectionSubmissionHandler({
      expectedAccessCodeHash,
      createIssue,
      log,
    })

    const response = await handler(requestFor(questionSubmission), { requestId: 'question-123' })

    expect(response.status).toBe(201)
    expect(await response.json()).toEqual({ ok: true })
    expect(createIssue).toHaveBeenCalledTimes(1)
    expect(createIssue).toHaveBeenCalledWith({
      owner: 'ndelangen',
      repo: 'the-lost-hope',
      title: 'Submitted correction for item-12',
      body: [
        '> ## Who was there?',
        '> ',
        '> @\u200bCassian was present.',
        '',
        '## Submitted answer',
        '',
        'I remember @\u200bCassian being there too.',
      ].join('\n'),
      labels: ['submitted-correction'],
    })
    expect(log).toHaveBeenCalledWith({
      requestId: 'question-123',
      outcome: 'created',
      contextType: 'question',
      itemNumber: 12,
    })
  })

  it('creates the exact entry issue with canonical JSON and a safe fence', async () => {
    const createIssue = createIssueMock()
    const handler = createCorrectionSubmissionHandler({
      expectedAccessCodeHash,
      createIssue,
      log: logMock(),
    })

    const response = await handler(requestFor(entrySubmission), { requestId: 'entry-123' })

    expect(response.status).toBe(201)
    const issue = createIssue.mock.calls[0]?.[0]
    expect(issue).toBeDefined()
    if (!issue) throw new Error('Expected an issue')
    expect(issue.title).toBe('Submitted correction or addition for npc/roberto')
    expect(issue.labels).toEqual(['submitted-correction'])
    expect(issue.body).toBe(
      [
        '## Entry snapshot',
        '',
        '_Context captured from the page; current repository canon remains authoritative._',
        '',
        '````json',
        JSON.stringify(entrySnapshot, null, 2),
        '````',
        '',
        '## Submitted correction or addition',
        '',
        'Roberto also traded a map with @\u200bJim.',
      ].join('\n'),
    )
  })

  it('accepts a short shared code when its digest matches', async () => {
    const shortAccessCode = 'seven77'
    const createIssue = createIssueMock()
    const handler = createCorrectionSubmissionHandler({
      expectedAccessCodeHash: createHash('sha256').update(shortAccessCode).digest('hex'),
      createIssue,
      log: logMock(),
    })

    const response = await handler(
      requestFor({ ...entrySubmission, accessCode: shortAccessCode }),
      { requestId: 'short-code' },
    )

    expect(response.status).toBe(201)
    expect(await response.json()).toEqual({ ok: true })
    expect(createIssue).toHaveBeenCalledTimes(1)
  })

  it('rejects the obsolete flat payload and malformed context variants', async () => {
    const createIssue = createIssueMock()
    const handler = createCorrectionSubmissionHandler({
      expectedAccessCodeHash,
      createIssue,
      log: logMock(),
    })
    const invalidBodies = [
      {
        accessCode,
        itemNumber: 1,
        itemMarkdown: 'Question context',
        answer: 'A sufficiently long correction.',
      },
      { ...questionSubmission, unexpected: true },
      {
        ...questionSubmission,
        context: { ...questionSubmission.context, type: 'unknown' },
      },
      {
        ...questionSubmission,
        context: { type: 'question', itemNumber: 1, itemMarkdown: 'Question', snapshot: {} },
      },
      {
        ...entrySubmission,
        context: {
          type: 'entry',
          snapshot: {
            ...entrySnapshot,
            entity: { ...entrySnapshot.entity, path: '/npcs/detail/someone-else' },
          },
        },
      },
      {
        ...entrySubmission,
        context: {
          type: 'entry',
          snapshot: {
            ...entrySnapshot,
            data: { date: { $date: 'not-an-iso-date' } },
          },
        },
      },
      { ...questionSubmission, text: 'too short' },
      { ...questionSubmission, text: 'A valid correction\u0000 with a NUL.' },
    ]

    const results = await Promise.all(
      invalidBodies.map(async (body) => {
        const response = await handler(requestFor(body), { requestId: 'invalid-payload' })
        return { status: response.status, body: await response.json() }
      }),
    )

    for (const result of results) {
      expect(result.status).toBe(400)
      expect(result.body).toEqual({ ok: false, code: 'invalid_request' })
    }
    expect(createIssue).not.toHaveBeenCalled()
  })

  it('enforces the snapshot and complete-request byte limits', async () => {
    const createIssue = createIssueMock()
    const handler = createCorrectionSubmissionHandler({
      expectedAccessCodeHash,
      createIssue,
      log: logMock(),
    })
    const oversizedSnapshot = {
      ...entrySubmission,
      context: {
        type: 'entry',
        snapshot: {
          ...entrySnapshot,
          data: { notes: 'x'.repeat(32_769) },
        },
      },
    }

    const snapshotResponse = await handler(requestFor(oversizedSnapshot), {
      requestId: 'snapshot-limit',
    })
    const requestResponse = await handler(requestFor(' '.repeat(65_537)), {
      requestId: 'request-limit',
    })

    expect(snapshotResponse.status).toBe(400)
    expect(requestResponse.status).toBe(413)
    expect(createIssue).not.toHaveBeenCalled()
  })

  it('retains the established method, origin, and content-type rejection', async () => {
    const createIssue = createIssueMock()
    const handler = createCorrectionSubmissionHandler({
      expectedAccessCodeHash,
      createIssue,
      log: logMock(),
    })
    const requests = [
      new Request('https://campaign.example/api/corrections/submit', { method: 'GET' }),
      requestFor(questionSubmission, { origin: 'https://attacker.example' }),
      requestFor(questionSubmission, { 'sec-fetch-site': 'cross-site' }),
      new Request('https://campaign.example/api/corrections/submit', {
        method: 'POST',
        headers: { 'content-type': 'text/plain' },
        body: JSON.stringify(questionSubmission),
      }),
    ]

    const responses = await Promise.all(
      requests.map((request) => handler(request, { requestId: 'transport-rejection' })),
    )

    expect(responses.map((response) => response.status)).toEqual([405, 403, 403, 400])
    expect(createIssue).not.toHaveBeenCalled()
  })

  it('denies revoked access and fails closed without retrying or leaking content', async () => {
    const upstreamFailure = vi.fn<CreateIssue>(async () => {
      throw new Error('GitHub included submitted secret content')
    })
    const wrongCodeLog = logMock()
    const failureLog = logMock()
    const deniedHandler = createCorrectionSubmissionHandler({
      expectedAccessCodeHash,
      createIssue: createIssueMock(),
      log: wrongCodeLog,
    })
    const failureHandler = createCorrectionSubmissionHandler({
      expectedAccessCodeHash,
      createIssue: upstreamFailure,
      log: failureLog,
    })

    const denied = await deniedHandler(
      requestFor({ ...entrySubmission, accessCode: 'wrong-shared-code!' }),
      { requestId: 'denied' },
    )
    const failed = await failureHandler(requestFor(entrySubmission), { requestId: 'failed' })

    expect(denied.status).toBe(401)
    expect(await denied.json()).toEqual({ ok: false, code: 'access_denied' })
    expect(failed.status).toBe(502)
    expect(await failed.json()).toEqual({ ok: false, code: 'submission_failed' })
    expect(upstreamFailure).toHaveBeenCalledTimes(1)
    expect(JSON.stringify(wrongCodeLog.mock.calls)).not.toContain('wrong-shared-code')
    expect(JSON.stringify(failureLog.mock.calls)).not.toContain('Roberto')
    expect(JSON.stringify(failureLog.mock.calls)).not.toContain('GitHub included')
  })
})
