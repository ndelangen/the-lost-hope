import { createHash } from 'node:crypto'

import { describe, expect, it, vi } from 'vitest'

import submitQuestion, {
  config,
  createQuestionSubmissionHandler,
  type IssueInput,
} from '../functions/submit-question'

const accessCode = 'correct-shared-code'
const expectedAccessCodeHash = createHash('sha256').update(accessCode).digest('hex')
type CreateIssue = (issue: IssueInput) => Promise<void>
type Log = (entry: Record<string, string | number>) => void

function createIssueMock() {
  return vi.fn<CreateIssue>(async () => undefined)
}

function logMock() {
  return vi.fn<Log>()
}

describe('POST /api/questions/submit', () => {
  it('exports a deployable Netlify handler', () => {
    expect(typeof submitQuestion).toBe('function')
  })

  it('exposes only the custom route with the agreed platform rate limit', () => {
    expect(config).toEqual({
      path: '/api/questions/submit',
      rateLimit: {
        windowLimit: 10,
        windowSize: 60,
        aggregateBy: ['ip', 'domain'],
      },
    })
  })

  it('creates one review issue for a valid correction', async () => {
    const createIssue = createIssueMock()
    const log = logMock()
    const handler = createQuestionSubmissionHandler({
      expectedAccessCodeHash,
      createIssue,
      log,
    })
    const request = new Request('https://campaign.example/api/questions/submit', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'https://campaign.example',
        'sec-fetch-site': 'same-origin',
      },
      body: JSON.stringify({
        accessCode,
        itemNumber: 12,
        itemMarkdown: '## Who was there?\r\n\r\n@Cassian was present.',
        answer: '  I remember @Cassian being there too.\r\n  ',
      }),
    })

    const response = await handler(request, { requestId: 'request-123' })

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
      requestId: 'request-123',
      outcome: 'created',
      itemNumber: 12,
    })
  })

  it('rejects invalid transport requests before GitHub is contacted', async () => {
    const createIssue = createIssueMock()
    const handler = createQuestionSubmissionHandler({
      expectedAccessCodeHash,
      createIssue,
      log: logMock(),
    })
    const validBody = JSON.stringify({
      accessCode,
      itemNumber: 1,
      itemMarkdown: 'Question context',
      answer: 'A sufficiently long correction.',
    })
    const cases = [
      {
        request: new Request('https://campaign.example/api/questions/submit', { method: 'GET' }),
        status: 405,
        code: 'method_not_allowed',
      },
      {
        request: new Request('https://campaign.example/api/questions/submit', {
          method: 'POST',
          headers: { 'content-type': 'application/json', origin: 'https://attacker.example' },
          body: validBody,
        }),
        status: 403,
        code: 'forbidden_origin',
      },
      {
        request: new Request('https://campaign.example/api/questions/submit', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'sec-fetch-site': 'cross-site' },
          body: validBody,
        }),
        status: 403,
        code: 'forbidden_origin',
      },
      {
        request: new Request('https://campaign.example/api/questions/submit', {
          method: 'POST',
          headers: { 'content-type': 'text/plain' },
          body: validBody,
        }),
        status: 400,
        code: 'invalid_request',
      },
      {
        request: new Request('https://campaign.example/api/questions/submit', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'content-length': '65537' },
          body: validBody,
        }),
        status: 413,
        code: 'request_too_large',
      },
      {
        request: new Request('https://campaign.example/api/questions/submit', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: ' '.repeat(65_537),
        }),
        status: 413,
        code: 'request_too_large',
      },
    ]

    const results = await Promise.all(
      cases.map(async (testCase) => {
        const response = await handler(testCase.request, { requestId: 'request-invalid' })
        return {
          actualStatus: response.status,
          actualBody: await response.json(),
          cacheControl: response.headers.get('cache-control'),
          expectedStatus: testCase.status,
          expectedCode: testCase.code,
        }
      }),
    )

    for (const result of results) {
      expect(result.actualStatus).toBe(result.expectedStatus)
      expect(result.actualBody).toEqual({ ok: false, code: result.expectedCode })
      expect(result.cacheControl).toBe('no-store')
    }
    expect(createIssue).not.toHaveBeenCalled()
  })

  it('rejects malformed or out-of-bounds payloads before GitHub is contacted', async () => {
    const createIssue = createIssueMock()
    const handler = createQuestionSubmissionHandler({
      expectedAccessCodeHash,
      createIssue,
      log: logMock(),
    })
    const validSubmission = {
      accessCode,
      itemNumber: 1,
      itemMarkdown: 'Question context',
      answer: 'A sufficiently long correction.',
    }
    const invalidBodies = [
      '{',
      'null',
      '[]',
      JSON.stringify({
        accessCode,
        itemNumber: 1,
        answer: 'A sufficiently long correction.',
      }),
      JSON.stringify({ ...validSubmission, itemNumber: '1' }),
      JSON.stringify({ ...validSubmission, unexpected: true }),
      JSON.stringify({ ...validSubmission, accessCode: 'fifteen-chars!!' }),
      JSON.stringify({ ...validSubmission, accessCode: 'x'.repeat(257) }),
      JSON.stringify({ ...validSubmission, itemNumber: 0 }),
      JSON.stringify({ ...validSubmission, itemNumber: 10_000 }),
      JSON.stringify({ ...validSubmission, itemNumber: 1.5 }),
      JSON.stringify({ ...validSubmission, itemMarkdown: '   ' }),
      JSON.stringify({ ...validSubmission, itemMarkdown: 'x'.repeat(32_769) }),
      JSON.stringify({ ...validSubmission, answer: ' nineteen chars!!! ' }),
      JSON.stringify({ ...validSubmission, answer: 'x'.repeat(16_385) }),
      JSON.stringify({ ...validSubmission, answer: 'A valid correction\u0000 with a NUL.' }),
      JSON.stringify({ ...validSubmission, itemMarkdown: 'Question\u0007context' }),
    ]

    const results = await Promise.all(
      invalidBodies.map(async (body) => {
        const response = await handler(
          new Request('https://campaign.example/api/questions/submit', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body,
          }),
          { requestId: 'request-invalid-payload' },
        )
        return { status: response.status, body: await response.json() }
      }),
    )

    for (const result of results) {
      expect(result.status).toBe(400)
      expect(result.body).toEqual({ ok: false, code: 'invalid_request' })
    }
    expect(createIssue).not.toHaveBeenCalled()
  })

  it('fails closed without retrying or leaking upstream details', async () => {
    const createIssue = vi.fn<CreateIssue>(async () => {
      throw new Error('GitHub rejected secret answer text')
    })
    const log = logMock()
    const handler = createQuestionSubmissionHandler({
      expectedAccessCodeHash,
      createIssue,
      log,
    })
    const request = new Request('https://campaign.example/api/questions/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        accessCode,
        itemNumber: 2,
        itemMarkdown: 'Sensitive question context',
        answer: 'Sensitive but sufficiently long answer.',
      }),
    })

    const response = await handler(request, { requestId: 'request-failed' })

    expect(response.status).toBe(502)
    expect(await response.json()).toEqual({ ok: false, code: 'submission_failed' })
    expect(createIssue).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith({
      requestId: 'request-failed',
      outcome: 'submission_failed',
      itemNumber: 2,
    })
    expect(JSON.stringify(log.mock.calls)).not.toContain('Sensitive')
    expect(JSON.stringify(log.mock.calls)).not.toContain('GitHub rejected')
  })

  it('denies the wrong code and treats missing code configuration as unavailable', async () => {
    const validSubmission = {
      accessCode: 'wrong-shared-code!',
      itemNumber: 3,
      itemMarkdown: 'Question context',
      answer: 'A sufficiently long correction.',
    }

    const results = await Promise.all(
      [
        { configuredHash: expectedAccessCodeHash, status: 401, code: 'access_denied' },
        { configuredHash: '', status: 502, code: 'submission_failed' },
      ].map(async (testCase) => {
        const createIssue = createIssueMock()
        const log = logMock()
        const handler = createQuestionSubmissionHandler({
          expectedAccessCodeHash: testCase.configuredHash,
          createIssue,
          log,
        })
        const response = await handler(
          new Request('https://campaign.example/api/questions/submit', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(validSubmission),
          }),
          { requestId: 'request-access' },
        )
        return {
          actualStatus: response.status,
          actualBody: await response.json(),
          expectedStatus: testCase.status,
          expectedCode: testCase.code,
          createIssueCalls: createIssue.mock.calls,
          logCalls: log.mock.calls,
        }
      }),
    )

    for (const result of results) {
      expect(result.actualStatus).toBe(result.expectedStatus)
      expect(result.actualBody).toEqual({ ok: false, code: result.expectedCode })
      expect(result.createIssueCalls).toHaveLength(0)
      expect(JSON.stringify(result.logCalls)).not.toContain(validSubmission.accessCode)
    }
  })

  it('keeps command-like input inert and confined to the issue body', async () => {
    const createIssue = createIssueMock()
    const handler = createQuestionSubmissionHandler({
      expectedAccessCodeHash,
      createIssue,
      log: logMock(),
    })
    const answer = '$(touch /tmp/not-created) `rm -rf /tmp/nope` @reviewers'

    await handler(
      new Request('https://campaign.example/api/questions/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          accessCode,
          itemNumber: 4,
          itemMarkdown: '<script>alert("review context")</script>',
          answer,
        }),
      }),
      { requestId: 'request-untrusted' },
    )

    const issue = createIssue.mock.calls[0]?.[0]
    expect(issue).toBeDefined()
    if (!issue) throw new Error('Expected an issue')
    expect(issue.title).toBe('Submitted correction for item-4')
    expect(issue.owner).toBe('ndelangen')
    expect(issue.repo).toBe('the-lost-hope')
    expect(issue.body).toContain('$(touch /tmp/not-created)')
    expect(issue.body).toContain('`rm -rf /tmp/nope`')
    expect(issue.body).toContain('@\u200breviewers')
  })
})
