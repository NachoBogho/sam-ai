import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/portal/admin-guard'
import { deleteClient, getClientById } from '@/lib/portal/admin-queries'

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

  const { clientId } = body as Record<string, unknown>

  if (typeof clientId !== 'string' || !clientId) {
    return NextResponse.json({ error: 'Missing clientId' }, { status: 400 })
  }

  // Resolve clientId → user_id (needed to delete from Supabase Auth)
  const client = await getClientById(clientId)
  if (!client) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  }

  try {
    await deleteClient(client.user_id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Error' }, { status: 500 })
  }
}
