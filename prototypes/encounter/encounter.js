const { combatants, profiles, icons, effects, effectSources, effectTriggers } = await (
  await fetch('/roster')
).json()
const storageKey = 'lost-hope:encounter-prototype'
const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
const entries = Object.fromEntries(combatants.map((entry) => [entry.id, entry]))
const state = {
  order: [
    ...(saved?.order ?? []).filter((id) => entries[id]),
    ...combatants.map((entry) => entry.id).filter((id) => !saved?.order.includes(id)),
  ],
  active: entries[saved?.active] ? saved.active : combatants[0].id,
  round: saved?.round ?? 1,
  stats: saved?.stats ?? {},
  effects: saved?.effects ?? {},
}
const statsFor = (id) => {
  const { profile } = entries[id]
  const defaults = profiles[profile]
  return { hp: defaults?.maxHp, maxHp: defaults?.maxHp, ac: defaults?.ac, ...state.stats[id] }
}
const abilities = [
  ['str', 'Strength'],
  ['dex', 'Dexterity'],
  ['con', 'Constitution'],
  ['int', 'Intelligence'],
  ['wis', 'Wisdom'],
  ['cha', 'Charisma'],
]
const signed = (value) => (value >= 0 ? '+' : '−') + Math.abs(value)
const roll = (value) => (value === 0 ? 'd20' : 'd20 ' + (value > 0 ? '+ ' : '− ') + Math.abs(value))
const order = document.querySelector('#order')
const roster = document.querySelector('#roster')
const panel = document.querySelector('#stat-block')
const legendaryRow = document.querySelector('#legendary-row')
const legendaryType = 'Legendary actions'
let openLegendary
let selected = state.active
let openFeature
let openEffect

