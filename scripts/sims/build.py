"""Run every Ride the Lightning scenario and write src/lib/sims/ride-the-lightning.json.

Usage: bun run sims:rtl [RUNS]  (default 1000 runs per scenario)."""
import itertools, json, os, subprocess, sys
from multiprocessing import Pool

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
STATS = os.path.join(HERE, 'stats.json')
OUT = os.path.join(ROOT, 'src', 'lib', 'sims', 'ride-the-lightning.json')
RUNS = int(sys.argv[1]) if len(sys.argv) > 1 else 1000

ROUTES = [
    {'key': 'starboard', 'label': 'Starboard side', 'detail': 'Batteries, then Korrag, then the Helm.', 'opt': {'ROUTE': 'starboard'}},
    {'key': 'barracks', 'label': 'Through the Barracks', 'detail': 'Batteries, Barracks, Korrag, Helm. The tied-up soldiers stay tied up.', 'opt': {'ROUTE': 'barracks', 'FREE': '0'}},
    {'key': 'barracks-freed', 'label': 'Barracks, soldiers freed', 'detail': 'As through the Barracks, but they pour a potion into each of the 4 soldiers, who then fight with them to the end.', 'opt': {'ROUTE': 'barracks', 'FREE': '4'}},
    {'key': 'lower', 'label': 'The lower deck', 'detail': 'The lower deck (4 Snatchers) instead of the batteries, then Korrag, then the Helm.', 'opt': {'ROUTE': 'lower'}},
]
CRYSTAL = [
    {'key': 'never', 'label': 'Never found', 'detail': 'They never rest in the crystal room.'},
    {'key': 'early', 'label': 'Found early', 'detail': 'One long rest there after their first fight, none later.'},
    {'key': 'late', 'label': 'Only before the bridge', 'detail': 'Doors locked from most sides: they reach it only just before the Helm, and rest there once.'},
    {'key': 'every', 'label': 'Rest between every fight', 'detail': 'They find it early and come back to rest after every room.'},
]
FOES = [
    {'key': 'as-written', 'label': 'As written', 'detail': 'Targets as the scene describes, Silas leaves when it turns.', 'opt': {'FOCUS': 'scene', 'BAIL': 'normal'}},
    {'key': 'focus-devan', 'label': 'All on Devan', 'detail': 'Everyone hits Devan first, and Silas leaves early.', 'opt': {'FOCUS': 'devan', 'BAIL': 'early'}},
    {'key': 'soft-targets', 'label': 'Soft targets', 'detail': 'They go for Swift and Cassian first.', 'opt': {'FOCUS': 'soft', 'BAIL': 'normal'}},
    {'key': 'ruthless', 'label': 'Ruthless', 'detail': 'Soft targets first, and Silas never leaves.', 'opt': {'FOCUS': 'soft', 'BAIL': 'never'}},
]
PARTY = [
    {'key': 'scene', 'label': 'Whoever is closest', 'detail': 'Devan and Auren hit what stands next to them, Silas included; Swift and Cassian go for the casters.', 'opt': {'PARTY': 'scene'}},
    {'key': 'ilsa', 'label': 'They focus Ilsa', 'detail': 'They take the hint ("Here\'s your chance, Ilsa, show me you can take them") and everyone goes for Ilsa first.', 'opt': {'PARTY': 'ilsa'}},
    {'key': 'silas', 'label': 'Silas draws them in', 'detail': 'Everyone goes for Silas first.', 'opt': {'PARTY': 'silas'}},
]
MISTAKES = ['0', '0.1', '0.2']
ROOM_LABEL = {'Batteries': 'The batteries', 'Barracks': 'The Barracks', 'Lower deck': 'The lower deck',
              'Korrag': 'Korrag, just before the bridge', 'Helm': 'The Helm'}
PCS = {'devan', 'auren', 'cassian-veyl', 'swift-starblade'}


def ref_of(slug):
    return {'ref': 'pc' if slug in PCS else 'npc', 'key': slug.replace('-', '_')}


def compact(rp):
    rooms = []
    for fight in rp['fights']:
        first = fight['frames'][0]['combatants']
        roster = [{'name': c['name'], 'side': c['side'], 'who': ref_of(c['slug'])} for c in first]
        frames = [{'round': fr['round'], 'hp': [[c['hp'], c['max'], c['temp'], c['cond']] for c in fr['combatants']],
                   'acts': [{k: v for k, v in a.items() if v not in (None, False, '')} for a in fr['acts']], 'events': [e for e in fr['events'] if e.strip()]} for fr in fight['frames']]
        rooms.append({'room': ROOM_LABEL[fight['room']], 'outcome': fight['outcome'], 'roster': roster, 'frames': frames})
    return {'seed': rp['seed'], 'rooms': rooms}


def one(key):
    import ride_the_lightning as E
    r, c, fo, pa, m = key
    E.OPT.clear(); E.OPT.update(next(x for x in ROUTES if x['key'] == r)['opt'])
    E.OPT.update(next(x for x in FOES if x['key'] == fo)['opt']); E.OPT['CRYSTAL'] = c; E.OPT['MISTAKE'] = m
    E.OPT.update(next(x for x in PARTY if x['key'] == pa)['opt'])
    E.setup_oa()
    st = E.stats(RUNS, keep=1)
    samples = st.pop('samples')
    st['lostAt'] = {ROOM_LABEL[k]: v for k, v in st['lostAt'].items() if v > 0}
    scen = {'route': r, 'crystal': c, 'foes': fo, 'party': pa, 'mistakes': float(m), **st}
    reps = []
    if fo == 'as-written' and m == '0.1' and (pa == 'scene' or c == 'never'):
        for kind in ('win', 'tpk'):
            if kind in samples:
                reps.append({'route': r, 'crystal': c, 'party': pa, 'kind': kind, **compact(E.replay(samples[kind]))})
    return scen, reps


if __name__ == '__main__':
    with open(STATS, 'w') as fh:
        subprocess.run(['bun', os.path.join(HERE, 'export-stats.ts')], cwd=ROOT, stdout=fh, check=True)
    os.environ['SIM_STATS'] = STATS
    sys.path.insert(0, HERE)
    keys = list(itertools.product([x['key'] for x in ROUTES], [x['key'] for x in CRYSTAL], [x['key'] for x in FOES], [x['key'] for x in PARTY], MISTAKES))
    with Pool() as pool: res = pool.map(one, keys)
    strip = lambda xs: [{k: v for k, v in x.items() if k != 'opt'} for x in xs]
    out = {'runs': RUNS, 'routes': strip(ROUTES), 'crystal': CRYSTAL, 'foes': strip(FOES), 'party': strip(PARTY), 'mistakes': [float(m) for m in MISTAKES],
           'scenarios': [s for s, _ in res], 'replays': [r for _, rs in res for r in rs]}
    with open(OUT, 'w') as fh: json.dump(out, fh, separators=(',', ':'))
    print(f'{len(res)} scenarios, {len(out["replays"])} replays -> {os.path.relpath(OUT, ROOT)}')
