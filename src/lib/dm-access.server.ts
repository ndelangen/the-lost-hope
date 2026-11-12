import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

import {
  deleteCookie,
  getCookie,
  setCookie,
  setResponseHeaders,
} from '@tanstack/react-start/server'

const COOKIE_NAME = 'dag_dm_session'
const SESSION_SECONDS = 12 * 60 * 60
const PRIVATE_HEADERS = {
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow',
} as const

function accessCode() {
  const code = process.env.DAG_DM_ACCESS_CODE
  return code && /^[\da-f]{32}$/u.test(code) ? code : undefined
}

function digest(value: string) {
  return createHash('sha256').update(value).digest()
}

function signature(code: string, expires: string) {
  return createHmac('sha256', Buffer.from(code, 'hex')).update(`dag-dm-session:${expires}`).digest()
}

export function readDmAccess() {
  setResponseHeaders(new Headers(PRIVATE_HEADERS))
  const code = accessCode()
  if (!code) return 'unavailable'

  const cookie = getCookie(COOKIE_NAME)
  const token = cookie?.match(/^(\d{10})\.([\da-f]{64})$/u)
  if (!token || Number(token[1]) <= Math.floor(Date.now() / 1000)) return 'locked'

  return timingSafeEqual(signature(code, token[1]!), Buffer.from(token[2]!, 'hex'))
    ? 'unlocked'
    : 'locked'
}

export async function updateDmAccess(request: Request) {
  const url = new URL(request.url)
  if (request.headers.get('origin') !== url.origin) {
    return new Response(null, { status: 403, headers: PRIVATE_HEADERS })
  }

  const form = await request.formData().catch(() => null)
  const cookieOptions = {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: url.protocol === 'https:',
  } as const
  if (form?.get('action') === 'lock') {
    deleteCookie(COOKIE_NAME, cookieOptions)
    return backToDashboard()
  }

  const submitted = form?.get('code')
  const code = accessCode()
  if (!code || typeof submitted !== 'string' || !timingSafeEqual(digest(code), digest(submitted))) {
    return backToDashboard(true)
  }

  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS)
  setCookie(COOKIE_NAME, `${expires}.${signature(code, expires).toString('hex')}`, {
    ...cookieOptions,
    maxAge: SESSION_SECONDS,
  })
  return backToDashboard()
}

function backToDashboard(incorrect = false) {
  return new Response(null, {
    status: 303,
    headers: { ...PRIVATE_HEADERS, Location: incorrect ? '/dm?incorrect=true' : '/dm' },
  })
}
