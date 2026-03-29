import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/portal/admin-guard'
import { addChatbot, getClientById } from '@/lib/portal/admin-queries'

const VALID_PLATFORMS = ['whatsapp', 'web', 'instagram', 'email'] as const
const VALID_STATUSES = ['active', 'paused', 'training'] as const

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

  const { clientId, name, platform, status } = body as Record<string, unknown>

  if (
    typeof clientId !== 'string' || !clientId.trim() ||
    typeof name !== 'string' || !name.trim() ||
    typeof platform !== 'string' ||
    typeof status !== 'string'
  ) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
  }

  if (!(VALID_PLATFORMS as readonly string[]).includes(platform)) {
    return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
  }

  if (!(VALID_STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  // Verify that the target client actually exists
  const client = await getClientById(clientId)
  if (!client) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  }

  try {
    const chatbot = await addChatbot({
      clientId,
      name: name.trim(),
      platform: platform as (typeof VALID_PLATFORMS)[number],
      status: status as (typeof VALID_STATUSES)[number],
    })
    return NextResponse.json({ ok: true, data: chatbot }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Error' }, { status: 500 })
  }
}
