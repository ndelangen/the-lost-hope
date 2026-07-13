// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ICON_SEARCH_COMMIT_DELAY_MS, IconCatalogSearchField } from './icon-catalog-search-field'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('IconCatalogSearchField', () => {
  it('keeps typing local and commits the URL query after a short pause', () => {
    vi.useFakeTimers()
    const onQueryChange = vi.fn<(query: string) => void>()

    render(<IconCatalogSearchField query="" onQueryChange={onQueryChange} />)
    fireEvent.change(screen.getByRole('searchbox', { name: 'Search icon catalog' }), {
      target: { value: 'dragon' },
    })

    expect(onQueryChange).not.toHaveBeenCalled()

    act(() => vi.advanceTimersByTime(ICON_SEARCH_COMMIT_DELAY_MS - 1))
    expect(onQueryChange).not.toHaveBeenCalled()

    act(() => vi.advanceTimersByTime(1))
    expect(onQueryChange).toHaveBeenCalledOnce()
    expect(onQueryChange).toHaveBeenCalledWith('dragon')
  })

  it('cancels a pending local query when the URL query changes', () => {
    vi.useFakeTimers()
    const onQueryChange = vi.fn<(query: string) => void>()
    const { rerender } = render(
      <IconCatalogSearchField query="old" onQueryChange={onQueryChange} />,
    )

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search icon catalog' }), {
      target: { value: 'stale' },
    })
    rerender(<IconCatalogSearchField query="new" onQueryChange={onQueryChange} />)

    act(() => vi.advanceTimersByTime(ICON_SEARCH_COMMIT_DELAY_MS))

    expect(
      (screen.getByRole('searchbox', { name: 'Search icon catalog' }) as HTMLInputElement).value,
    ).toBe('new')
    expect(onQueryChange).not.toHaveBeenCalled()
  })
})
