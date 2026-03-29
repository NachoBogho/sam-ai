import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { verifyBearerSecret } from '@/lib/portal/admin-guard'

const VALID_EVENTS = ['execution', 'error'] as const

interface AutomationWebhookPayload {
  event_type: (typeof VALID_EVENTS)[number]
  automation_id: string
  client_id: string
  execution_time_seconds?: number
}

async function upsertDailyStat(
  supabase: ReturnType<typeof createAdminClient>,
  client_id: string,
  date: string,
  field: 'executions' | 'errors',
) {
  const { data } = await supabase
    .from('daily_stats')
    .select('executions, errors')
    .eq('client_id', client_id)
    .eq('date', date)
    .maybeSingle()

  if (data) {
    await supabase
      .from('daily_stats')
      .update({ [field]: (data[field] ?? 0) + 1 })
      .eq('client_id', client_id)
      .eq('date', date)
  } else {
    await supabase
      .from('daily_stats')
      .insert({ client_id, date, [field]: 1 })
  }
}

export async function POST(request: NextRequest) {
  if (!verifyBearerSecret(request, 'WEBHOOK_SECRET')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let payload: AutomationWebhookPayload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { event_type, automation_id, client_id, execution_time_seconds } = payload

  if (
    !event_type || !(VALID_EVENTS as readonly string[]).includes(event_type) ||
    typeof automation_id !== 'string' || !automation_id ||
    typeof client_id !== 'string' || !client_id
  ) {
    return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const today = new Date().toISOString().slice(0, 10)
  const now = new Date().toISOString()

  try {
    const { data: automation } = await supabase
      .from('automations')
      .select('executions_this_month, errors_this_month, avg_execution_time_seconds')
      .eq('id', automation_id)
      .single()

    if (!automation) {
      return NextResponse.json({ error: 'Automation not found' }, { status: 404 })
    }

    if (event_type === 'execution') {
      const n = automation.executions_this_month ?? 0
      const oldAvg = automation.avg_execution_time_seconds ?? 0
      const newAvg =
        execution_time_seconds != null
          ? n === 0
            ? execution_time_seconds
            : (oldAvg * n + execution_time_seconds) / (n + 1)
          : oldAvg

      await supabase
        .from('automations')
        .update({
          executions_this_month: n + 1,
          last_execution: now,
          avg_execution_time_seconds: Math.round(newAvg * 100) / 100,
          status: 'active',
        })
        .eq('id', automation_id)

      await upsertDailyStat(supabase, client_id, today, 'executions')
    }

    if (event_type === 'error') {
      await supabase
        .from('automations')
        .update({
          errors_this_month: (automation.errors_this_month ?? 0) + 1,
          last_execution: now,
          status: 'error',
        })
        .eq('id', automation_id)

      await upsertDailyStat(supabase, client_id, today, 'errors')
    }

    return NextResponse.json({ ok: true, event_type })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
