import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { verifyBearerSecret } from '@/lib/portal/admin-guard'

export async function GET(request: NextRequest) {
  if (!verifyBearerSecret(request, 'CRON_SECRET')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const now = new Date()
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
  const isFirstOfMonth = now.getDate() === 1

  try {
    const { data: clients, error: clientsError } = await supabase
      .from('clients')
      .select('id')
      .eq('active', true)

    if (clientsError) throw new Error(clientsError.message)
    if (!clients?.length) return NextResponse.json({ ok: true, processed: 0 })

    let processed = 0

    for (const client of clients) {
      const clientId = client.id

      const { data: chatbots } = await supabase
        .from('chatbots')
        .select('messages_this_month, conversations_this_month, leads_captured_this_month, avg_response_time_seconds, resolution_rate')
        .eq('client_id', clientId)

      const { data: automations } = await supabase
        .from('automations')
        .select('executions_this_month, errors_this_month')
        .eq('client_id', clientId)

      const messagesTotal = chatbots?.reduce((s, c) => s + (c.messages_this_month ?? 0), 0) ?? 0
      const conversationsTotal = chatbots?.reduce((s, c) => s + (c.conversations_this_month ?? 0), 0) ?? 0
      const leadsTotal = chatbots?.reduce((s, c) => s + (c.leads_captured_this_month ?? 0), 0) ?? 0
      const executionsTotal = automations?.reduce((s, a) => s + (a.executions_this_month ?? 0), 0) ?? 0
      const errorsTotal = automations?.reduce((s, a) => s + (a.errors_this_month ?? 0), 0) ?? 0

      const activeChats = chatbots?.filter(c => (c.conversations_this_month ?? 0) > 0) ?? []
      const resolutionAvg =
        activeChats.length > 0
          ? activeChats.reduce((s, c) => s + (c.resolution_rate ?? 0), 0) / activeChats.length
          : 0

      const chatsWithTime = chatbots?.filter(c => c.avg_response_time_seconds != null) ?? []
      const avgResponseTime =
        chatsWithTime.length > 0
          ? chatsWithTime.reduce((s, c) => s + (c.avg_response_time_seconds ?? 0), 0) / chatsWithTime.length
          : 0

      // Each automation execution = 15 min of manual work
      const hoursSaved = Math.round((executionsTotal * 15) / 60 * 10) / 10

      await supabase
        .from('monthly_metrics')
        .upsert(
          {
            client_id: clientId,
            month: currentMonth,
            messages_total: messagesTotal,
            conversations_total: conversationsTotal,
            leads_total: leadsTotal,
            automations_executions: executionsTotal,
            errors_total: errorsTotal,
            hours_saved_estimate: hoursSaved,
            resolution_rate_avg: Math.round(resolutionAvg * 100) / 100,
            avg_response_time: Math.round(avgResponseTime * 10) / 10,
          },
          { onConflict: 'client_id,month' },
        )

      if (isFirstOfMonth) {
        if (chatbots?.length) {
          await supabase
            .from('chatbots')
            .update({
              messages_this_month: 0,
              conversations_this_month: 0,
              leads_captured_this_month: 0,
            })
            .eq('client_id', clientId)
        }

        if (automations?.length) {
          await supabase
            .from('automations')
            .update({
              executions_this_month: 0,
              errors_this_month: 0,
            })
            .eq('client_id', clientId)
        }
      }

      processed++
    }

    return NextResponse.json({ ok: true, processed, month: currentMonth, reset: isFirstOfMonth })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
