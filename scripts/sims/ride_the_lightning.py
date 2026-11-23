"""Ride the Lightning take-back, turn by turn, with numbers read from the campaign's stat blocks.

Run the whole grid with `bun run sims:rtl`, which writes src/lib/sims/ride-the-lightning.json for the
DM page /dm/tools/fight-sims. For one narrated run or a quick summary (after the grid has written
scripts/sims/stats.json, or with SIM_STATS pointing at an export):

  python3 scripts/sims/ride_the_lightning.py log SEED [KEY=VALUE ...]
  python3 scripts/sims/ride_the_lightning.py stats N [KEY=VALUE ...]

Every AC, hit point total, attack bonus, damage roll, save bonus and save DC comes from the export
that scripts/sims/export-stats.ts derives from src/data. Tactics follow the scene's text. Options:
ROUTE=starboard|barracks|lower, FREE=0..4 soldiers woken in the Barracks (they follow the party),
CRYSTAL=never|early|late|every, FOCUS=scene|devan|soft|spread (who the enemies hit),
BAIL=early|normal|late|never (when Silas leaves), MISTAKE=0.1 (chance a player misplays a choice),
CRATE=0 (extra potions each before the Helm), SHORT=0|1 (a short rest before Korrag)."""
import json, os, random, re, statistics, sys
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
S = json.load(open(os.environ.get('SIM_STATS', os.path.join(HERE, 'stats.json'))))
R = random.Random(1)
LOG = []
VERBOSE = False
OPT = {}
ACTOR = None  # whose turn it is: the source of damage that names no other
EV = []  # this round's structured events, kept for replays only


def ev(**kw):
    if VERBOSE: EV.append(kw)


def group(c):
    """The kind of combatant, for damage flow totals: Breaker1 and Breaker2 are both Breaker."""
    return c.name.rstrip('0123456789')


def opt(k, d):
    return OPT.get(k, d)


def say(t):
    if VERBOSE:
        LOG.append(t)


def roll(expr):
    tot = 0
    for sign, term in re.findall(r'([+-]?)\s*(\d+d\d+|\d+)', expr.replace('−', '-').replace(' ', '')):
        if 'd' in term:
            n, d = term.split('d'); v = sum(R.randint(1, int(d)) for _ in range(int(n)))
        else:
            v = int(term)
        tot += -v if sign == '-' else v
    return tot


def dbl(e):
    return re.sub(r'(\d+)d', lambda m: f'{2 * int(m.group(1))}d', e)


def ab(slug, key):
    return next(a for a in S[slug]['abilities'] if a['key'] == key)


def atk(slug, key):
    a = ab(slug, key)['attack']
    return a['bonus'], a['damage'][0]['roll'].replace(' ', '')


def sdc(slug, key):
    return ab(slug, key)['save']['dc']


def d20(adv=False, dis=False):
    a, b = R.randint(1, 20), R.randint(1, 20)
    if adv and not dis: return max(a, b)
    if dis and not adv: return min(a, b)
    return a


class C:
    def __init__(s, slug, name=None, side='foe', **res):
        st = S[slug]
        s.slug, s.name, s.side = slug, name or st['name'].split(',')[0].split(' ')[0], side
        s.ac, s.maxhp = st['ac'], st['maxHp']; s.hp = s.maxhp
        s.saves = dict(st['saves']); s.init = st['init']
        s.res = dict(res); s.full = dict(res)
        s.cond = set(); s.react = True; s.temp = 0; s.mark = None; s.downs = 0; s.conc = None

    up = property(lambda s: s.hp > 0 and not s.cond & {'gone', 'out'})

    def tag(s):
        return f'{s.name} {s.hp}/{s.maxhp}'


