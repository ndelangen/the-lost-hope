import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    { layout: 'full', panels: [{ event: refs.events.n2_e157, art: { from: 'event' } }] },
    {
      span: {
        side: 'left',
        width: 0.3333,
        panel: { event: refs.events.n2_e158, art: { from: 'event' } },
        rows: [
          {
            layout: 'stripAbove',
            panels: [
              { event: refs.events.n2_e159, art: { from: 'event' } },
              { event: refs.events.n2_e160, art: { from: 'event' } },
              { event: refs.events.n2_e161, art: { from: 'event' } },
            ],
          },
          {
            layout: 'leanStack',
            panels: [
              { event: refs.events.n2_e162, art: { from: 'event' } },
              { event: refs.events.n2_e163, art: { from: 'event' } },
              { event: refs.events.n2_e164, art: { from: 'event' } },
            ],
          },
        ],
      },
    },
  ],
})
