import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.AUTH_SECRET)

const parsedIdleHours = Number(process.env.ADMIN_SESSION_IDLE_HOURS)
const SESSION_IDLE_HOURS =
  Number.isFinite(parsedIdleHours) && parsedIdleHours > 0 ? parsedIdleHours : 5

export const SESSION_COOKIE = 'admin_session'
// Скользящее окно: сколько можно НЕ заходить в /admin, прежде чем разлогинит.
// Каждый заход в /admin продлевает токен заново (см. proxy.ts) — активный
// пользователь никогда не словит разлогин посреди работы.
export const SESSION_MAX_AGE = SESSION_IDLE_HOURS * 60 * 60 // в секундах, для cookie maxAge и JWT exp

export async function createSessionToken(adminId: string) {
  return new SignJWT({ sub: adminId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secret)
}

export async function verifySessionToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return typeof payload.sub === 'string' ? payload.sub : null
  } catch {
    return null
  }
}

// Общие опции cookie — используются и в server actions (next/headers `cookies()`),
// и в proxy.ts (NextResponse `cookies`), у обоих одинаковая сигнатура `.set(name, value, options)`.
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: SESSION_MAX_AGE,
    path: '/',
  }
}
