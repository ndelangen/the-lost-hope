// @vitest-environment jsdom

import { createHash } from 'node:crypto'

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { QuestionsPage } from './questions-page'

const accessCode = 'correct-shared-code'
const expectedAccessCodeHash = createHash('sha256').update(accessCode).digest('hex')
const items = [
  { itemNumber: 1, markdown: '## First question\n\nWhat happened?' },
  { itemNumber: 2, markdown: '## Second question\n\nWho was there?' },
]

async function unlockPage(): Promise<void> {
  fireEvent.change(screen.getByLabelText('Shared access code'), {
    target: { value: accessCode },
  })
  fireEvent.click(screen.getByRole('button', { name: 'Open questions' }))
  await screen.findByText('What happened?')
}

afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.unstubAllGlobals()
})

describe('QuestionsPage', () => {
  it('unlocks the ordered questions only when the shared code matches', async () => {
    render(<QuestionsPage items={items} expectedAccessCodeHash={expectedAccessCodeHash} />)

    expect(screen.queryByText('What happened?')).toBeNull()

    const codeInput = screen.getByLabelText('Shared access code')
    fireEvent.change(codeInput, { target: { value: 'incorrect-code-value' } })
    fireEvent.click(screen.getByRole('button', { name: 'Open questions' }))

    expect((await screen.findByRole('alert')).textContent).toContain('That code does not match')

    fireEvent.change(codeInput, { target: { value: accessCode } })
    fireEvent.click(screen.getByRole('button', { name: 'Open questions' }))

    expect(await screen.findByText('What happened?')).not.toBeNull()
    expect(screen.getByText('Item 1')).not.toBeNull()
    expect(screen.getByText('Item 2')).not.toBeNull()
    expect(screen.getAllByRole('textbox', { name: 'Your correction' })).toHaveLength(2)
    expect(localStorage.getItem('dag:questions:access-code')).toBe(accessCode)
  })

  it('restores access when the remembered code still matches', async () => {
    localStorage.setItem('dag:questions:access-code', accessCode)

    render(<QuestionsPage items={items} expectedAccessCodeHash={expectedAccessCodeHash} />)

    expect(await screen.findByText('What happened?')).not.toBeNull()
    expect(screen.queryByLabelText('Shared access code')).toBeNull()
  })

  it('shows the trimmed 20-character minimum and disables invalid answers', async () => {
    render(<QuestionsPage items={items} expectedAccessCodeHash={expectedAccessCodeHash} />)
    await unlockPage()

    const answer = screen.getAllByRole('textbox', { name: 'Your correction' })[0]
    const submit = screen.getAllByRole('button', { name: 'Submit correction' })[0]
    expect(screen.getAllByText(/Minimum 20 characters/)[0].textContent).toContain('0 / 16,384')
    expect((submit as HTMLButtonElement).disabled).toBe(true)

    fireEvent.change(answer, { target: { value: '  nineteen chars!!!  ' } })

    expect(screen.getAllByText(/Minimum 20 characters/)[0].textContent).toContain('17 / 16,384')
    expect((submit as HTMLButtonElement).disabled).toBe(true)

    fireEvent.change(answer, { target: { value: '12345678901234567890' } })

    expect(screen.getAllByText(/Minimum 20 characters/)[0].textContent).toContain('20 / 16,384')
    expect((submit as HTMLButtonElement).disabled).toBe(false)
  })

  it('submits the exact item, clears the answer, and allows another correction', async () => {
    let completeFirstRequest: ((response: Response) => void) | undefined
    const fetchMock = vi.fn<typeof fetch>(
      () =>
        new Promise<Response>((resolve) => {
          completeFirstRequest = resolve
        }),
    )
    vi.stubGlobal('fetch', fetchMock)
    render(<QuestionsPage items={items} expectedAccessCodeHash={expectedAccessCodeHash} />)
    await unlockPage()

    const answer = screen.getAllByRole('textbox', { name: 'Your correction' })[0]
    fireEvent.change(answer, { target: { value: 'Cassian ate the cheesecake.' } })
    fireEvent.click(screen.getAllByRole('button', { name: 'Submit correction' })[0])

    expect(await screen.findByRole('button', { name: 'Sending' })).not.toBeNull()
    expect(fetchMock).toHaveBeenCalledWith('/api/questions/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        accessCode,
        itemNumber: 1,
        itemMarkdown: items[0].markdown,
        answer: 'Cassian ate the cheesecake.',
      }),
    })

    completeFirstRequest?.(Response.json({ ok: true }, { status: 201 }))

    const success = await screen.findByRole('status')
    expect(success.textContent).toContain('Thank you! Your correction was submitted.')
    expect(success.textContent).toContain('site owner')
    expect(success.textContent).toContain('submit as many corrections as you like')
    expect((answer as HTMLTextAreaElement).value).toBe('')

    fetchMock.mockResolvedValueOnce(Response.json({ ok: true }, { status: 201 }))
    fireEvent.change(answer, { target: { value: 'A second sufficiently long correction.' } })
    fireEvent.click(screen.getAllByRole('button', { name: 'Submit correction' })[0])

    expect(await screen.findByRole('status')).not.toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('preserves a failed answer and retries only when the user asks', async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        Response.json({ ok: false, code: 'submission_failed' }, { status: 502 }),
      )
      .mockResolvedValueOnce(Response.json({ ok: true }, { status: 201 }))
    vi.stubGlobal('fetch', fetchMock)
    render(<QuestionsPage items={items} expectedAccessCodeHash={expectedAccessCodeHash} />)
    await unlockPage()

    const answer = screen.getAllByRole('textbox', { name: 'Your correction' })[0]
    const correction = 'The answer must remain after failure.'
    fireEvent.change(answer, { target: { value: correction } })
    fireEvent.click(screen.getAllByRole('button', { name: 'Submit correction' })[0])

    const error = await screen.findByRole('alert')
    expect(error.textContent).toContain('Could not send')
    expect(error.textContent).toContain('answer is still here')
    expect((answer as HTMLTextAreaElement).value).toBe(correction)
    expect(fetchMock).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }))

    expect(await screen.findByRole('status')).not.toBeNull()
    expect((answer as HTMLTextAreaElement).value).toBe('')
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('forgets the code and relocks when the server denies access', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn<typeof fetch>()
        .mockResolvedValue(Response.json({ ok: false, code: 'access_denied' }, { status: 401 })),
    )
    render(<QuestionsPage items={items} expectedAccessCodeHash={expectedAccessCodeHash} />)
    await unlockPage()

    fireEvent.change(screen.getAllByRole('textbox', { name: 'Your correction' })[0], {
      target: { value: 'This correction has enough characters.' },
    })
    fireEvent.click(screen.getAllByRole('button', { name: 'Submit correction' })[0])

    expect(await screen.findByLabelText('Shared access code')).not.toBeNull()
    expect(screen.getByRole('alert').textContent).toContain('no longer accepted')
    expect(localStorage.getItem('dag:questions:access-code')).toBeNull()
  })
})
