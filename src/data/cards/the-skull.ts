import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Skull',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: true,
  text: "You summon an avatar of death—a ghostly humanoid skeleton clad in a tattered black robe and carrying a spectral scythe. It appears in a space of the DM's choice within 10 feet of you and attacks you, warning all others that you must win the battle alone. The avatar fights until you die or it drops to 0 hit points, whereupon it disappears. If anyone tries to help you, the helper summons its own avatar of death. A wish spell can't remove the avatar of death. The avatar of death is immune to all features, spells, and other effects that aren't from the Deck of Many Things. You must fight the avatar alone. If you die, your soul is captured and stored by the avatar. If you survive, you are restored to full hit points and can draw no more cards.",
  drawback: 'Must defeat avatar of death or die',
})
