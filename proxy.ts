import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  createSessionToken,
  verifySessionToken,
  sessionCookieOptions,
  SESSION_COOKIE,
} from '@/lib/auth'

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value
  const adminId = token ? await verifySessionToken(token) : null

  if (!adminId) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Скользящее окно: каждый заход продлевает токен заново, активный админ
  // не словит разлогин посреди работы — см. комментарий в lib/auth.ts.
  const response = NextResponse.next()
  const refreshedToken = await createSessionToken(adminId)
  response.cookies.set(SESSION_COOKIE, refreshedToken, sessionCookieOptions())

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
