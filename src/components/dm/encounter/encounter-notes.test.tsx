import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { EncounterNotes } from './encounter-notes'

describe('EncounterNotes', () => {
  it('pins the scene’s fight prep, open by default', () => {
    const markup = renderToStaticMarkup(
      <EncounterNotes
        sceneName="Ambush"
        notes={{ morale: [['They flee below half HP.']], terrain: [['Slick deck.']] }}
      />,
    )
    expect(markup).toContain('<details open')
    expect(markup).toContain('Morale')
    expect(markup).toContain('They flee below half HP.')
    expect(markup).not.toContain('Tactics')
  })

  it('shows nothing without notes', () => {
    expect(renderToStaticMarkup(<EncounterNotes sceneName="Ambush" notes={undefined} />)).toBe('')
    expect(renderToStaticMarkup(<EncounterNotes sceneName="Ambush" notes={{}} />)).toBe('')
  })
})
