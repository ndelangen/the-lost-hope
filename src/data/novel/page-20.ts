import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    { layout: 'bleedSplash', panels: [{ event: refs.events.n2_e117, art: { from: 'event' } }] },
    {
      span: {
        side: 'left',
        width: 0.3333,
        panel: { event: refs.events.n2_e165, art: { from: 'event' } },
        rows: [
          {
            layout: 'tallLeft',
            panels: [
              { event: refs.events.n2_e118, art: { from: 'event' } },
              { event: refs.events.n2_e108, art: { from: 'event' } },
              { event: refs.events.n2_e122, art: { from: 'event' } },
            ],
          },
          {
            layout: 'tallLeft',
            panels: [
              { event: refs.events.n2_e106, art: { from: 'event' } },
              { event: refs.events.n2_e119, art: { from: 'event' } },
              { event: refs.events.n2_e120, art: { from: 'event' } },
            ],
          },
        ],
      },
    },
  ],
})
