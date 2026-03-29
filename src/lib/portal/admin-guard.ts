import { timingSafeEqual } from 'crypto'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Verifies the current session belongs to the admin.
 * Returns the user if admin, throws otherwise.
 * Used in Server Components (call redirect() on null result).
 */
export async function getAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) return null

  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user || !user.email) return null
  if (user.email !== adminEmail) return null

  return user
}

/**
 * API route guard — returns 401/403 response if not admin, null if ok.
 * Usage: const guard = await requireAdmin(request); if (guard) return guard
 */
export async function requireAdmin(
  _request: NextRequest,
): Promise<NextResponse | null> {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (user.email !== adminEmail) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return null
}

/**
 * Timing-safe comparison for secrets (webhooks, cron).
 * Prevents timing attacks when comparing Bearer tokens.
 */
export function safeCompareSecret(a: string, b: string): boolean {
  try {
    const aBuf = Buffer.from(a, 'utf8')
    const bBuf = Buffer.from(b, 'utf8')
    if (aBuf.length !== bBuf.length) return false
    return timingSafeEqual(aBuf, bBuf)
  } catch {
    return false
  }
}

/**
 * Verifies a Bearer token against an env var secret using timing-safe comparison.
 */
export function verifyBearerSecret(request: NextRequest, envVar: string): boolean {
  const secret = process.env[envVar]
  if (!secret) return false
  const auth = request.headers.get('authorization') ?? ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  return safeCompareSecret(token, secret)
}
