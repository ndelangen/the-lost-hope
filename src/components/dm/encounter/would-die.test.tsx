import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { WouldDie } from './condition-markers'

describe('WouldDie', () => {
  it('shows only the effects that ask to be checked before death', () => {
    const markup = renderToStaticMarkup(
      <WouldDie
        effects={[
          {
            name: 'Ward',
            triggers: [{ on: 'wouldDie', reminder: [['Check the ward first.']] }],
          },
          { name: 'Storm', triggers: [{ on: 'longRest', reminder: [['Roll for the storm.']] }] },
        ]}
      />,
    )
    expect(markup).toContain('Would die: Ward')
    expect(markup).toContain('Check the ward first.')
    expect(markup).not.toContain('Storm')
  })

  it('renders nothing without a would-die reminder', () => {
    expect(renderToStaticMarkup(<WouldDie effects={[{ name: 'Storm' }]} />)).toBe('')
  })
})