function escapeAttribute(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

function diceMarkup(text) {
  return escapeAttribute(text).replace(
    /(\d*)d(20|12|10|8|6|4)\b/g,
    (_, count, sides) =>
      `<span class="dice" title="${count}d${sides}">${count}${icons['d' + sides]}<span class="visually-hidden">d${sides}</span></span>`,
  )
}

function iconButton(icon, action, label, extra = '', image) {
  return `<button type="button" class="icon-button" data-action="${action}" aria-label="${escapeAttribute(label)}" data-label="${escapeAttribute(label)}" ${extra}>${image ? `<img src="${escapeAttribute(image)}" alt="">` : icons[icon]}</button>`
}

function avatar(id) {
  const { portrait, profile } = entries[id]
  const fallback = { knight: 'Shield', wolfie: 'PawPrint', spider: 'GiSpiderAlt', mimic: 'Box' }
  return portrait
    ? `<img src="${portrait}" alt="" draggable="false">`
    : icons[fallback[profile] ?? 'UserRound']
}

document.querySelector('[data-action="previous"]').innerHTML = icons.ArrowLeft
document.querySelector('[data-action="next"]').innerHTML = icons.ArrowRight

function save() {
  localStorage.setItem(storageKey, JSON.stringify(state))
}

function effectsFor(id) {
  const entity = entries[id].entity
  return entity
    ? effects.filter(
        (effect) => effect.entity.ref === entity.ref && effect.entity.key === entity.key,
      )
    : []
}

function effectButtons(id, list) {
  return list
    .map((effect) => {
      const ended = state.effects[effect.id]?.ended
      const tooltip = [
        effect.name,
        ended ? 'Ended' : effectTriggers[effect.trigger]?.label,
        ended ? undefined : effect.reminder,
        effect.detail,
      ]
        .filter(Boolean)
        .join('\n')
      return iconButton(
        effect.icon,
        'effect',
        effect.name,
        `data-id="${id}" data-effect="${effect.id}" aria-expanded="${selected === id && openEffect === effect.id}" data-tip="${escapeAttribute(tooltip)}"${ended ? ' data-ended' : ''}`,
      )
    })
    .join('')
}

function renderEffects(id) {
  const list = effectsFor(id)
  if (!list.length) return ''
  return `<section class="effect-strip" aria-label="Effects">
    <h3>Effects</h3>
    ${list
      .map((effect) => {
        const ended = state.effects[effect.id]?.ended
        const trigger = effectTriggers[effect.trigger]
        return `<div class="effect-entry" ${ended ? 'data-ended' : ''}>
        <header class="effect-heading">
          ${effectButtons(id, [effect])}
          <h4>${effect.name}${ended ? ' · Ended' : ''}</h4>
          ${!ended && trigger ? `<span class="effect-trigger" tabindex="0" data-label="${escapeAttribute(trigger.label)}">${icons[trigger.icon]}<span>${trigger.label}</span></span>` : ''}
          ${iconButton(ended ? 'RotateCcw' : 'Minus', 'toggle-effect', ended ? 'Restore effect' : 'End effect', `data-effect="${effect.id}"`)}
        </header>
        ${!ended && effect.reminder ? `<p class="effect-reminder">${effect.reminder}</p>` : ''}
        <p>${effect.detail}</p>
        ${effect.id === openEffect ? `<p class="effect-source muted">${escapeAttribute(effectSources[effect.source.key].name)} · Day ${effectSources[effect.source.key].day}${effect.mystery ? ' · Open mystery: ' + escapeAttribute(effectSources[effect.mystery.key].name) : ''}</p>` : ''}
      </div>`
      })
      .join('')}
  </section>`
}

function renderRoster() {
  const scrollTop = roster.scrollTop
  document.querySelector('#roster-count').textContent = state.order.length
  roster.innerHTML = `<table><thead><tr><th scope="col">Combatant</th><th scope="col">HP</th><th scope="col">AC</th></tr></thead>
    <tbody>${state.order
      .map((id) => {
        const { hp, maxHp, ac } = statsFor(id)
        const { name, profile } = entries[id]
        const activeEffects = effectsFor(id).filter((effect) => !state.effects[effect.id]?.ended)
        return `<tr ${id === state.active ? 'class="current"' : ''}>
        <td><div class="roster-identity"><span class="roster-name" data-roster-name="${id}">
          ${iconButton('Eye', 'inspect', 'Inspect ' + name, `data-id="${id}" aria-pressed="${selected === id}"`)}
          <span>${name}</span>${profile ? '' : '<small>Player</small>'}
        </span>${
          activeEffects.length
            ? `<span class="roster-effects">
          ${effectButtons(id, activeEffects)}
        </span>`
            : ''
        }</div></td>
        <td>${profile ? `<strong>${hp}</strong><span class="muted">/${maxHp}</span>` : '—'}</td>
        <td>${profile ? ac : '—'}</td>
      </tr>`
      })
      .join('')}</tbody></table>`
  roster.scrollTop = scrollTop
}

function render() {
  const scrollLeft = order.scrollLeft
  document.querySelector('#round').textContent = 'Round ' + state.round
  document.querySelector('#turn-status').textContent =
    entries[state.active].name + ' · Round ' + state.round
  document.querySelector('[data-action="previous"]').disabled =
    state.round === 1 && state.order[0] === state.active
  order.innerHTML = state.order
    .map(
      (id, index) => `<button type="button" class="initiative-slot"
    draggable="true" data-slot="${id}" aria-pressed="${selected === id}"
    aria-label="${escapeAttribute(entries[id].name)}"
    data-label="${escapeAttribute(index + 1 + '. ' + entries[id].name + (state.active === id ? ' · Current turn' : ''))}"
    ${state.active === id ? 'aria-current="step"' : ''} aria-describedby="move-hint">
    ${avatar(id)}<span class="position" aria-hidden="true">${index + 1}</span>
  </button>`,
    )
    .join('')
  order.scrollLeft = scrollLeft
  renderRoster()
  renderStatBlock()
  renderLegendaryRow()
}

function numberField(label, field, value, min = 0) {
  return `<label>${label}<input type="number" min="${min}" data-field="${field}" value="${value}"></label>`
}

function usesFor(feature, index, id = selected) {
  const stats = statsFor(id)
  if (feature.type === 'Legendary actions') {
    const maximum = profiles[entries[id].profile].legendaryUses
    return { uses: stats.legendary?.uses ?? maximum, maxUses: stats.legendary?.maxUses ?? maximum }
  }
  // Preserve uses recorded for these two abilities in the earlier prototype.
  const hasEarlierCounts = feature.name === 'Second Wind' || feature.name === 'Pounce'
  return {
    uses:
      stats.features?.[index]?.uses ?? (hasEarlierCounts ? stats.uses : undefined) ?? feature.uses,
    maxUses:
      stats.features?.[index]?.maxUses ??
      (hasEarlierCounts ? stats.maxUses : undefined) ??
      feature.uses,
  }
}

function renderStatBlock() {
  const { name, profile: key } = entries[selected]
  const profile = profiles[key]
  const heading = `<header class="stat-title"><div><p class="kind">${profile?.kind ?? 'Player'}</p><h2>${name}</h2></div>
    ${selected === state.active ? '<span class="turn-label">Current turn</span>' : ''}</header>`
  if (!profile) {
    panel.innerHTML = heading + (renderEffects(selected) || '<p class="muted">Initiative only.</p>')
    return
  }
  const { hp, maxHp, ac } = statsFor(selected)
  panel.innerHTML =
    heading +
    `
    <div class="health-bar">
      <div class="hp-control" role="group" aria-label="Hit points">
        ${icons.HeartPulse}
        <input class="hp-slider" aria-label="HP slider" type="range" min="0" max="${Math.max(hp, maxHp)}" value="${hp}">
        ${iconButton('Minus', 'damage', 'Subtract 1 HP')}
        <input class="hp-value" aria-label="HP" type="number" min="0" data-field="hp" value="${hp}">
        ${iconButton('Plus', 'heal', 'Add 1 HP')}
      </div>
      <div class="fields">
        ${numberField('Max HP', 'maxHp', maxHp, 1)}
        ${numberField('AC', 'ac', ac)}
        ${iconButton('RotateCcw', 'reset', 'Reset stats')}
      </div>
    </div>
    ${renderEffects(selected)}
    ${renderFeatures(profile)}
    <section class="saves" aria-labelledby="saves-heading">
      <h3 id="saves-heading">Saving throws</h3>
      <dl class="save-grid">${abilities
        .map(([key, label], index) => {
          const score = profile.scores[index]
          const modifier = Math.floor((score - 10) / 2)
          return `<div><dt>${label}</dt><dd class="formula">${diceMarkup(roll(profile.saves?.[key] ?? modifier))}</dd>
          <dd class="score">${score} (${signed(modifier)})</dd></div>`
        })
        .join('')}</dl>
    </section>
    <dl class="defenses">
      ${[
        ['Damage immunities', profile.damageImmunities],
        ['Condition immunities', profile.conditionImmunities],
        ['Damage resistances', profile.resistances],
        ['Speed', profile.speed],
      ]
        .filter(([, value]) => value)
        .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
        .join('')}
    </dl>
  `
}

function renderFeatures(profile) {
  const groups = [
    ['Actions', 'Swords'],
    ['Bonus actions', 'Zap'],
    ['Reactions', 'Shield'],
    ['Traits', 'PawPrint'],
  ]
  const open = profile.features[openFeature]
  return `<section class="feature-strip" aria-label="Creature abilities">
    ${groups.map(([type, icon]) => renderFeatureGroup(selected, type, icon, openFeature)).join('')}
    ${open ? renderFeatureDetail(selected, openFeature) : ''}
  </section>`
}

function renderLegendaryRow() {
  const scrollLeft = legendaryRow.querySelector('.legendary-groups')?.scrollLeft ?? 0
  const groups = state.order
    .map((id) =>
      renderFeatureGroup(
        id,
        legendaryType,
        'Crown',
        openLegendary?.id === id ? openLegendary.index : undefined,
      ),
    )
    .join('')
  legendaryRow.hidden = !groups
  legendaryRow.innerHTML = `<div class="legendary-groups">${groups}</div>
    ${openLegendary ? renderFeatureDetail(openLegendary.id, openLegendary.index) : ''}`
  legendaryRow.querySelector('.legendary-groups').scrollLeft = scrollLeft
}

function renderFeatureGroup(id, type, icon, expanded) {
  const members = profiles[entries[id].profile]?.features
    .map((feature, index) => ({ feature, index }))
    .filter(({ feature }) => feature.type === type)
  if (!members?.length) return ''
  const legendary = type === legendaryType
  const name = entries[id].name
  const { uses: sharedUses } = usesFor(members[0].feature, members[0].index, id)
  const label = legendary ? name + ' legendary actions' : type
  const description = legendary ? label + ' · ' + sharedUses + ' shared uses left' : label
  return `<div class="feature-group" role="group" aria-label="${escapeAttribute(label)}" data-combatant="${id}">
    <span class="timing-icon" tabindex="0" aria-label="${escapeAttribute(label)}" data-label="${escapeAttribute(description)}">
      ${icons[icon]}${legendary ? `<span class="uses-badge shared-uses" aria-hidden="true">${sharedUses}</span>` : ''}
    </span>${legendary ? `<span class="legendary-name">${escapeAttribute(name)}</span>` : ''}
    ${members
      .map(({ feature, index }) => {
        const { uses } = usesFor(feature, index, id)
        const tooltip = [
          feature.name + ' · ' + type,
          feature.text,
          legendary && 'After another creature’s turn. Shared uses.',
          feature.recharge,
          uses !== undefined && 'Uses left: ' + uses,
        ]
          .filter(Boolean)
          .join('\n')
        return `<span class="feature-icon ${feature.intent ?? 'support'}" data-feature="${index}">
        ${iconButton(feature.icon, 'feature', feature.name, `aria-expanded="${expanded === index}"${uses === 0 ? ' data-spent' : ''} data-tip="${escapeAttribute(tooltip)}"`, feature.weaponImage)}
        ${uses === undefined || legendary ? '' : `<span class="uses-badge" aria-hidden="true">${uses}</span>`}
      </span>`
      })
      .join('')}</div>`
}

function renderFeatureDetail(id, index) {
  const feature = profiles[entries[id].profile].features[index]
  const { uses, maxUses } = usesFor(feature, index, id)
  return `<div class="feature-detail" data-feature="${index}" data-combatant="${id}">
    <h3>${feature.type === legendaryType ? escapeAttribute(entries[id].name) + ' · ' : ''}${feature.name}</h3><p>${diceMarkup(feature.text)}</p>
    ${feature.type === 'Legendary actions' ? '<small>After another creature’s turn. Shared uses. Refill at the start of its turn.</small>' : ''}
    ${feature.recharge ? `<small>${feature.recharge}</small>` : ''}
    ${
      uses === undefined
        ? ''
        : `<div class="fields">
      ${numberField('Uses left', 'uses', uses)}
      ${numberField('Max uses', 'maxUses', maxUses)}
      ${iconButton('Play', 'use', 'Use ' + feature.name, uses === 0 ? 'disabled' : '')}
      ${iconButton('RotateCcw', 'recharge', 'Recharge ' + feature.name, uses >= maxUses ? 'disabled' : '')}
    </div>`
    }
  </div>`
}

function move(id, destination) {
  if (!id || id === destination || !destination) return
  const target = state.order.indexOf(destination)
  state.order = state.order.filter((entry) => entry !== id)
  state.order.splice(target, 0, id)
  save()
  render()
  order.querySelector(`[data-slot="${id}"]`).focus()
}

let dragging
order.addEventListener('dragstart', (event) => {
  dragging = event.target.closest('[data-slot]')?.dataset.slot
  if (dragging) event.dataTransfer.setData('text/plain', dragging)
})
order.addEventListener('dragover', (event) => {
  const target = event.target.closest('[data-slot]')
  if (dragging && target) event.preventDefault()
  for (const slot of order.children)
    slot.classList.toggle('drop-target', Boolean(dragging && slot === target))
})
order.addEventListener('dragend', () => {
  dragging = undefined
  order.querySelector('.drop-target')?.classList.remove('drop-target')
})
order.addEventListener('drop', (event) => {
  if (!dragging) return
  event.preventDefault()
  move(dragging, event.target.closest('[data-slot]')?.dataset.slot)
})
order.addEventListener('keydown', (event) => {
  const id = event.target.closest('[data-slot]')?.dataset.slot
  const direction = { ArrowLeft: -1, ArrowRight: 1 }[event.key]
  if (!id || !event.altKey || !direction) return
  event.preventDefault()
  move(id, state.order[state.order.indexOf(id) + direction])
})

function inspect(id, selector) {
  selected = id
  openFeature = undefined
  openEffect = undefined
  render()
  document.querySelector(selector)?.focus({ preventScroll: true })
  if (
    panel.getBoundingClientRect().top < legendaryRow.offsetHeight ||
    window.matchMedia('(max-width: 660px)').matches
  ) {
    panel.style.scrollMarginTop = legendaryRow.offsetHeight + 'px'
    panel.scrollIntoView({ block: 'start' })
  }
}

function changeTurn(step) {
  const index = state.order.indexOf(state.active) + step
  if (index < 0 && state.round === 1) return
  if (index < 0 || index >= state.order.length) state.round += step
  openFeature = undefined
  openEffect = undefined
  selected = state.active = state.order[(index + state.order.length) % state.order.length]
  save()
  render()
  order.querySelector('[aria-current]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}

function setStat(field, value, feature, id = selected) {
  const stats = (state.stats[id] ??= {})
  if (feature === undefined) {
    stats[field] = value
  } else {
    const definition = profiles[entries[id].profile].features[feature]
    const counts =
      definition.type === 'Legendary actions'
        ? (stats.legendary ??= {})
        : ((stats.features ??= {})[feature] ??= {})
    counts[field] = value
  }
  save()
}

document.addEventListener('click', (event) => {
  const slot = event.target.closest('[data-slot]')
  if (slot) {
    const id = slot.dataset.slot
    inspect(id, `[data-slot="${id}"]`)
    return
  }
  const button = event.target.closest('[data-action]')
  if (!button) {
    const name = event.target.closest('[data-roster-name]')
    if (name) {
      const id = name.dataset.rosterName
      inspect(id, `#roster [data-id="${id}"]`)
    }
    return
  }
  const { action, id } = button.dataset
  if (action === 'inspect') return inspect(id, `#roster [data-id="${id}"]`)
  if (action === 'effect') {
    const effectId = button.dataset.effect
    const fromRoster = roster.contains(button)
    const wasOpen = selected === id && openEffect === effectId
    selected = id
    openFeature = undefined
    openEffect = !fromRoster && wasOpen ? undefined : effectId
    render()
    const trigger = (fromRoster ? roster : panel).querySelector(
      `[data-id="${id}"][data-effect="${effectId}"]`,
    )
    trigger?.focus({ preventScroll: true })
    if (fromRoster && window.matchMedia('(max-width: 660px)').matches) {
      panel.style.scrollMarginTop = legendaryRow.offsetHeight + 'px'
      panel.scrollIntoView({ block: 'start' })
    }
    return
  }
  if (action === 'toggle-effect') {
    const effectId = button.dataset.effect
    state.effects[effectId] = { ended: !state.effects[effectId]?.ended }
    save()
    renderRoster()
    renderStatBlock()
    panel.querySelector('[data-action="toggle-effect"]')?.focus({ preventScroll: true })
    return
  }
  if (action === 'next') return changeTurn(1)
  if (action === 'previous') return changeTurn(-1)
  const feature = button.closest('[data-feature]')?.dataset.feature
  if (legendaryRow.contains(button)) {
    const owner = button.closest('[data-combatant]').dataset.combatant
    const index = Number(feature)
    if (action === 'feature') {
      openLegendary =
        openLegendary?.id === owner && openLegendary.index === index
          ? undefined
          : { id: owner, index }
    } else {
      const definition = profiles[entries[owner].profile].features[index]
      const { uses, maxUses } = usesFor(definition, index, owner)
      setStat('uses', action === 'use' ? uses - 1 : maxUses, index, owner)
    }
    renderLegendaryRow()
    const trigger = legendaryRow.querySelector(
      `.feature-group[data-combatant="${owner}"] [data-feature="${index}"] button`,
    )
    const control = legendaryRow.querySelector(`.feature-detail [data-action="${action}"]:enabled`)
    const focusTarget = control ?? trigger
    focusTarget.focus({ preventScroll: true })
    return
  }
  if (action === 'feature') {
    const index = Number(feature)
    openFeature = openFeature === index ? undefined : index
    renderStatBlock()
    panel.querySelector(`[data-feature="${index}"] button`).focus({ preventScroll: true })
    return
  }
  const { hp, maxHp } = statsFor(selected)
  if (action === 'damage') setStat('hp', Math.max(0, hp - 1))
  if (action === 'heal') setStat('hp', Math.max(hp, Math.min(maxHp, hp + 1)))
  if (action === 'reset') {
    delete state.stats[selected]
    save()
  }
  if (feature !== undefined) {
    const index = Number(feature)
    const { uses, maxUses } = usesFor(profiles[entries[selected].profile].features[index], index)
    setStat('uses', action === 'use' ? uses - 1 : maxUses, index)
  }
  renderRoster()
  renderStatBlock()
  if (action === 'reset') renderLegendaryRow()
  const root =
    feature === undefined
      ? panel
      : panel.querySelector(`.feature-detail[data-feature="${feature}"]`)
  root.querySelector(`[data-action="${action}"]:enabled`)?.focus({ preventScroll: true })
})

function syncHealth() {
  const { hp, maxHp, ac } = statsFor(selected)
  const row = roster.querySelector(`[data-id="${selected}"]`).closest('tr')
  row.cells[1].innerHTML = `<strong>${hp}</strong><span class="muted">/${maxHp}</span>`
  row.cells[2].textContent = ac
  const slider = panel.querySelector('.hp-slider')
  slider.max = Math.max(hp, maxHp)
  slider.value = hp
  panel.querySelector('.hp-value').value = hp
}

panel.addEventListener('input', ({ target }) => {
  if (!target.matches('.hp-slider')) return
  setStat('hp', target.valueAsNumber)
  syncHealth()
})
function editStat({ target }) {
  const field = target.dataset.field
  if (!field) return
  const detail = target.closest('.feature-detail')
  const id = detail?.dataset.combatant ?? selected
  const index = detail ? Number(detail.dataset.feature) : undefined
  const definition = detail ? profiles[entries[id].profile].features[index] : undefined
  const counts = definition ? usesFor(definition, index, id) : statsFor(id)
  if (!target.validity.valid || !Number.isInteger(target.valueAsNumber)) {
    target.value = counts[field]
    return
  }
  setStat(field, target.valueAsNumber, index, id)
  if (!detail) {
    syncHealth()
    return
  }
  const { uses, maxUses } = { ...counts, [field]: target.valueAsNumber }
  detail.querySelector('[data-action="use"]').disabled = uses === 0
  detail.querySelector('[data-action="recharge"]').disabled = uses >= maxUses
  const legendary = definition.type === legendaryType
  const group = legendary
    ? legendaryRow.querySelector(`.feature-group[data-combatant="${id}"]`)
    : panel
  const triggers = legendary
    ? group.querySelectorAll('[data-action="feature"]')
    : [group.querySelector(`.feature-icon[data-feature="${index}"] button`)]
  const badge = legendary ? group.querySelector('.shared-uses') : triggers[0].nextElementSibling
  badge.textContent = uses
  if (legendary)
    badge.parentElement.dataset.label =
      entries[id].name + ' legendary actions · ' + uses + ' shared uses left'
  for (const trigger of triggers) {
    trigger.toggleAttribute('data-spent', uses === 0)
    trigger.dataset.tip = trigger.dataset.tip.replace(/Uses left: .+$/, 'Uses left: ' + uses)
  }
}
panel.addEventListener('change', editStat)
legendaryRow.addEventListener('change', editStat)

const tooltip = document.createElement('div')
tooltip.className = 'tooltip'
tooltip.id = 'encounter-tooltip'
tooltip.setAttribute('role', 'tooltip')
tooltip.hidden = true
document.body.append(tooltip)
let tooltipTarget
function showTooltip(target) {
  const text =
    target.dataset.tip || target.dataset.label || target.title || target.getAttribute('aria-label')
  if (!text) return
  if (tooltipTarget) hideTooltip()
  tooltipTarget = target
  const descriptions = target.getAttribute('aria-describedby')?.split(' ') ?? []
  target.setAttribute('aria-describedby', [...descriptions, tooltip.id].join(' '))
  tooltip.innerHTML = diceMarkup(text)
  tooltip.hidden = false
  const rect = target.getBoundingClientRect()
  const height = tooltip.offsetHeight
  tooltip.style.left = Math.max(8, Math.min(rect.left, innerWidth - tooltip.offsetWidth - 8)) + 'px'
  tooltip.style.top =
    (rect.bottom + height + 8 <= innerHeight
      ? rect.bottom + 6
      : Math.max(8, rect.top - height - 6)) + 'px'
}
function hideTooltip() {
  tooltip.hidden = true
  if (tooltipTarget) {
    const descriptions = tooltipTarget
      .getAttribute('aria-describedby')
      .split(' ')
      .filter((id) => id !== tooltip.id)
    if (descriptions.length) tooltipTarget.setAttribute('aria-describedby', descriptions.join(' '))
    else tooltipTarget.removeAttribute('aria-describedby')
  }
  tooltipTarget = undefined
}
const tooltipSelector = '.icon-button, .initiative-slot, .timing-icon, .effect-trigger'
document.addEventListener('pointerover', (event) => {
  const target = event.target.closest(tooltipSelector)
  if (target && target !== tooltipTarget) showTooltip(target)
})
document.addEventListener('pointerout', (event) => {
  if (tooltipTarget?.contains(event.target) && !tooltipTarget.contains(event.relatedTarget))
    hideTooltip()
})
document.addEventListener('focusin', (event) => {
  if (event.target.matches(tooltipSelector) && event.target.matches(':focus-visible'))
    showTooltip(event.target)
})
document.addEventListener('focusout', (event) => {
  if (event.target === tooltipTarget) hideTooltip()
})
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') hideTooltip()
})
document.addEventListener('click', hideTooltip)
document.addEventListener('scroll', hideTooltip, true)

render()
