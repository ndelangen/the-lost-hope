import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { EncounterNotes, notedFields } from './encounter-notes'

describe('EncounterNotes', () => {
  it('shows the scene’s fight prep while open', () => {
    const markup = renderToStaticMarkup(
      <EncounterNotes
        open
        onClose={() => {}}
        sceneName="Ambush"
        notes={{ morale: [['They flee below half HP.']], terrain: [['Slick deck.']] }}
        fights={[]}
      />,
    )
    expect(markup).toContain('Morale')
    expect(markup).toContain('They flee below half HP.')
    expect(markup).not.toContain('Tactics')
  })

  it('shows nothing while closed', () => {
    expect(
      renderToStaticMarkup(
        <EncounterNotes
          open={false}
          onClose={() => {}}
          sceneName="Ambush"
          notes={{}}
          fights={[]}
        />,
      ),
    ).toBe('')
  })

  it('counts only the fields with notes', () => {
    expect(notedFields(undefined)).toEqual([])
    expect(notedFields({ morale: [['Flee.']] }).map(([field]) => field)).toEqual(['morale'])
  })
})
