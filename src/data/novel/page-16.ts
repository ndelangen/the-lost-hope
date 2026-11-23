import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'quarters',
      panels: [
        { event: refs.events.n2_e052, art: { from: 'event' } },
        { event: refs.events.n2_e053, art: { from: 'event' } },
        { event: refs.events.n2_e057, art: { from: 'event' } },
        { event: refs.events.n2_e054, art: { from: 'event' } },
      ],
    },
    { layout: 'splash', panels: [{ event: refs.events.n2_e055, art: { from: 'event' } }] },
    { layout: 'full', panels: [{ event: refs.events.n2_e056, art: { from: 'event' } }] },
  ],
})
