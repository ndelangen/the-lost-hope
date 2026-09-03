import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Sylvia’s Quarters',
  icon: 'gi/GiCaptainHatProfile',
  type: 'district',
  parent: refs.locations.sylvias_flying_bazaar,
  at: [725, 550],
  notes: [['The private room of ', refs.npcs.sylvia, ' aboard her flying bazaar.']],
})