class Fight:
    def __init__(s, pcs, foes, allies, name):
        s.pcs, s.foes, s.allies, s.name = pcs, foes, allies, name
        s.rnd = 0; s.stats = Counter(); s.frames = []; s.ejected = False

    def party(s): return s.pcs + s.allies
    def all(s): return s.pcs + s.allies + s.foes
    def live(s, side): return [c for c in (s.party() if side == 'pc' else s.foes) if c.up]
    def livepcs(s): return [c for c in s.pcs if c.up]
    def get(s, n): return next((c for c in s.all() if c.name == n), None)

    def damage(s, t, d, src=None, what='', crit=False, saved=None):
        if d <= 0: return
        by = src or ACTOR
        ev(k='dmg', by=by.name if by else None, to=t.name, what=what, dmg=d, crit=crit, saved=saved)
        if by:
            s.stats['dmg_' + by.side] += d
            if by.side == 'pc': s.stats['by_' + by.name] += d
            s.stats[f'flow|{group(by)}|{group(t)}'] += d
        if t.side == 'pc': s.stats['taken_' + t.name] += d
        was_up = t.up
        if t.temp:
            soak = min(t.temp, d); t.temp -= soak; d -= soak
        if t.conc and d > 0 and t.hp - d > 0:
            dc = min(30, max(10, d // 2)); adv = t.name == 'Cassian'
            r = d20(adv); ok = r + t.saves.get('con', 0) >= dc
            say(f'      {t.name} keeps concentration? {r}+{t.saves.get("con", 0)} vs DC {dc}: {"holds" if ok else "LOST: " + t.conc}')
            if not ok: s.end_conc(t)
        t.hp = max(0, t.hp - d)
        if t.hp == 0:
            if t.res.get('relentless', 0) > 0:
                t.res['relentless'] -= 1; t.hp = 1; ev(k='endure', who=t.name)
                say(f'      {t.name} hits 0 but Relentless Endurance keeps them up at 1 HP'); return
            t.cond.add('down'); t.cond -= {'held', 'prone', 'frightened', 'restrained', 'invisible'}; t.downs += 1
            say(f'      ** {t.name} goes DOWN **'); ev(k='down', who=t.name, by=by.name if by else None)
            if was_up and by and by.side == 'pc': s.stats['kill_' + by.name] += 1
            if t.conc: s.end_conc(t)
            if t.name == 'Ilsa':
                for c in s.foes:
                    if c.slug == 'dust-lost-sailor' and c.up:
                        c.cond.add('out'); ev(k='cond', who=c.name, what='out'); say(f'      {c.name} drops its weapon: nobody steers it any more')

    def end_conc(s, c):
        what = c.conc; c.conc = None
        if what == 'Spirit Guardians': s.stats['sg_broken'] += 1
        if what and what.startswith('Hold Person'):
            for t in s.all():
                if t.res.get('held_by') is c: t.cond.discard('held'); t.res['held_by'] = None; say(f'      {t.name} is free of Hold Person')
        if what == 'Entangle':
            for t in s.all(): t.cond.discard('restrained')

    def heal(s, t, amt, what):
        if 'dead' in t.cond: return
        was = t.hp; t.hp = min(t.maxhp, t.hp + amt); t.cond -= {'down', 'stable'}; t.res['saves'] = [0, 0]
        ev(k='heal', by=ACTOR.name if ACTOR else None, to=t.name, what=what, amt=t.hp - was)
        say(f'    {t.name} {what}: +{amt} ({was} -> {t.hp}/{t.maxhp})')

    def attack(s, a, t, bonus, dmg, *, melee=True, adv=False, dis=False, note='', can_parry=True):
        if t is None or not t.up: return 0
        label = note.strip(' ()')
        if melee and int(opt('FLANK', '0')) and t.up:
            # optional flanking rule: two melee fighters on opposite sides give advantage
            mates = [c for c in (s.foes if a.side == 'foe' else s.party()) if c.up and c is not a and c.slug in MELEE_SLUGS
                     and not c.cond & {'held', 'restrained', 'out', 'down'}]
            if mates: adv = True
        if t.cond & {'prone'}: adv, dis = (adv or melee), (dis or not melee)
        if t.cond & {'held', 'restrained'}: adv = True
        if a.cond & {'restrained', 'frightened', 'prone'}: dis = True
        if 'invisible' in t.cond: dis = True
        if 'invisible' in a.cond: adv = True; a.cond.discard('invisible')
        if a.side == 'foe' and a.mark is not None and a.mark.up and a.mark is not t: dis = True  # Auren's gauntlets
        # Durgan: Shield the Squad
        if a.side != 'foe' and t.side == 'foe' and t.name != 'Durgan':
            dg = s.get('Durgan')
            if dg and dg.up and dg.react and not dg.cond & {'held', 'prone'} and t.name in ('Korrag', 'Spellbinder') and not dis:
                dg.react = False; dis = True; note += ' (Durgan shields his squadmate: disadvantage)'
        if a.side == 'foe' and t.res.get('luck', 0) > 0 and t.hp <= t.maxhp * 0.6 and not dis:
            t.res['luck'] -= 1; dis = True; note += f' ({t.name} spends a Luck Point)'
        r = d20(adv, dis); tot = r + bonus; ac = t.ac + (5 if 'shielded' in t.cond else 0)
        auto_crit = 'held' in t.cond and melee
        crit = r == 20 or (auto_crit and r != 1 and tot >= ac)
        hit = r == 20 or (r != 1 and tot >= ac)
        if hit and r != 20 and t.react:
            sk = 'slot1' if t.name in ('Auren', 'Swift') else 'shield'
            if t.res.get(sk, 0) > 0 and tot < ac + 5 and t.res.get('shield_ok', True) and not mistake(s, t, 'forgot Shield'):
                t.res[sk] -= 1; t.react = False; t.cond.add('shielded'); hit = False; note += ' (Shield spell)'
            elif t.res.get('parry') and melee and tot < ac + 3 and can_parry:
                t.react = False; hit = False; note += ' (parried)'
        if not hit:
            how = 'shield' if 'Shield spell' in note else 'parry' if 'parried' in note else 'miss'
            ev(k='miss', by=a.name, to=t.name, what=label, how=how)
            say(f'    {a.name} -> {t.name}: {r}+{bonus}={tot} vs AC {ac}: miss{note}'); return 0
        d = roll(dbl(dmg) if crit else dmg)
        if t.res.get('uncanny') and t.react and d >= 8:
            t.react = False; d //= 2; note += ' (Uncanny Dodge halves it)'
        say(f'    {a.name} -> {t.name}: {r}+{bonus}={tot} vs AC {ac}: {"CRIT " if crit else ""}{d} dmg{note}')
        aga = melee and t.res.get('aga_on') and t.temp > 0
        if crit: s.stats['crit_' + ('pc' if a.side != 'foe' else 'foe')] += 1
        s.damage(t, d, src=a, what=label, crit=crit)
        say(f'      {t.tag()}')
        if aga and a.up:
            say(f'      Armor of Agathys bites {a.name} for {t.res["aga_on"]} cold'); s.damage(a, t.res['aga_on'], src=t, what='Armor of Agathys')
        if t.temp == 0: t.res['aga_on'] = 0
        return (d + 1000) if crit else max(d, 1)

    def save(s, t, abil, dc, adv=False):
        if t.cond & {'held', 'down'} and abil in ('str', 'dex'):
            say(f'    {t.name} auto-fails {abil} (paralysed)'); return False
        dis = 'restrained' in t.cond and abil == 'dex'
        if t.res.get('luck', 0) > 0 and t.side == 'pc' and abil in ('wis', 'con'):
            adv = True; t.res['luck'] -= 1
        r = d20(adv, dis); tot = r + t.saves.get(abil, 0); ok = tot >= dc
        say(f'    {t.name} {abil.upper()} save {r}+{t.saves.get(abil, 0)}={tot} vs DC {dc}: {"saved" if ok else "FAILED"}')
        return ok

    def frame(s, events, acts=()):
        s.frames.append({'round': s.rnd, 'acts': list(acts), 'combatants': [
            {'name': c.name, 'slug': c.slug, 'side': 'pc' if c in s.pcs else ('ally' if c in s.allies else 'foe'),
             'hp': c.hp, 'max': c.maxhp, 'temp': c.temp,
             'cond': sorted(x for x in c.cond if x != 'shielded')} for c in s.all()], 'events': events})


def mistake(f, p, kind):
    m = float(opt('MISTAKE', '0.1'))
    if p.side == 'pc' and m and R.random() < m:
        f.stats['mistakes'] += 1; ev(k='mistake', who=p.name, what=kind); say(f'    MISTAKE: {p.name} {kind}'); return True
    return False


# ------------------------------------------------------------------ the party, from the sheets
def make_pcs():
    give = opt('GIVE', 'Devan')
    pcs = [
        C('devan', 'Devan', 'pc', relentless=1, s1=4, s2=2, freesmite=1, loh=25, potion=3, bottle=1),
        C('auren', 'Auren', 'pc', slot1=4, field=3, agathys=1, entangle=1, potion=3, bottle=0),
        C('cassian-veyl', 'Cassian', 'pc', slot3=2, cunning=1, luck=3, potion=3, bottle=1),
        C('swift-starblade', 'Swift', 'pc', slot1=3, uncanny=1, luck=3, potion=3, bottle=1),
    ]
    g = next((p for p in pcs if p.name == give), None)
    if g: g.res['bottle'] += 1; g.full['bottle'] = g.res['bottle']
    for p in pcs: p.full = dict(p.res)
    return pcs


def long_rest(p, why):
    keep = {k: p.res[k] for k in ('bottle', 'potion')}
    if 'dead' in p.cond: return
    p.res.update(p.full); p.res.update(keep); p.hp = p.maxhp; p.cond -= {'down', 'stable'}; p.res['saves'] = [0, 0]
    say(f'  {p.name}: {why}, full HP and everything back')


def drink(f, p):
    """Bonus action: a bottle when it buys most, else a Potion of Healing. Auren can't drink."""
    if p.name == 'Auren': return False
    if p.name == 'Cassian' and p.res.get('bottle', 0) > 0 and p.res.get('slot3', 0) == 0 and any(
            e.up and (e.res.get('fireball') or e.res.get('cone') or e.res.get('hold')) for e in f.foes):
        p.res['bottle'] -= 1; f.stats['bottles'] += 1; long_rest(p, 'drinks a Long Rest in a Bottle mid-fight for his Counterspells'); return True
    low = p.hp <= p.maxhp * 0.3 or (p.name == 'Devan' and p.res.get('relentless') == 0 and p.hp <= 15)
    if p.res.get('bottle', 0) > 0 and low:
        p.res['bottle'] -= 1; f.stats['bottles'] += 1; long_rest(p, 'drinks a Long Rest in a Bottle (bonus action)'); return True
    if p.res.get('potion', 0) > 0 and p.hp <= p.maxhp * 0.5:
        p.res['potion'] -= 1; f.stats['potions'] += 1; f.heal(p, roll('2d4+2'), 'drinks a Potion of Healing (bonus action)'); return True
    return False


def foes_near(f, prefer):
    foes = [x for x in f.live('foe') if not x.cond & {'out'}]
    for pre in prefer:
        c = sorted([x for x in foes if x.name.startswith(pre) and 'invisible' not in x.cond], key=lambda x: x.hp)
        if c: return c[0]
    vis = [x for x in foes if 'invisible' not in x.cond]
    return min(vis, key=lambda x: x.hp) if vis else None


MELEE_SLUGS = {'hand-breaker', 'korrag-stonevow', 'durgan-ashfang', 'cloaked-snatcher', 'dust-lost-sailor', 'tempest-soldier', 'devan', 'auren', 'swift-starblade'}
MELEE_ORDER = ('Spellbinder', 'Breaker', 'Korrag', 'Durgan', 'Silas', 'Ilsa', 'Snatcher', 'Sailor')
RANGED_ORDER = ('Spellbinder', 'Ilsa', 'Silas', 'Breaker', 'Korrag', 'Durgan', 'Snatcher', 'Sailor')


def pc_turn(f, p):
    if not f.live('foe'): return
    if 'held' in p.cond: say(f'  {p.name} is paralysed and does nothing.'); return
    if 'prone' in p.cond: p.cond.discard('prone'); say(f'  {p.name} stands up (half movement).')
    blunder = None
    m = float(opt('MISTAKE', '0.1'))
    if m and R.random() < m:
        blunder = R.choice(['no bonus action', 'bad target', 'provokes', 'wastes action']); f.stats['mistakes'] += 1
        ev(k='mistake', who=p.name, what=blunder)
        say(f'    MISTAKE: {p.name}: {blunder}')
    if blunder == 'provokes':
        e = R.choice([x for x in f.live('foe') if x.slug != 'hand-spellbinder'] or f.live('foe'))
        k = OA.get(e.slug)
        if k and e.react and not e.cond & {'held', 'restrained', 'out'}:
            e.react = False; f.attack(e, p, *k, note=' (opportunity attack)')
        if not p.up: return
    bonus_used = blunder == 'no bonus action' or drink(f, p)
    # a downed friend who can drink gets a potion poured in (action); with no potions left, a
    # Long Rest in a Bottle. The one closest to dying goes first.
    downed = sorted([c for c in f.pcs if 'down' in c.cond and 'dead' not in c.cond and c.name != 'Auren'],
                    key=lambda c: ('stable' in c.cond, -c.res.get('saves', [0, 0])[1]))
    if downed and blunder != 'wastes action':
        t = downed[0]
        if p.res.get('potion', 0) > 0:
            p.res['potion'] -= 1; f.stats['potions'] += 1
            f.heal(t, roll('2d4+2'), f'gets a potion poured down the throat by {p.name} (action)'); return
        if p.res.get('bottle', 0) > 0:
            p.res['bottle'] -= 1; f.stats['bottles'] += 1; f.stats['bottle_poured'] += 1
            ev(k='heal', by=p.name, to=t.name, what='Long Rest in a Bottle poured down the throat (action)', amt=t.maxhp)
            long_rest(t, f'gets a Long Rest in a Bottle poured down the throat by {p.name} (action)'); return
    if blunder == 'wastes action': return
    bad = blunder == 'bad target'
    focus = opt('PARTY', 'scene')
    def first(order):
        # PARTY=ilsa: they take the hint and go for Ilsa; PARTY=silas: Silas draws them in
        if focus == 'ilsa': return ('Ilsa',) + tuple(x for x in order if x != 'Ilsa')
        if focus == 'silas': return ('Silas',) + tuple(x for x in order if x != 'Silas')
        return order
    pick = (lambda order: max(f.live("foe"), key=lambda x: x.hp, default=None)) if bad else (lambda order: foes_near(f, first(order)))
    if p.name == 'Devan':
        dv_down = [c for c in f.pcs if 'down' in c.cond]
        if not bonus_used and p.res['loh'] > 0 and dv_down:
            t = dv_down[0]; amt = min(p.res['loh'], 10); p.res['loh'] -= amt; f.heal(t, amt, 'Lay on Hands from Devan (bonus action)'); bonus_used = True
        elif not bonus_used and p.hp <= 20 and p.res['loh'] >= 10:
            amt = min(p.res['loh'], 25); p.res['loh'] -= amt; f.heal(p, amt, 'Lay on Hands on himself (bonus action)'); bonus_used = True
        b, dmg = atk('devan', 'mace-of-returning')
        for _ in range(2):
            t = pick(MELEE_ORDER)
            if not t: break
            r = f.attack(p, t, b, dmg, note=' (Steve, Mace of Returning)')
            big = t.slug in ('hand-breaker', 'korrag-stonevow', 'durgan-ashfang', 'silas-wren', 'ilsa-corrow', 'hand-spellbinder')
            if r and big and not bonus_used and t.up:
                crit = r >= 1000; sd = 0; lvl = 0
                if p.res['freesmite']: p.res['freesmite'] = 0; lvl = 1
                elif p.res['s2'] > 0 and (crit or t.hp > 25): p.res['s2'] -= 1; lvl = 2
                elif p.res['s1'] > 0: p.res['s1'] -= 1; lvl = 1
                if lvl:
                    bonus_used = True
                    il = f.get('Ilsa')
                    if lvl == 2 and il and il.up and il.react and il.res.get('counter') and not il.cond & {'held', 'out'}:
                        il.res['counter'] -= 1; il.react = False
                        say('      Ilsa Counterspells the Divine Smite (Con DC 14)')
                        if not f.save(p, 'con', 14): ev(k='countered', who='Devan', what='Divine Smite', by='Ilsa'); say('      ...the smite fizzles'); continue
                    sd = roll(dbl(f'{lvl + 1}d8') if crit else f'{lvl + 1}d8')
                    if crit: sd += roll('1d10')  # Savage Attacks
                    say(f'      Devan smites (bonus action): +{sd} radiant'); f.damage(t, sd, what='Divine Smite', crit=crit)
                    say(f'      {t.tag()}')
        return
    if p.name == 'Auren':
        foes = f.live('foe')
        if not bonus_used and p.res.get('agathys') and p.temp == 0:
            p.res['agathys'] = 0; p.temp = 5; p.res['aga_on'] = 5; bonus_used = True
            say('    Auren invokes his rune: Armor of Agathys (5 temp HP, 5 cold back at melee attackers)')
        elif not bonus_used and p.temp == 0 and p.res.get('field', 0) > 0:
            p.res['field'] -= 1; p.temp = 3; bonus_used = True; say('    Auren raises his Defensive Field: 3 temporary HP')
        if p.hp <= p.maxhp * 0.35 and p.res.get('slot1', 0) > 1:
            p.res['slot1'] -= 1; f.heal(p, roll('2d8+3'), 'casts Cure Wounds on himself (action)'); return
        big = [x for x in foes if x.slug in ('hand-breaker', 'korrag-stonevow', 'durgan-ashfang', 'cloaked-snatcher')]
        if p.res.get('entangle') and len(big) >= 2 and f.rnd <= 2 and not p.conc:
            p.res['entangle'] = 0; p.conc = 'Entangle'; tg = big[:3]
            say('    Auren invokes his rune: Entangle on ' + ', '.join(x.name for x in tg) + f' (Str DC {sdc("auren", "entangle")})')
            for x in tg:
                if not f.save(x, 'str', sdc('auren', 'entangle')): x.cond.add('restrained'); ev(k='cond', who=x.name, what='restrained', by='Auren'); say(f'      {x.name} is RESTRAINED')
            return
        small = [x for x in foes if x.slug in ('cloaked-snatcher', 'dust-lost-sailor') and not x.cond & {'out'}]
        bigs = [x for x in foes if x.slug not in ('cloaked-snatcher', 'dust-lost-sailor')]
        if len(small) >= 2 and not bigs and p.res.get('slot1', 0) > 1:
            p.res['slot1'] -= 1; tg = small[:3]; dmg = roll('2d8')
            say('    Auren: Thunderwave on ' + ', '.join(x.name for x in tg) + f' (Con DC {sdc("auren", "thunderwave")})')
            for x in tg:
                ok = f.save(x, 'con', sdc('auren', 'thunderwave')); f.damage(x, dmg // 2 if ok else dmg, what='Thunderwave', saved=ok); say(f'      {x.tag()}')
            return
        t = pick(('Korrag', 'Breaker', 'Durgan', 'Silas', 'Ilsa', 'Spellbinder', 'Snatcher', 'Sailor'))
        if t:
            b, dmg = atk('auren', 'thunder-gauntlets')
            f.attack(p, t, b, dmg + '+1d8', note=' (Booming Blade through the Thunder Gauntlets)')
            t.mark = p
        return
    if p.name == 'Cassian':
        b, dmg = atk('cassian-veyl', 'eldritch-blast')
        for _ in range(2):
            t = pick(RANGED_ORDER)
            if not t: break
            f.attack(p, t, b, dmg, melee=False, note=' (Eldritch Blast)')
        return
    if p.name == 'Swift':
        t = pick(('Spellbinder', 'Ilsa', 'Silas', 'Breaker', 'Korrag', 'Durgan', 'Snatcher', 'Sailor'))
        if not t: return
        ally = any(c.up and c.name in ('Devan', 'Auren') and not c.cond & {'held'} for c in f.pcs) or bool(f.live('pc')[4:])
        adv = p.res.get('vex') == t.name or (not bonus_used)  # Vex, or Steady Aim when he already stands next to it
        if adv and p.res.get('vex') != t.name: bonus_used = True
        b, dmg = atk('swift-starblade', 'rapier')
        r = f.attack(p, t, b, dmg + ('+3d6' if (ally or adv) else ''), adv=adv,
                     note=' (rapier' + (', Sneak Attack' if (ally or adv) else '') + ')')
        p.res['vex'] = t.name if r else None


OA = {}


def setup_oa():
    for slug, key in (('hand-breaker', 'chain-flail'), ('korrag-stonevow', 'warhammer'), ('durgan-ashfang', 'warhammer'),
                      ('cloaked-snatcher', 'sap'), ('dust-lost-sailor', 'boarding-axe'), ('silas-wren', 'hooked-blade'),
                      ('tempest-soldier', 'spear')):
        OA[slug] = atk(slug, key)


# ------------------------------------------------------------------ enemies, from their stat blocks
def aim(f, default):
    pcs = [c for c in f.live('pc') if 'invisible' not in c.cond]
    if not pcs: return None
    focus = opt('FOCUS', 'scene')
    if focus == 'soft':
        soft = [c for c in pcs if c.name in ('Swift', 'Cassian')]
        if soft: return min(soft, key=lambda c: c.hp)
    if focus == 'devan':
        d = f.get('Devan')
        if d and d.up: return d
    if focus == 'spread': return R.choice(pcs)
    if default is not None and default.up: return default
    return min(pcs, key=lambda c: c.hp)


def hold(f, e, t, key, slug):
    dc = sdc(slug, key)
    say(f'    {e.name} casts Hold Person on {t.name} (Wis DC {dc})')
    if counter(f, e, 'Hold Person'): ev(k='countered', who=e.name, what='Hold Person', by='Cassian'); return
    if e.conc: f.end_conc(e)
    e.conc = 'Hold Person'
    if not f.save(t, 'wis', dc):
        t.cond.add('held'); ev(k='cond', who=t.name, what='paralysed', by=e.name); t.res['held_by'] = e; t.res['held_dc'] = dc; f.stats['held_' + t.name] += 1; say(f'      {t.name} is PARALYSED')
    else:
        e.conc = None


UNNAMED = {'hand-breaker', 'cloaked-snatcher', 'hand-spellbinder', 'dust-lost-sailor'}
EVAC = {'cloaked-snatcher', 'dust-lost-sailor'}
POD_ROOMS = {'Batteries', 'Barracks', 'Lower deck'}  # the Control room and the Helm have no pods


def wants_pod(f, e):
    """Norbert 2026-11-24: once only unnamed enemies are left in a room with a pod, they Disengage and
    run for it. POD=alone (his rule): sailors and snatchers, once only they are left; POD=race: from the start; POD=losing: once half their number is down or this one is
    below half its HP. One of them reaching it ends the fight: all of them are pulled in and ejected."""
    mode = opt('POD', 'off')
    # Breakers never surrender: they fight on and answer No when the pod asks
    if mode == 'off' or f.name not in POD_ROOMS or e.slug not in UNNAMED or e.slug == 'hand-breaker': return False
    if any(c.up and c.slug not in UNNAMED for c in f.foes): return False
    if mode == 'alone':
        # Norbert's rule: sailors and snatchers evacuate once nobody else is left standing with them
        return e.slug in EVAC and all(c.slug in EVAC for c in f.foes if c.up)
    if mode == 'race': return True
    down = sum(1 for c in f.foes if not c.up)
    return down * 2 >= len(f.foes) or e.hp < e.maxhp / 2


def foe_turn(f, e):
    pcs = f.live('pc')
    if not pcs or e.cond & {'held', 'out'}: say(f'  {e.name} does nothing.') if e.cond & {'held'} else None; return
    if wants_pod(f, e):
        if e.cond & {'restrained', 'prone'}:
            e.cond.discard('prone'); ev(k='cond', who=e.name, what='held back from the escape pod')
            say(f'    {e.name} tries for the escape pod but is held back'); return
        e.res['pod'] = e.res.get('pod', 0) + 1
        if e.res['pod'] >= int(opt('POD_TURNS', '1')):
            f.stats['ejected'] += 1; ev(k='cond', who=e.name, what='in the escape pod: it ejects')
            say(f'    {e.name} Disengages and dives into the escape pod: everyone who answers Yes is pulled in, the pod ejects')
            for c in f.foes:
                if c.up and c.slug != 'hand-breaker':
                    c.cond.add('gone')
                    if c is not e: ev(k='cond', who=c.name, what='pulled into the escape pod')
            if not any(c.up for c in f.foes): f.ejected = True
        else:
            say(f'    {e.name} Disengages and runs for the escape pod')
        return
    if 'prone' in e.cond: e.cond.discard('prone')
    devan = f.get('Devan'); auren = f.get('Auren')
    lowest = min(pcs, key=lambda c: c.hp)
    if e.slug == 'hand-breaker':
        t = aim(f, devan if devan.up else lowest)
        if opt('FOCUS', 'scene') == 'scene' and e.mark is not None and e.mark.up and t is not e.mark and R.random() < 0.5: t = e.mark
        b, d = atk('hand-breaker', 'shield-bash')
        if f.attack(e, t, b, d, note=' (Shield Bash)') and t.up and 'held' not in t.cond:
            t.cond.add('prone'); ev(k='cond', who=t.name, what='prone', by=e.name); say(f'      {t.name} is knocked prone')
        b, d = atk('hand-breaker', 'chain-flail')
        for _ in range(2):
            if not t or not t.up: t = aim(f, None)
            if not t: break
            f.attack(e, t, b, d, note=' (Chain Flail)')
        return
    if e.slug == 'cloaked-snatcher':
        soft = [c for c in pcs if c.name in ('Swift', 'Cassian')]
        t = aim(f, min(soft, key=lambda c: c.hp) if soft and R.random() < 0.6 else R.choice(pcs))
        b, d = atk('cloaked-snatcher', 'sap')
        pack = len([x for x in f.live('foe') if x is not e]) > 0
        f.attack(e, t, b, d, adv=pack, note=' (Sap' + (', Pack Tactics' if pack else '') + ')'); return
    if e.slug == 'dust-lost-sailor':
        t = aim(f, min(pcs, key=lambda c: c.ac))
        if e.res.get('bolt', 1) and R.random() < 1 / 3:
            b, d = atk('dust-lost-sailor', 'shadow-bolt'); f.attack(e, t, b, d, melee=False, note=' (Shadow Bolt)'); return
        b, d = atk('dust-lost-sailor', 'boarding-axe'); f.attack(e, t, b, d, note=' (Boarding Axe)'); return
    if e.slug == 'tempest-soldier':
        t = foes_near(f, MELEE_ORDER)
        b, d = atk('tempest-soldier', 'spear')
        for _ in range(2 if e.res.pop('surge', 0) else 1):
            if t and t.up: f.attack(e, t, b, d, note=' (spear)')
        return
    if e.slug == 'korrag-stonevow':
        if e.res['presence'] and f.rnd == 1:
            e.res['presence'] = 0; dc = sdc('korrag-stonevow', 'conquering-presence')
            say(f'    Korrag roars: Conquering Presence (Wis DC {dc}, 30 ft)')
            for c in pcs:
                if not f.save(c, 'wis', dc): c.cond.add('frightened'); ev(k='cond', who=c.name, what='frightened', by=e.name)
            return
        if e.hp <= 40 and e.res['loh']:
            amt = e.res['loh']; e.res['loh'] = 0; f.heal(e, amt, 'Lay on Hands on himself (bonus action)')
        if e.res['hold'] and devan.up and 'held' not in devan.cond and f.rnd <= 3 and not e.conc:
            e.res['hold'] = 0; say('    Korrag: "Stand down, soldier."'); hold(f, e, devan, 'hold-person', 'korrag-stonevow'); return
        t = aim(f, devan if devan.up else lowest)
        b, d = atk('korrag-stonevow', 'warhammer')
        for _ in range(2):
            if not t or not t.up: t = aim(f, None)
            if not t: break
            r = f.attack(e, t, b, d, note=' (Warhammer)')
            if r and e.res['smite'] and t.up:
                e.res['smite'] -= 1; sd = roll('4d8' if r >= 1000 else '2d8'); say(f'      Korrag smites: +{sd} radiant'); f.damage(t, sd, what='Divine Smite', crit=r >= 1000); say(f'      {t.tag()}')
        return
    if e.slug == 'durgan-ashfang':
        if e.hp <= 25 and e.res['loh']:
            e.res['loh'] = 0; f.heal(e, 15, 'Lay on Hands on himself (bonus action)')
        t = aim(f, devan if devan.up else lowest)
        b, d = atk('durgan-ashfang', 'warhammer')
        for _ in range(2):
            if not t or not t.up: t = aim(f, None)
            if not t: break
            r = f.attack(e, t, b, d, note=' (Warhammer)')
            if r and e.res['smite'] and t.up:
                e.res['smite'] -= 1; sd = roll('4d8' if r >= 1000 else '2d8'); say(f'      Durgan Dust Smite: +{sd} necrotic'); f.damage(t, sd, what='Dust Smite', crit=r >= 1000); say(f'      {t.tag()}')
        return
    if e.slug == 'hand-spellbinder':
        near = [c for c in pcs if c.name in ('Devan', 'Auren') and c.up]
        if near and e.res['misty'] and R.random() < 0.35:
            e.res['misty'] -= 1; say('    Spellbinder Misty Steps away from the front line')
        if e.res['hold'] and auren.up and 'held' not in auren.cond and not e.conc:
            e.res['hold'] -= 1; hold(f, e, auren, 'hold-person', 'hand-spellbinder'); return
        cluster = [c for c in pcs if c.name in ('Swift', 'Cassian')]
        if e.res['fireball'] and len(cluster) == 2:
            e.res['fireball'] = 0; dc = sdc('hand-spellbinder', 'fireball')
            say(f'    Spellbinder: Fireball on Swift and Cassian (Dex DC {dc})')
            if counter(f, e, 'Fireball'): ev(k='countered', who=e.name, what='Fireball', by='Cassian'); return
            dmg = roll('8d6')
            for c in cluster:
                ok = f.save(c, 'dex', dc); dd = dmg // 2 if ok else dmg
                if ok and c.res.get('uncanny') is not None: dd = 0  # Evasion is level 7: no; keep half
                f.damage(c, dmg // 2 if ok else dmg, what='Fireball', saved=ok); say(f'      {c.tag()}')
            return
        if e.res['hold'] and devan.up and 'held' not in devan.cond and not e.conc:
            e.res['hold'] -= 1; hold(f, e, devan, 'hold-person', 'hand-spellbinder'); return
        if e.res['command'] and devan.up and 'prone' not in devan.cond:
            e.res['command'] -= 1; dc = sdc('hand-spellbinder', 'command'); say(f'    Spellbinder: Command "Grovel!" on Devan (Wis DC {dc})')
            if not f.save(devan, 'wis', dc): devan.cond.add('prone'); ev(k='cond', who='Devan', what='prone', by=e.name); say('      Devan drops prone')
            return
        b, d = atk('hand-spellbinder', 'fire-bolt'); f.attack(e, aim(f, min(pcs, key=lambda c: c.ac)), b, d, melee=False, note=' (Fire Bolt)'); return
    if e.slug == 'silas-wren':
        ilsa = f.get('Ilsa')
        others = [c for c in f.foes if c is not e]
        bail = opt('BAIL', 'normal')
        losing = {'early': e.hp < e.maxhp * 0.85 or any(not c.up for c in others),
                  'normal': e.hp <= e.maxhp * 0.5 or (ilsa and not ilsa.up),
                  'late': e.hp <= e.maxhp * 0.25 or not any(c.up for c in others),
                  'ilsa20': e.hp < e.maxhp * 0.6 or bool(ilsa and ilsa.hp < ilsa.maxhp * 0.2),
                  'never': False}[bail]
        if losing:
            if e.conc: f.end_conc(e)
            e.cond.add('gone'); f.stats['silas_fled'] += 1; ev(k='cond', who=e.name, what='fled')
            say('    Silas: "See you on the other side, my dear!" Invisibility, out of the window. He is gone.'); return
        if e.conc != 'Spirit Guardians' and e.res['sg']:
            e.res['sg'] = 0; e.conc = 'Spirit Guardians'; say(f'    Silas raises Spirit Guardians again (Wis DC {sdc("silas-wren", "spirit-guardians")})'); return
        # bonus action: Healing Word on a hurt ally, Mass Healing Word on downed sailors
        downed = [c for c in f.foes if 'down' in c.cond and c.slug == 'dust-lost-sailor' and not c.cond & {'out'}]
        if len(downed) >= 2 and e.res['mhw']:
            e.res['mhw'] = 0
            for c in downed: f.heal(c, roll('2d4+4'), 'Mass Healing Word from Silas')
        elif ilsa and ilsa.up and ilsa.hp <= ilsa.maxhp * 0.5 and e.res['hw']:
            e.res['hw'] -= 1; f.heal(ilsa, roll('2d4+4'), 'Healing Word from Silas (bonus action)')
        if e.res['command'] and devan.up and 'prone' not in devan.cond and 'held' not in devan.cond:
            e.res['command'] -= 1; dc = sdc('silas-wren', 'command'); say(f'    Silas: Command "Grovel!" on Devan (Wis DC {dc})')
            if not f.save(devan, 'wis', dc): devan.cond.add('prone'); ev(k='cond', who='Devan', what='prone', by=e.name); say('      Devan drops prone')
            return
        t = min(pcs, key=lambda c: c.saves.get('dex', 0)); dc = sdc('silas-wren', 'sacred-flame')
        say(f'    Silas: Sacred Flame on {t.name} (Dex DC {dc})')
        if not f.save(t, 'dex', dc): dd = roll('2d8'); f.damage(t, dd, what='Sacred Flame', saved=False); say(f'      {t.name} takes {dd}: {t.tag()}')
        return
    if e.slug == 'ilsa-corrow':
        cluster = [c for c in pcs if 'down' not in c.cond]
        if e.hp <= 30 and e.res['misty']: e.res['misty'] -= 1; say('    Ilsa Misty Steps back to the wheel')
        if e.res['fireball'] and len(cluster) >= 3:
            e.res['fireball'] -= 1; tg = cluster[:3] if R.random() < 0.5 else cluster
            dc = sdc('ilsa-corrow', 'fireball'); say('    Ilsa: Fireball on ' + ', '.join(c.name for c in tg) + f' (Dex DC {dc})')
            if counter(f, e, 'Fireball'): ev(k='countered', who=e.name, what='Fireball', by='Cassian'); return
            dmg = roll('8d6')
            for c in tg:
                ok = f.save(c, 'dex', dc); f.damage(c, dmg // 2 if ok else dmg, what='Fireball', saved=ok); say(f'      {c.tag()}')
            return
        if e.res['cone'] and len(cluster) >= 2:
            e.res['cone'] = 0; tg = cluster[:2]; dc = sdc('ilsa-corrow', 'cone-of-cold')
            say('    Ilsa: Cone of Cold on ' + ', '.join(c.name for c in tg) + f' (Con DC {dc})')
            if counter(f, e, 'Cone of Cold'): ev(k='countered', who=e.name, what='Cone of Cold', by='Cassian'); return
            dmg = roll('8d8')
            for c in tg:
                ok = f.save(c, 'con', dc); f.damage(c, dmg // 2 if ok else dmg, what='Cone of Cold', saved=ok); say(f'      {c.tag()}')
            return
        t = aim(f, min(pcs, key=lambda c: (c.hp, c.ac)))
        b, d = atk('ilsa-corrow', 'arcane-burst')
        for _ in range(3):
            if not t or not t.up: t = aim(f, None)
            if not t: break
            f.attack(e, t, b, d, melee=False, note=' (Arcane Burst)')
        return


def counter(f, e, spell):
    """Cassian Counterspells the big ones; 2024: the caster makes a Con save against his DC."""
    c = f.get('Cassian')
    if c and c.up and c.react and c.res.get('slot3', 0) > 0 and 'held' not in c.cond:
        if mistake(f, c, f'lets the {spell} through'): return False
        c.res['slot3'] -= 1; c.react = False; dc = S['cassian-veyl']['saveDc']['cha']
        say(f'      Cassian casts Counterspell on the {spell} (Con DC {dc})')
        if f.save(e, 'con', dc): say('      ...the spell gets through'); return False
        say('      ...the spell fizzles'); f.stats['counters'] += 1; return True
    return False


def start_of_turn(f, c):
    sil = f.get('Silas')
    if c.side == 'pc' and c in f.pcs and sil and sil.up and sil.conc == 'Spirit Guardians' and c.name in ('Devan', 'Auren') and c.up:
        dc = sdc('silas-wren', 'spirit-guardians'); ok = f.save(c, 'wis', dc); d = roll('3d8'); d = d // 2 if ok else d
        say(f'    Spirit Guardians burn {c.name} for {d}'); f.damage(c, d, src=sil, what='Spirit Guardians', saved=ok); say(f'      {c.tag()}')
    k = f.get('Korrag')
    if c.side == 'pc' and k and k.up and 'frightened' in c.cond and c.name in ('Devan', 'Auren') and c.up:
        say(f'    Aura of Conquest: {c.name} is frightened, held in place, takes 4 psychic'); f.damage(c, 4, src=k, what='Aura of Conquest'); say(f'      {c.tag()}')


def end_of_turn(f, c):
    if 'held' in c.cond and c.up:
        if f.save(c, 'wis', c.res.get('held_dc', 14)): c.cond.discard('held'); say(f'    {c.name} breaks free of Hold Person')
    if 'frightened' in c.cond and c.up:
        if f.save(c, 'wis', sdc('korrag-stonevow', 'conquering-presence')): c.cond.discard('frightened'); say(f'    {c.name} shakes off the fear')
    if 'restrained' in c.cond and c.up and c.side == 'foe':
        if R.randint(1, 20) + c.saves.get('str', 0) >= sdc('auren', 'entangle'): c.cond.discard('restrained'); say(f'    {c.name} tears free of the Entangle')


def death_save(f, c):
    """A downed PC's death saving throw at the start of their turn: 10+ succeeds, a 1 counts twice,
    a 20 brings them back with 1 HP. Three successes: stable. Three failures: dead."""
    r = R.randint(1, 20); sv = c.res.setdefault('saves', [0, 0])
    if r == 20:
        c.hp = 1; c.cond -= {'down', 'stable'}; c.res['saves'] = [0, 0]; f.stats['nat20_' + c.name] += 1
        ev(k='death', who=c.name, roll=r, ok=sv[0], fail=sv[1], result='up')
        say(f'    {c.name} death save: 20! Back up with 1 HP'); return
    if r >= 10: sv[0] += 1
    else: sv[1] += 2 if r == 1 else 1
    result = 'stable' if sv[0] >= 3 else 'dead' if sv[1] >= 3 else 'pass' if r >= 10 else 'fail'
    if result == 'stable': c.cond.add('stable')
    if result == 'dead': c.cond.add('dead'); f.stats['dead_' + c.name] += 1
    ev(k='death', who=c.name, roll=r, ok=sv[0], fail=min(sv[1], 3), result=result)
    say(f'    {c.name} death save: {r} ({sv[0]} successes, {min(sv[1], 3)} failures){" - STABLE" if result == "stable" else " - DEAD" if result == "dead" else ""}')


def run_fight(pcs, foes, allies, name, max_rounds=20):
    global ACTOR
    f = Fight(pcs, foes, allies, name)
    for c in f.all(): c.res['_init'] = R.randint(1, 20) + c.init
    order = sorted(f.all(), key=lambda c: -c.res['_init'])
    sil = f.get('Silas')
    if sil: sil.conc = 'Spirit Guardians'; sil.res['sg'] = 0
    say(f'\n### {name}\nInitiative: ' + ', '.join(c.name for c in order))
    f.frame([f'{name} starts. Initiative: ' + ', '.join(c.name for c in order)])
    for rnd in range(1, max_rounds + 1):
        f.rnd = rnd; mark = len(LOG); say(f'\nRound {rnd}'); EV.clear()
        for c in order: c.react = True; c.cond.discard('shielded')
        for c in order:
            if not f.livepcs() or not f.live('foe') or f.ejected: break
            if c in f.pcs and 'down' in c.cond and not c.cond & {'dead', 'stable'}:
                say(f'  {c.name} (down):'); ACTOR = c; ev(k='turn', who=c.name); death_save(f, c)
                if not c.up: continue
            elif not c.up: continue
            else:
                say(f'  {c.name} ({c.hp}/{c.maxhp}):'); ACTOR = c; ev(k='turn', who=c.name)
            start_of_turn(f, c)
            if not c.up: continue
            (pc_turn if c in f.pcs else foe_turn if c.side == 'foe' else foe_turn_ally)(f, c)
            end_of_turn(f, c)
        ACTOR = None
        f.frame(LOG[mark + 1:] if VERBOSE else [], EV)
        if not f.livepcs(): return 'party knocked out', f
        if not f.live('foe'): return 'party wins', f
        if f.ejected: return 'party wins', f  # the room is theirs; the enemies left in the pod
    return 'still fighting after 20 rounds', f


def foe_turn_ally(f, c):
    t = foes_near(f, MELEE_ORDER)
    if not t: return
    b, d = atk('tempest-soldier', 'spear')
    for _ in range(2 if c.res.pop('surge', 0) else 1):
        if t.up: f.attack(c, t, b, d, note=' (spear)')


def between(pcs, stats, next_room):
    dv = next(p for p in pcs if p.name == 'Devan'); au = next(p for p in pcs if p.name == 'Auren')
    for p in pcs:
        dead = 'dead' in p.cond
        p.cond.clear(); p.temp = 0; p.conc = None; p.res['vex'] = None; p.res['aga_on'] = 0; p.res['saves'] = [0, 0]
        if dead: p.cond.add('dead'); continue
        if p.hp == 0: p.hp = 1
    while au.hp <= au.maxhp * 0.6 and au.res.get('slot1', 0) > 2:
        au.res['slot1'] -= 1; au.hp = min(au.maxhp, au.hp + roll('2d8+3')); say(f'  Auren casts Cure Wounds on himself: {au.hp}/{au.maxhp}')
    give = max(0, dv.res['loh'] - 10); amt = min(give, max(0, int(au.maxhp * 0.8) - au.hp))
    if amt > 0: dv.res['loh'] -= amt; au.hp += amt; say(f'  Devan lays hands on Auren: +{amt} ({au.hp}/{au.maxhp})')
    for p in pcs:
        if p.name == 'Auren': continue
        while p.hp <= p.maxhp * 0.6 and p.res.get('potion', 0) > 0:
            p.res['potion'] -= 1; stats['potions'] += 1; p.hp = min(p.maxhp, p.hp + roll('2d4+2'))
            say(f'  {p.name} drinks a potion between rooms: {p.hp}/{p.maxhp}')
        spent = p.hp <= p.maxhp * 0.4 or (p.name == 'Devan' and p.res['relentless'] == 0)
        if p.res.get('bottle', 0) > 0 and (spent or (next_room == 'Helm' and p.res['bottle'] > 1 and p.hp < p.maxhp * 0.8)):
            p.res['bottle'] -= 1; stats['bottles'] += 1; long_rest(p, 'drinks a Long Rest in a Bottle between rooms')
        if p.res.get('cunning') and p.res.get('slot3', 0) < 2:
            p.res['cunning'] = 0; p.res['slot3'] += 1; say(f'  {p.name} regains a pact slot with Magical Cunning')


def crystal(pcs, stats, when):
    say(f'\nThe crystal room ({when}): they squeeze round the crystal and take a long rest while almost no time passes outside.')
    stats['crystal'] += 1
    for p in pcs: long_rest(p, 'long rest by the crystal')


def short_rest(pcs, stats):
    say('\nA short rest in a quiet room before the bridge section.')
    stats['short'] += 1
    for p in pcs:
        if p.name == 'Cassian': p.res['slot3'] = 2
        hd = {'Devan': '2d10+4', 'Auren': '2d8+6', 'Cassian': '2d8+6', 'Swift': '2d8'}[p.name]
        if p.hp < p.maxhp: p.hp = min(p.maxhp, p.hp + roll(hd)); say(f'  {p.name} spends hit dice: {p.hp}/{p.maxhp}')
        if p.name == 'Auren': p.res['field'] = max(p.res['field'], 1)


def enemies(room):
    if room == 'Batteries':
        return [C('hand-breaker', 'Breaker1', parry=1), C('hand-breaker', 'Breaker2', parry=1),
                C('cloaked-snatcher', 'Snatcher1'), C('cloaked-snatcher', 'Snatcher2')], []
    if room == 'Barracks':
        free = int(opt('FREE', '0'))
        return [C('hand-breaker', 'Breaker3', parry=1), C('cloaked-snatcher', 'Snatcher3'), C('cloaked-snatcher', 'Snatcher4')], \
            [C('tempest-soldier', f'Soldier{i + 1}', 'ally', surge=1) for i in range(free)]
    if room == 'Lower deck':
        return [C('cloaked-snatcher', f'Snatcher{i + 5}') for i in range(4)], []
    if room == 'Korrag':
        return [C('korrag-stonevow', 'Korrag', relentless=1, smite=3, presence=1, command=2, hold=1, loh=40),
                C('durgan-ashfang', 'Durgan', relentless=1, smite=2, loh=1),
                C('hand-spellbinder', 'Spellbinder', hold=2, command=2, fireball=1, misty=2)], []
    if room == 'Helm':
        return [C('ilsa-corrow', 'Ilsa', shield=2, fireball=2, cone=1, counter=1, misty=3),
                C('silas-wren', 'Silas', sg=0, hold=2, command=2, hw=2, mhw=1),
                C('dust-lost-sailor', 'Sailor1', bolt=1), C('dust-lost-sailor', 'Sailor2', bolt=1)], []


ROUTES = {
    'starboard': ['Batteries', 'Korrag', 'Helm'],
    'barracks': ['Batteries', 'Barracks', 'Korrag', 'Helm'],
    'lower': ['Lower deck', 'Korrag', 'Helm'],
}


def run_route():
    pcs = make_pcs(); total = Counter(); res = []; rooms = ROUTES[opt('ROUTE', 'starboard')]
    cry = opt('CRYSTAL', 'never'); fights = []; squad = []
    for i, room in enumerate(rooms):
        foes, allies = enemies(room)
        if room == 'Barracks' and allies:
            # waking a soldier costs healing: a potion each, poured in by whoever has spare
            for a in allies:
                giver = max(pcs, key=lambda p: p.res.get('potion', 0))
                if giver.res.get('potion', 0) > 0: giver.res['potion'] -= 1; total['potions'] += 1; total['woken'] += 1; a.hp = roll('2d4+2')
                else: a.hp = 0
            allies = [a for a in allies if a.hp > 0]
            say(f'  They cut loose and wake {len(allies)} Tempest soldiers with potions.')
            squad = allies
        else:
            allies = [a for a in squad if a.up]  # woken soldiers follow the party
        if room == 'Helm' and int(opt('CRATE', '0')):
            for p in pcs: p.res['potion'] += int(opt('CRATE', '0'))
            say(f'  A crate on the stairs: {opt("CRATE", "0")} more potions each.')
        out, f = run_fight(pcs, foes, allies, room)
        total += f.stats; res.append((room, out, f.rnd)); fights.append({'room': room, 'outcome': out, 'frames': f.frames})
        if out != 'party wins': break
        if i + 1 < len(rooms):
            say('\nBetween rooms:'); between(pcs, total, rooms[i + 1])
            if cry == 'every' or (cry == 'early' and i == 0) or (cry == 'late' and rooms[i + 1] == 'Helm'):
                crystal(pcs, total, cry)
            if int(opt('SHORT', '0')) and rooms[i + 1] == 'Korrag': short_rest(pcs, total)
    return res, total, pcs, fights


def stats(n, keep=0):
    outs = Counter(); where = Counter(); downs = Counter(); dmg = Counter(); kills = Counter()
    pot = []; bot = []; fled = 0; rounds = Counter(); held = Counter(); samples = {}; flow = Counter(); crit = Counter(); taken = Counter(); dead = Counter(); anydead = 0; poured = 0
    global VERBOSE
    for i in range(n):
        R.seed(1000 + i); VERBOSE = False
        res, total, pcs, fights = run_route()
        ok = all(o == 'party wins' for _, o, _ in res) and len(res) == len(ROUTES[opt('ROUTE', 'starboard')])
        last = res[-1]
        kind = 'win' if ok else ('tpk' if last[1] == 'party knocked out' else 'stall')
        outs[kind] += 1
        if not ok: where[last[0]] += 1
        for room, o, r in res: rounds[room] += r
        for p in pcs:
            if p.downs: downs[p.name] += 1
        for k in ('Devan', 'Auren', 'Cassian', 'Swift'):
            dmg[k] += total['by_' + k]; kills[k] += total['kill_' + k]; held[k] += bool(total['held_' + k])
        anydead += any(total['dead_' + k] for k in ('Devan', 'Auren', 'Cassian', 'Swift')); poured += total['bottle_poured']
        for k, v in total.items():
            if k.startswith('dead_'): dead[k[5:]] += v
            if k.startswith('flow|'): flow[k[5:]] += v
            elif k.startswith('crit_'): crit[k[5:]] += v
            elif k.startswith('taken_'): taken[k[6:]] += v
        pot.append(total['potions']); bot.append(total['bottles']); fled += bool(total['silas_fled'])
        if keep and kind not in samples: samples[kind] = 1000 + i
    tot = sum(dmg.values()) or 1
    return {
        'runs': n, 'win': outs['win'] / n, 'tpk': outs['tpk'] / n, 'stall': outs['stall'] / n,
        'lostAt': {k: v / n for k, v in where.items()},
        'down': {k: downs[k] / n for k in ('Devan', 'Auren', 'Cassian', 'Swift')},
        'held': {k: held[k] / n for k in ('Devan', 'Auren', 'Cassian', 'Swift')},
        'damageShare': {k: dmg[k] / tot for k in ('Devan', 'Auren', 'Cassian', 'Swift')},
        'kills': {k: kills[k] / n for k in ('Devan', 'Auren', 'Cassian', 'Swift')},
        'potions': statistics.mean(pot), 'bottles': statistics.mean(bot), 'silasFled': fled / n,
        'dead': {k: dead[k] / n for k in ('Devan', 'Auren', 'Cassian', 'Swift')},
        'anyDead': anydead / n, 'bottlesPoured': poured / n,
        'crits': {k: crit[k] / n for k in ('pc', 'foe')},
        'taken': {k: taken[k] / n for k in ('Devan', 'Auren', 'Cassian', 'Swift')},
        'flow': [[a, b, round(v / n, 1)] for (a, b), v in ((tuple(k.split('|')), v) for k, v in flow.items()) if v / n >= 0.5],
        'samples': samples,
    }


def replay(seed):
    global VERBOSE, LOG
    VERBOSE = True; LOG = []; R.seed(seed)
    res, total, pcs, fights = run_route()
    VERBOSE = False
    return {'seed': seed, 'result': [{'room': r, 'outcome': o, 'rounds': n} for r, o, n in res], 'fights': fights}


if __name__ == '__main__':
    setup_oa()
    mode = sys.argv[1]
    for a in sys.argv[3:]:
        k, v = a.split('='); OPT[k] = v
    if mode == 'log':
        VERBOSE = True; R.seed(int(sys.argv[2]))
        res, total, pcs, fights = run_route()
        print('\n'.join(LOG)); print('\nRESULT:', res, dict(total))
    elif mode == 'stats':
        print(json.dumps(stats(int(sys.argv[2])), indent=1))
