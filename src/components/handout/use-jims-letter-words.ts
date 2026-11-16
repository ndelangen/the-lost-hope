import { useCallback, useEffect, useState } from 'react'

import { type LetterWords, type UnsealedLetter, unsealLetter } from '#/lib/jims-letter'

const STORAGE_KEY = 'dag:jims-letter-words'
const EMPTY: UnsealedLetter = { sections: {}, shared: undefined }

function readWords(): LetterWords {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as LetterWords) : {}
  } catch {
    return {}
  }
}

/**
 * The words typed into Jim's letter, kept in this browser so every window showing the letter (the
 * DM screen and the player screen) follows the same words live.
 */
export function useJimsLetterWords(): [LetterWords, (words: LetterWords) => void] {
  const [words, setWords] = useState<LetterWords>({})

  useEffect(() => {
    setWords(readWords())
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setWords(readWords())
    }
    addEventListener('storage', onStorage)
    return () => removeEventListener('storage', onStorage)
  }, [])

  const update = useCallback((next: LetterWords) => {
    setWords(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Without storage the letter still works in this window.
    }
  }, [])

  return [words, update]
}

/** The parts of Jim's letter that the words open, checked shortly after typing pauses. */
export function useUnsealedLetter(words: LetterWords): UnsealedLetter {
  const [unsealed, setUnsealed] = useState<UnsealedLetter>(EMPTY)

  useEffect(() => {
    let current = true
    const timer = setTimeout(() => {
      void unsealLetter(words).then((next) => {
        if (current) setUnsealed(next)
      })
    }, 300)
    return () => {
      current = false
      clearTimeout(timer)
    }
  }, [words])

  return unsealed
}
