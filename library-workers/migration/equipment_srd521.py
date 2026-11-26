"""Read the SRD 5.2.1's adventuring gear and sample poisons into typed equipment.

Usage: python3 -I library-workers/migration/equipment_srd521.py <srd521-cols.txt> <out.json>

The text is the SRD 5.2.1 PDF in reading order (`columns.sh`). Each entry opens with
"Name (Price)"; its paragraphs follow until the next entry. Table rows interleaved by the PDF
layout (short lines between blank lines) and page furniture are dropped, and the gear table's
weights are read separately. Writes a JSON list of
`{ key, name, category, detail?, price?, weight?, text: [paragraph, ...] }` for `emit_equipment.py`.
"""
import json
import re
import sys

src, out = sys.argv[1], sys.argv[2]
lines = open(src, encoding='utf-8').read().split('\n')


def span(start, end):
    a = next(i for i, l in enumerate(lines) if l.strip() == start[0] and lines[i + 1].strip().startswith(start[1]))
    b = next(i for i in range(a + 1, len(lines)) if lines[i].strip() == end)
    return lines[a:b]


HEAD = re.compile(r'^([A-Z][^()]{1,40}?) \((?:([\d,]+) (GP|SP|CP|EP|PP)|Varies)\)$')
FURNITURE = re.compile(r'^(System Reference Document 5\.2\.1|\d{1,3})$')


def entries(section):
    found = []
    current = None
    for line in section:
        m = HEAD.match(line.strip())
        if m:
            current = {'name': m.group(1).strip(), 'price': None, 'lines': []}
            if m.group(2):
                current['price'] = {'amount': int(m.group(2).replace(',', '')), 'coin': m.group(3).lower()}
            found.append(current)
        elif current is not None:
            current['lines'].append(line.rstrip())
    return found


def paragraphs(raw):
    """Prose blocks only: a block of a table's short cells is dropped."""
    blocks, block = [], []
    for line in raw + ['']:
        if not line.strip() or FURNITURE.match(line.strip()):
            if block:
                blocks.append(block)
            block = []
        else:
            block.append(line.strip())
    # A table cell is short and has no sentence; a one-line entry ("A Flask holds up to 1 pint.")
    # is a sentence.
    keep = [b for b in blocks if any(len(l) >= 30 for l in b) or re.search(r'^[A-Z].* .*\.$', ' '.join(b))]
    text = []
    for b in keep:
        joined = ''
        for l in b:
            if not joined:
                joined = l
            elif joined.endswith('-') and not re.search(r'\d-$', joined):
                # Hyphenated across a line break: keep the hyphen only where it is a real one.
                joined = joined + l
            else:
                joined = joined + ' ' + l
        text.append(joined)
    # A paragraph that ends mid-sentence continues in the next block (a column or page break).
    merged = []
    for p in text:
        if merged and not re.search(r'[.:!?”)]$', merged[-1]):
            merged[-1] = merged[-1] + ' ' + p
        else:
            merged.append(p)
    return merged


def weights(section):
    """The gear table's rows: name, weight, cost, each on its own line."""
    cells = [l.strip() for l in section if l.strip() and not FURNITURE.match(l.strip())]
    found = {}
    for i in range(len(cells) - 2):
        name, weight, cost = cells[i:i + 3]
        if re.fullmatch(r'[\d,]+ (GP|SP|CP)', cost) and re.fullmatch(r'(\d+(?:[½¼]|/\d)?|½|¼) lb\.(?: \(full\))?|—', weight):
            w = weight.replace(' (full)', '').replace(' lb.', '').replace('½', '.5').replace('¼', '.25')
            if w == '—':
                found[name] = 0
            elif '/' in w:
                a, b = w.split('/')
                found[name] = int(a) / int(b)
            else:
                found[name] = float(w) if '.' in w else int(w)
    return found


def key(name):
    return re.sub(r'[^a-z0-9]+', '_', name.lower().replace('’', '').replace("'", '')).strip('_')


gear_section = span(('Adventuring Gear', 'The Adventuring Gear table'), 'Mounts and Vehicles')
table = weights(gear_section)
result = []
for e in entries(gear_section):
    text = paragraphs(e['lines'])
    if not text:
        continue
    item = {'key': key(e['name']), 'name': e['name'], 'category': 'Adventuring Gear', 'text': text}
    if e['price']:
        item['price'] = e['price']
    if e['name'] in table:
        item['weight'] = table[e['name']]
    result.append(item)

poison_section = span(('Sample Poisons', 'Example poisons'), 'Traps')
for e in entries(poison_section):
    raw = [l for l in e['lines']]
    kind = next((l.strip() for l in raw if l.strip()), '')
    m = re.fullmatch(r'(Contact|Ingested|Inhaled|Injury) Poison', kind)
    text = paragraphs(raw[raw.index(next(l for l in raw if l.strip())) + 1:])
    item = {'key': key(e['name']), 'name': e['name'], 'category': 'Poison', 'text': text}
    if m:
        item['detail'] = m.group(1)
    if e['price']:
        item['price'] = e['price']
    result.append(item)

json.dump(result, open(out, 'w'), indent=1, ensure_ascii=False)
print(len(result), 'entries;', sum(1 for r in result if 'weight' in r), 'with weights')
