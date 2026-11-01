// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { NpcsPage, NPC_SORT_STORAGE_KEY } from '#/routes/npcs/index'

vi.mock('#/components/entity-reference', () => ({
  EntityReference: ({ slug, children }: { slug: string; children: () => ReactNode }) => (
    <a href={`/npcs/detail/${slug}`}>{children()}</a>
  ),
}))

function names(): string[] {
  return screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent ?? '')
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  localStorage.clear()
})

describe('NPC sorting preference', () => {
  it('defaults to first appearance and saves both choices across visits', () => {
    const view = render(<NpcsPage />)
    const select = screen.getByRole('combobox', { name: 'Sort NPCs' })
    expect((select as HTMLSelectElement).value).toBe('appearance')
    expect(names()[0]).toBe('Light 13th Marshal')

    fireEvent.change(select, { target: { value: 'name' } })
    expect(names()[0]).toBe('The 12th Marshal')
    expect(localStorage.getItem(NPC_SORT_STORAGE_KEY)).toBe('name')
    view.unmount()

    const next = render(<NpcsPage />)
    expect(names()[0]).toBe('The 12th Marshal')
    fireEvent.change(screen.getByRole('combobox', { name: 'Sort NPCs' }), {
      target: { value: 'appearance' },
    })
    expect(localStorage.getItem(NPC_SORT_STORAGE_KEY)).toBe('appearance')
    next.unmount()

    render(<NpcsPage />)
    expect(names()[0]).toBe('Light 13th Marshal')
  })

  it('falls back to first appearance for an invalid stored preference', () => {
    localStorage.setItem(NPC_SORT_STORAGE_KEY, 'unexpected')
    render(<NpcsPage />)
    expect(names()[0]).toBe('Light 13th Marshal')
  })

  it('keeps sorting usable when reading and writing storage are blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    render(<NpcsPage />)
    expect(names()[0]).toBe('Light 13th Marshal')

    fireEvent.change(screen.getByRole('combobox', { name: 'Sort NPCs' }), {
      target: { value: 'name' },
    })
    expect(names()[0]).toBe('The 12th Marshal')
  })

  it('hydrates the default markup before restoring a saved choice without overwriting it', async () => {
    localStorage.setItem(NPC_SORT_STORAGE_KEY, 'name')
    const container = document.createElement('div')
    container.innerHTML = renderToString(<NpcsPage />)
    expect(container.querySelector('h3')?.textContent).toBe('Light 13th Marshal')
    document.body.append(container)
    const recoverable = vi.fn<(error: unknown) => void>()
    let root: ReturnType<typeof hydrateRoot>
    await act(async () => {
      root = hydrateRoot(container, <NpcsPage />, { onRecoverableError: recoverable })
    })
    await waitFor(() => expect(container.querySelector('h3')?.textContent).toBe('The 12th Marshal'))
    expect(localStorage.getItem(NPC_SORT_STORAGE_KEY)).toBe('name')
    expect(recoverable).not.toHaveBeenCalled()
    await act(async () => root!.unmount())
    container.remove()
  })
})
