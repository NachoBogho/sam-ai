import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { verifyBearerSecret } from '@/lib/portal/admin-guard'

const VALID_EVENTS = ['message', 'conversation_start', 'lead', 'conversation_resolved'] as const

interface ChatbotWebhookPayload {
  event_type: (typeof VALID_EVENTS)[number]
  chatbot_id: string
  client_id: string
  response_time_seconds?: number
}

async function upsertDailyStat(
  supabase: ReturnType<typeof createAdminClient>,
  client_id: string,
  date: string,
  field: 'messages' | 'conversations' | 'leads',
) {
  const { data } = await supabase
    .from('daily_stats')
    .select('messages, conversations, leads')
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

  let payload: ChatbotWebhookPayload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { event_type, chatbot_id, client_id, response_time_seconds } = payload

  if (
    !event_type || !(VALID_EVENTS as readonly string[]).includes(event_type) ||
    typeof chatbot_id !== 'string' || !chatbot_id ||
    typeof client_id !== 'string' || !client_id
  ) {
    return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const today = new Date().toISOString().slice(0, 10)

  try {
    if (event_type === 'message') {
      const { data: chatbot } = await supabase
        .from('chatbots')
        .select('messages_this_month, avg_response_time_seconds')
        .eq('id', chatbot_id)
        .single()

      if (chatbot) {
        const n = chatbot.messages_this_month ?? 0
        const oldAvg = chatbot.avg_response_time_seconds ?? 0
        const newAvg =
          response_time_seconds != null
            ? n === 0
              ? response_time_seconds
              : (oldAvg * n + response_time_seconds) / (n + 1)
            : oldAvg

        await supabase
          .from('chatbots')
          .update({
            messages_this_month: n + 1,
            avg_response_time_seconds: Math.round(newAvg * 10) / 10,
          })
          .eq('id', chatbot_id)
      }

      await upsertDailyStat(supabase, client_id, today, 'messages')
    }

    if (event_type === 'conversation_start') {
      const { data: chatbot } = await supabase
        .from('chatbots')
        .select('conversations_this_month')
        .eq('id', chatbot_id)
        .single()

      await supabase
        .from('chatbots')
        .update({ conversations_this_month: (chatbot?.conversations_this_month ?? 0) + 1 })
        .eq('id', chatbot_id)

      await upsertDailyStat(supabase, client_id, today, 'conversations')
    }

    if (event_type === 'lead') {
      const { data: chatbot } = await supabase
        .from('chatbots')
        .select('leads_captured_this_month')
        .eq('id', chatbot_id)
        .single()

      await supabase
        .from('chatbots')
        .update({ leads_captured_this_month: (chatbot?.leads_captured_this_month ?? 0) + 1 })
        .eq('id', chatbot_id)

      await upsertDailyStat(supabase, client_id, today, 'leads')
    }

    if (event_type === 'conversation_resolved') {
      const { data: chatbot } = await supabase
        .from('chatbots')
        .select('conversations_this_month, resolution_rate')
        .eq('id', chatbot_id)
        .single()

      if (chatbot && chatbot.conversations_this_month > 0) {
        const total = chatbot.conversations_this_month
        const resolved = Math.round((chatbot.resolution_rate ?? 0) * total / 100)
        const newRate = ((resolved + 1) / total) * 100
        await supabase
          .from('chatbots')
          .update({ resolution_rate: Math.min(100, Math.round(newRate * 100) / 100) })
          .eq('id', chatbot_id)
      }
    }

    return NextResponse.json({ ok: true, event_type })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
