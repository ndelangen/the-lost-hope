// @vitest-environment jsdom

import { createHash } from 'node:crypto'

import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { CORRECTION_ACCESS_STORAGE_KEY, useCorrectionAccess } from './correction-access'

const accessCode = 'correct-shared-code'
const expectedAccessCodeHash = createHash('sha256').update(accessCode).digest('hex')

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('useCorrectionAccess', () => {
  it('verifies remembered access before exposing the raw code', async () => {
    localStorage.setItem(CORRECTION_ACCESS_STORAGE_KEY, accessCode)

    const { result } = renderHook(() => useCorrectionAccess(expectedAccessCodeHash))

    expect(result.current.status).toBe('checking')
    await waitFor(() => expect(result.current.status).toBe('unlocked'))
    expect(result.current.accessCode).toBe(accessCode)
  })

  it('unlocks valid candidates, rejects invalid candidates, and revokes locally', async () => {
    const { result } = renderHook(() => useCorrectionAccess(expectedAccessCodeHash))
    await waitFor(() => expect(result.current.status).toBe('locked'))

    await act(async () => {
      expect(await result.current.unlock('incorrect-code-value')).toBe(false)
    })
    expect(result.current.status).toBe('locked')

    await act(async () => {
      expect(await result.current.unlock(accessCode)).toBe(true)
    })
    expect(result.current.status).toBe('unlocked')
    expect(localStorage.getItem(CORRECTION_ACCESS_STORAGE_KEY)).toBe(accessCode)

    act(() => result.current.revoke())
    expect(result.current.status).toBe('revoked')
    expect(localStorage.getItem(CORRECTION_ACCESS_STORAGE_KEY)).toBeNull()
  })

  it('synchronizes access changes between independent hook consumers', async () => {
    const first = renderHook(() => useCorrectionAccess(expectedAccessCodeHash))
    const second = renderHook(() => useCorrectionAccess(expectedAccessCodeHash))
    await waitFor(() => expect(first.result.current.status).toBe('locked'))
    await waitFor(() => expect(second.result.current.status).toBe('locked'))

    await act(async () => {
      await first.result.current.unlock(accessCode)
    })

    await waitFor(() => expect(second.result.current.status).toBe('unlocked'))
    expect(second.result.current.accessCode).toBe(accessCode)

    act(() => first.result.current.revoke())
    await waitFor(() => expect(second.result.current.status).toBe('locked'))
  })
})
