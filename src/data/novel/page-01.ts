import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'insetRight',
      panels: [
        { event: refs.events.n2_e001, art: { from: 'event' } },
        { event: refs.events.n2_e002, art: { from: 'event' } },
      ],
    },
    {
      layout: 'slash',
      panels: [
        { event: refs.events.n2_e003, art: { from: 'event' } },
        { event: refs.events.n2_e004, art: { from: 'event' } },
      ],
    },
    {
      layout: 'wideRight',
      panels: [
        { event: refs.events.n2_e005, art: { from: 'event' } },
        { event: refs.events.n2_e006, art: { from: 'event' } },
      ],
    },
  ],
})
