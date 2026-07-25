// @vitest-environment jsdom

import { createHash } from 'node:crypto'

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { Entity } from '#/lib/campaign'
import { CORRECTION_ACCESS_STORAGE_KEY } from '#/lib/correction-access'

import { EntityCorrectionSubmission } from './entity-correction-submission'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a href="/questions">{children}</a>,
}))

const accessCode = 'correct-shared-code'
const expectedAccessCodeHash = createHash('sha256').update(accessCode).digest('hex')
const entity = {
  kind: 'npc',
  slug: 'roberto',
  data: {
    slug: 'roberto',
    name: 'Roberto',
    notes: 'A merchant.',
  },
} as unknown as Entity

afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.unstubAllGlobals()
})

describe('EntityCorrectionSubmission', () => {
  it('renders nothing while access is locked', async () => {
    const { container } = render(
      <EntityCorrectionSubmission
        entity={entity}
        expectedAccessCodeHash={expectedAccessCodeHash}
      />,
    )

    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /Submit corrections or additions/ })).toBeNull(),
    )
    expect(container.innerHTML).toBe('')
  })

  it('submits an entry snapshot, clears success, and permits another note', async () => {
    localStorage.setItem(CORRECTION_ACCESS_STORAGE_KEY, accessCode)
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(Response.json({ ok: true }, { status: 201 }))
    vi.stubGlobal('fetch', fetchMock)
    render(
      <EntityCorrectionSubmission
        entity={entity}
        expectedAccessCodeHash={expectedAccessCodeHash}
      />,
    )

    const trigger = await screen.findByRole('button', {
      name: /Submit corrections or additions/,
    })
    fireEvent.click(trigger)
    fireEvent.change(screen.getByLabelText('What should be corrected or added?'), {
      target: { value: 'Roberto also sold the party a map.' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Submit for review' }))

    const success = await screen.findByRole('status')
    expect(success.textContent).toContain('submitted for review')
    expect(success.textContent).toContain('has not changed yet')
    const sentBody = JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body)) as {
      context: { type: string; snapshot: { entity: { slug: string } } }
    }
    expect(sentBody.context.type).toBe('entry')
    expect(sentBody.context.snapshot.entity.slug).toBe('roberto')

    fireEvent.click(screen.getByRole('button', { name: 'Submit another note' }))
    expect(
      (screen.getByLabelText('What should be corrected or added?') as HTMLTextAreaElement).value,
    ).toBe('')
  })

  it('retains the note and shows the questions link when access is revoked', async () => {
    localStorage.setItem(CORRECTION_ACCESS_STORAGE_KEY, accessCode)
    vi.stubGlobal(
      'fetch',
      vi
        .fn<typeof fetch>()
        .mockResolvedValue(Response.json({ ok: false, code: 'access_denied' }, { status: 401 })),
    )
    render(
      <EntityCorrectionSubmission
        entity={entity}
        expectedAccessCodeHash={expectedAccessCodeHash}
      />,
    )

    fireEvent.click(await screen.findByRole('button', { name: /Submit corrections or additions/ }))
    fireEvent.change(screen.getByLabelText('What should be corrected or added?'), {
      target: { value: 'This note remains long enough to submit.' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Submit for review' }))

    expect((await screen.findByRole('alert')).textContent).toContain('no longer accepted')
    expect(screen.getByRole('link', { name: 'Open questions' }).getAttribute('href')).toBe(
      '/questions',
    )
    expect(localStorage.getItem(CORRECTION_ACCESS_STORAGE_KEY)).toBeNull()
  })
})
