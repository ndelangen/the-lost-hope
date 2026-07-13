import { describe, expect, it } from 'vitest'

import {
  buildIconClassificationCommand,
  iconClassificationForShortcut,
  parseIconClassificationCommand,
} from './classification-command'

describe('icon classification command', () => {
  it('builds deterministic parameters for the three review lists', () => {
    const command = buildIconClassificationCommand({
      useful: ['gi/GiDragonHead', 'lucide/ArrowLeft'],
      questionable: ['fa/FaFlask'],
      'marked-for-deletion': ['fa/FaFacebook', 'fa/FaFacebook'],
    })

    expect(command).toBe(
      "bun run icons:classify -- --useful='gi/GiDragonHead,lucide/ArrowLeft' --questionable='fa/FaFlask' --delete='fa/FaFacebook'",
    )
  })

  it('parses repeated, comma-separated classification parameters', () => {
    expect(
      parseIconClassificationCommand([
        '--useful=lucide/ArrowLeft,gi/GiDragonHead',
        '--useful=lucide/ArrowLeft',
        '--delete=fa/FaFacebook',
        '--dry-run',
      ]),
    ).toEqual({
      selections: {
        useful: ['gi/GiDragonHead', 'lucide/ArrowLeft'],
        questionable: [],
        'marked-for-deletion': ['fa/FaFacebook'],
      },
      dryRun: true,
      help: false,
    })
  })

  it('maps case-insensitive keyboard shortcuts to review groups', () => {
    expect(iconClassificationForShortcut('u')).toBe('useful')
    expect(iconClassificationForShortcut('Q')).toBe('questionable')
    expect(iconClassificationForShortcut('d')).toBe('marked-for-deletion')
    expect(iconClassificationForShortcut('x')).toBeUndefined()
  })
})
