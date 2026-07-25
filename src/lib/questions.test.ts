import { describe, expect, it } from 'vitest'

import { splitQuestionsMarkdown } from './questions'

describe('splitQuestionsMarkdown', () => {
  it('turns horizontal-rule-separated Markdown into ordered one-based items', () => {
    const markdown = [
      '# Campaign questions',
      '',
      'Introductory text.',
      '',
      '---',
      '',
      '## First section',
      '',
      'First question.',
      '',
      '* * *',
      '',
      '## Second section',
      '',
      'Second question.',
    ].join('\n')

    expect(splitQuestionsMarkdown(markdown)).toEqual([
      {
        itemNumber: 1,
        markdown: '# Campaign questions\n\nIntroductory text.',
      },
      {
        itemNumber: 2,
        markdown: '## First section\n\nFirst question.',
      },
      {
        itemNumber: 3,
        markdown: '## Second section\n\nSecond question.',
      },
    ])
  })
})
