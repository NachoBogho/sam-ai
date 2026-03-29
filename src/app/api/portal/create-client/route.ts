import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/portal/admin-guard'
import { createClientWithUser } from '@/lib/portal/admin-queries'

const VALID_PLANS = ['starter', 'growth', 'enterprise'] as const
type Plan = (typeof VALID_PLANS)[number]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  const guard = await requireAdmin(request)
  if (guard) return guard

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { email, password, companyName, contactEmail, plan } = body as Record<string, unknown>

  if (
    typeof email !== 'string' || !email.trim() ||
    typeof password !== 'string' ||
    typeof companyName !== 'string' || !companyName.trim() ||
    typeof contactEmail !== 'string' || !contactEmail.trim() ||
    typeof plan !== 'string'
  ) {
    return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 })
  }

  if (!EMAIL_REGEX.test(email) || !EMAIL_REGEX.test(contactEmail)) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  if (!(VALID_PLANS as readonly string[]).includes(plan)) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  try {
    const result = await createClientWithUser({
      email: email.trim().toLowerCase(),
      password,
      companyName: companyName.trim(),
      contactEmail: contactEmail.trim().toLowerCase(),
      plan: plan as Plan,
    })
    return NextResponse.json({ success: true, data: result }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
