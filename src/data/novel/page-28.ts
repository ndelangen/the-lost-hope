import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    { layout: 'bleedSplash', panels: [{ event: refs.events.n2_e173, art: { from: 'event' } }] },
    {
      span: {
        side: 'right',
        width: 0.3333,
        panel: { event: refs.events.n2_e179, art: { from: 'event' } },
        rows: [
          {
            layout: 'wideLeft',
            panels: [
              { event: refs.events.n2_e174, art: { from: 'event' } },
              { event: refs.events.n2_e175, art: { from: 'event' } },
            ],
          },
          {
            layout: 'tallLeft',
            panels: [
              { event: refs.events.n2_e176, art: { from: 'event' } },
              { event: refs.events.n2_e177, art: { from: 'event' } },
              { event: refs.events.n2_e178, art: { from: 'event' } },
            ],
          },
        ],
      },
    },
  ],
})
