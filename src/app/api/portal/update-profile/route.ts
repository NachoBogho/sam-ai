import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getClientProfile, updateClientProfile } from '@/lib/portal/queries'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = await getClientProfile(supabase)
  if (!client) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { company_name, contact_email, phone, website, industry } = body as Record<string, unknown>

  if (typeof company_name !== 'string' || !company_name.trim()) {
    return NextResponse.json({ error: 'El nombre de empresa es requerido' }, { status: 400 })
  }

  if (typeof contact_email !== 'string' || !EMAIL_REGEX.test(contact_email)) {
    return NextResponse.json({ error: 'Email de contacto inválido' }, { status: 400 })
  }

  const safePhone = typeof phone === 'string' && phone.trim() ? phone.trim() : null
  const safeWebsite = typeof website === 'string' && website.trim() ? website.trim() : null
  const safeIndustry = typeof industry === 'string' && industry.trim() ? industry.trim() : null

  try {
    await updateClientProfile(supabase, client.id, {
      company_name: company_name.trim(),
      contact_email: contact_email.trim().toLowerCase(),
      phone: safePhone,
      website: safeWebsite,
      industry: safeIndustry,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Error' }, { status: 500 })
  }
}
