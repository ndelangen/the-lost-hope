"""Type the catalog's homebrew shop goods as equipment of The Lost Hope.

Usage: python3 -I library-workers/migration/equipment_shop_stock.py <stock-map.json>

A catalog item whose only printing is "Shop stock" is a good made up for this campaign's shops.
It becomes an entry in src/data/library/equipment/the-lost-hope.ts: its name, a category from
its shop, its price (an estimate when the catalog says so), and its description as text. Its
catalog printing then points at the typed entry. Shop groups stay out of equipment: shops own
their stock. Writes `<stock-map.json>`, each shop group's goods as equipment refs (homebrew ones,
and goods already typed as SRD equipment or magic items), plus the goods no typed entry holds yet.
"""
import json
import os
import re
import sys

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
CATALOG = os.path.join(REPO, 'src/lib/published-library-catalog/entries.json')
OUT = os.path.join(REPO, 'src/data/library/equipment/the-lost-hope.ts')

CATEGORY = {
    'Bakery': 'Food and Drink', 'Butcher': 'Food and Drink', 'Confectioner': 'Food and Drink',
    'Fishmonger': 'Food and Drink', 'Greengrocer': 'Food and Drink', 'Grocer': 'Food and Drink',
    'Tavern': 'Food and Drink', 'Gem merchant': 'Trade Good', 'Jeweler': 'Trade Good',
    'Pawnbroker': 'Trade Good', 'Toolwright': 'Tool', 'Artificer': 'Tool', 'Stables': 'Tack and Harness',
    'Shipwright': 'Mount or Vehicle', 'Blacksmith': 'Other',
}
PRICE = re.compile(r'^([\d,]+(?:\.\d+)?)\s*(cp|sp|ep|gp|pp)\b(\s*\(estimate\))?', re.I)


def js(v):
    return json.dumps(v, ensure_ascii=False)


def key_of(slug):
    return re.sub(r'[^a-z0-9]+', '_', slug).strip('_')


catalog = json.load(open(CATALOG))
pub = {'ref': 'publication', 'key': 'the_lost_hope'}
entries = []
stock = {}
untyped = []
for record in catalog:
    if record['type'] != 'items':
        continue
    shop = next((p for p in record['printings'] if p['label'] == 'Shop stock'), None)
    if not shop:
        continue
    groups = record.get('groups') or [record['group']]
    others = [p for p in record['printings'] if p is not shop]
    ref = None
    if not others:
        key = key_of(record['slug'])
        price = PRICE.match(record.get('price') or '')
        entry = {'key': key, 'name': record['name'], 'category': CATEGORY.get(groups[0], 'Adventuring Gear')}
        if price:
            amount = float(price.group(1).replace(',', ''))
            entry['price'] = {'amount': int(amount) if amount.is_integer() else amount, 'coin': price.group(2).lower()}
            if price.group(3):
                entry['priceEstimated'] = True
        entry['text'] = [record['summary']] if record.get('summary') else []
        entries.append(entry)
        shop['typed'] = {'equipment': {'ref': 'equipment', 'key': key}, 'publication': pub}
        shop['publication'] = pub
        ref = f'refs.equipment.{key}'
    else:
        typed = next((p['typed'] for p in others if p.get('typed')), None)
        if typed and 'equipment' in typed:
            ref = f"refs.equipment.{typed['equipment']['key']}"
        elif typed and 'magicItem' in typed:
            ref = f"refs.magicItems.{typed['magicItem']['key']}"
    for group in groups:
        stock.setdefault(group, [])
        if ref:
            stock[group].append(ref)
    if not ref:
        untyped.append({'slug': record['slug'], 'name': record['name'], 'groups': groups,
                        'printings': [p['label'] for p in others]})

L = [
    "import { refs } from '#/data/generated/library-refs.ts'",
    "import { createEquipment } from '#/definitions/library.ts'",
    '',
    '/** Goods made up for this campaign: what its shops sell beyond the books. */',
    'export default createEquipment({',
]
for e in sorted(entries, key=lambda x: x['key']):
    L.append(f"  {e['key']}: {{")
    L.append(f"    name: {js(e['name'])},")
    L.append(f"    category: {js(e['category'])},")
    if 'price' in e:
        L.append(f"    price: {{ amount: {e['price']['amount']}, coin: {js(e['price']['coin'])} }},")
    if e.get('priceEstimated'):
        L.append('    priceEstimated: true,')
    L.append('    text: [' + ', '.join('[' + js(p) + ']' for p in e['text']) + '],')
    L.append('    publication: refs.publications.the_lost_hope,')
    L.append('  },')
L.append('})')
open(OUT, 'w').write('\n'.join(L) + '\n')
json.dump(catalog, open(CATALOG, 'w'), indent=2, ensure_ascii=False)
json.dump({'stock': stock, 'untyped': untyped}, open(sys.argv[1], 'w'), indent=1, ensure_ascii=False)
print(len(entries), 'goods typed;', len(untyped), 'shop goods still untyped')
