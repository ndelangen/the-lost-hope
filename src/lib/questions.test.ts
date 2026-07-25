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

  it('does not split horizontal-rule syntax rendered as Markdown code', () => {
    const markdown = [
      '# Campaign questions',
      '',
      '    ---',
      '',
      '```md',
      '---',
      '```',
      '',
      'Setext heading',
      '---',
      '',
      '> ---',
      '',
      '---',
      '',
      '## Actual second item',
    ].join('\n')

    expect(splitQuestionsMarkdown(markdown)).toEqual([
      {
        itemNumber: 1,
        markdown:
          '# Campaign questions\n\n    ---\n\n```md\n---\n```\n\nSetext heading\n---\n\n> ---',
      },
      {
        itemNumber: 2,
        markdown: '## Actual second item',
      },
    ])
  })
})
