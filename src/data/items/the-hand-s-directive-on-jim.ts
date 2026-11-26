import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'The Hand’s Directive on Jim',
  icon: 'gi/GiTiedScroll',
  category: 'Other',
  currentOwner: null,
  carriedBy: null,
  craftedBy: refs.organizations.the_eyeless_hand,
  notes: [
    ['CURRENT DIRECTIVE'],
    ['PRIORITY TARGET: ', refs.pcs.jim],
    ['Status: LIVE RECOVERY ONLY'],
    ['All units are instructed:'],
    [refs.pcs.jim, ' is NOT to be killed'],
    [refs.pcs.jim, ' is NOT to be abandoned'],
    [refs.pcs.jim, ' is to be retrieved by any means necessary'],
    ['Authorized methods include:'],
    ['bounty escalation contracts'],
    ['cross-regional coordination'],
    ['Eyes-level intervention'],
    ['use of non-standard assets if required (including restricted magical assistance)'],
  ],
})
