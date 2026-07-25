import { useCallback, useEffect, useRef, useState } from 'react'

export const CORRECTION_ACCESS_STORAGE_KEY = 'dag:corrections:access-code'

const CORRECTION_ACCESS_SYNC_EVENT = 'dag:corrections:access-code-change'

export type CorrectionAccessStatus = 'checking' | 'locked' | 'unlocked' | 'revoked'

type CorrectionAccessState = {
  status: CorrectionAccessStatus
  accessCode: string
}

export async function hashCorrectionAccessCode(value: string): Promise<string> {
  const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function validDigest(value: string): boolean {
  return /^[\da-f]{64}$/i.test(value)
}

export function useCorrectionAccess(expectedAccessCodeHash: string) {
  const source = useRef(Symbol('correction-access'))
  const [state, setState] = useState<CorrectionAccessState>({
    status: 'checking',
    accessCode: '',
  })

  const checkRememberedCode = useCallback(async (): Promise<CorrectionAccessState> => {
    const rememberedCode = localStorage.getItem(CORRECTION_ACCESS_STORAGE_KEY)
    if (!rememberedCode || !validDigest(expectedAccessCodeHash)) {
      return { status: 'locked', accessCode: '' }
    }

    const digest = await hashCorrectionAccessCode(rememberedCode)
    if (digest !== expectedAccessCodeHash.toLowerCase()) {
      localStorage.removeItem(CORRECTION_ACCESS_STORAGE_KEY)
      return { status: 'locked', accessCode: '' }
    }

    return { status: 'unlocked', accessCode: rememberedCode }
  }, [expectedAccessCodeHash])

  useEffect(() => {
    let active = true

    const refresh = () => {
      void checkRememberedCode().then((nextState) => {
        if (active) setState(nextState)
      })
    }
    const handleStorage = (event: StorageEvent) => {
      if (event.key === CORRECTION_ACCESS_STORAGE_KEY) refresh()
    }
    const handleLocalSync = (event: Event) => {
      if ((event as CustomEvent<symbol>).detail !== source.current) refresh()
    }

    setState({ status: 'checking', accessCode: '' })
    refresh()
    window.addEventListener('storage', handleStorage)
    window.addEventListener(CORRECTION_ACCESS_SYNC_EVENT, handleLocalSync)
    return () => {
      active = false
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(CORRECTION_ACCESS_SYNC_EVENT, handleLocalSync)
    }
  }, [checkRememberedCode])

  const unlock = useCallback(
    async (candidate: string): Promise<boolean> => {
      const matches =
        validDigest(expectedAccessCodeHash) &&
        (await hashCorrectionAccessCode(candidate)) === expectedAccessCodeHash.toLowerCase()
      if (!matches) return false

      localStorage.setItem(CORRECTION_ACCESS_STORAGE_KEY, candidate)
      setState({ status: 'unlocked', accessCode: candidate })
      window.dispatchEvent(
        new CustomEvent(CORRECTION_ACCESS_SYNC_EVENT, { detail: source.current }),
      )
      return true
    },
    [expectedAccessCodeHash],
  )

  const revoke = useCallback(() => {
    localStorage.removeItem(CORRECTION_ACCESS_STORAGE_KEY)
    setState({ status: 'revoked', accessCode: '' })
    window.dispatchEvent(new CustomEvent(CORRECTION_ACCESS_SYNC_EVENT, { detail: source.current }))
  }, [])

  return {
    ...state,
    unlock,
    revoke,
  }
}
