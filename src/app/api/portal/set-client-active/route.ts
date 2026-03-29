import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/portal/admin-guard'
import { setClientActive, getClientById } from '@/lib/portal/admin-queries'

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

  const { clientId, active } = body as Record<string, unknown>

  if (typeof clientId !== 'string' || !clientId || typeof active !== 'boolean') {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
  }

  const client = await getClientById(clientId)
  if (!client) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  }

  try {
    await setClientActive(clientId, active)
    return NextResponse.json({ ok: true, active })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Error' }, { status: 500 })
  }
}
