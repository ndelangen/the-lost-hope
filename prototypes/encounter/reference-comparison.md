# Encounter tracker comparison

I compared the local prototype source with OpenFray's documentation, Improved Initiative's combatant model, and D&D Battle Tracker's README. This is a feature comparison based on those sources.

The Lost Hope prototype keeps campaign portraits, save formulas, and action icons close to the turn order. Its separate legendary row lets the DM spend an off-turn use while inspecting another creature. It already saves per-combatant HP, AC, and uses, plus turn order and round.

## What the reference tools track

- OpenFray puts conditions on roster rows, tracks separately depleted temporary HP, and accepts relative changes such as `-8` in the HP input. It also tracks concentration by spell, its targets, and what happens when the caster takes damage. [Tracker](https://openfray.app/docs/reference/tracker/) · [Concentration](https://openfray.app/docs/guides/concentration/)
- OpenFray tracks effects that last a number of rounds or end at a turn boundary. It also tracks spent reactions and refreshes resources when advancing turns. [Effects](https://openfray.app/docs/guides/effects/) · [Rounds and turns](https://openfray.app/docs/guides/encounters/)
- Improved Initiative stores tags, temporary HP, combat notes, reactions spent, numeric initiative, and initiative groups on each combatant. [Combatant source](https://github.com/cynicaloptimist/improved-initiative/blob/development/client/Combatant/Combatant.ts#L19-L62)
- D&D Battle Tracker supports conditions and notes with elapsed time, downed or dead markers, combatant changes mid-fight, and saved battles. It supports player entries without HP. [D&D Battle Tracker features](https://github.com/Paul-Ladyman/dnd-battle-tracker#features)

## What matters for The Lost Hope

1. Start with conditions and effects that can appear on any combatant, including player placeholders. Capture the label, source when it matters, and a manual expiry or a named turn boundary. The sample spider's Web illustrates the gap. Spending Web stays saved, while who is restrained and how they can escape still have to be remembered.
2. Make concentration a visible state with the spell name and affected creatures. Offer a reminder when the caster takes damage, with the DM deciding whether concentration holds and when effects end.
3. Track temporary HP separately, and let the DM mark a combatant downed or out of the fight. A signed HP delta is a useful input improvement because damage typically arrives as an amount.
4. Add a reaction-spent flag where it helps. Keep recharge manual and distinguish a timing reminder from an automatic change.
5. Allow reinforcements and removals while preserving the current turn. Numeric initiative and groups can help with large rosters. Saved encounters or undo merit a separate workflow decision.
