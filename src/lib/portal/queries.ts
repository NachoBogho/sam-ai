import type { SupabaseClient } from '@supabase/supabase-js'
import type {
  Client,
  Automation,
  Chatbot,
  MonthlyMetrics,
  SupportRequest,
  DashboardStats,
  DailyStats,
} from './types'

export async function getClientProfile(
  supabase: SupabaseClient
): Promise<Client | null> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError) throw new Error(`Failed to get authenticated user: ${authError.message}`)
  if (!user) return null

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) throw new Error(`Failed to fetch client profile: ${error.message}`)

  return data ?? null
}

export async function getClientAutomations(
  supabase: SupabaseClient,
  clientId: string
): Promise<Automation[]> {
  const { data, error } = await supabase
    .from('automations')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to fetch automations: ${error.message}`)

  return data ?? []
}

export async function getClientChatbots(
  supabase: SupabaseClient,
  clientId: string
): Promise<Chatbot[]> {
  const { data, error } = await supabase
    .from('chatbots')
    .select('*')
    .eq('client_id', clientId)

  if (error) throw new Error(`Failed to fetch chatbots: ${error.message}`)

  return data ?? []
}

export async function getClientMetrics(
  supabase: SupabaseClient,
  clientId: string,
  month: string
): Promise<MonthlyMetrics | null> {
  const { data, error } = await supabase
    .from('monthly_metrics')
    .select('*')
    .eq('client_id', clientId)
    .eq('month', month)
    .maybeSingle()

  if (error) throw new Error(`Failed to fetch monthly metrics: ${error.message}`)

  return data ?? null
}

export async function getClientSupportRequests(
  supabase: SupabaseClient,
  clientId: string
): Promise<SupportRequest[]> {
  const { data, error } = await supabase
    .from('support_requests')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to fetch support requests: ${error.message}`)

  return data ?? []
}

export async function createSupportRequest(
  supabase: SupabaseClient,
  clientId: string,
  subject: string,
  message: string
): Promise<SupportRequest> {
  const { data, error } = await supabase
    .from('support_requests')
    .insert({
      client_id: clientId,
      subject,
      message,
      status: 'open',
    })
    .select()
    .single()

  if (error) throw new Error(`Failed to create support request: ${error.message}`)

  return data
}

export async function updateClientProfile(
  supabase: SupabaseClient,
  clientId: string,
  fields: {
    company_name: string
    contact_email: string
    phone: string | null
    website: string | null
    industry: string | null
  }
): Promise<void> {
  const { error } = await supabase
    .from('clients')
    .update(fields)
    .eq('id', clientId)
  if (error) throw new Error(`Failed to update profile: ${error.message}`)
}

export async function getDashboardStats(
  supabase: SupabaseClient,
  clientId: string
): Promise<DashboardStats> {
  const currentMonth = new Date().toISOString().slice(0, 8) + '01'

  const [automations, chatbots, metrics] = await Promise.all([
    getClientAutomations(supabase, clientId),
    getClientChatbots(supabase, clientId),
    getClientMetrics(supabase, clientId, currentMonth),
  ])

  const activeAutomations = automations.filter(
    (automation) => automation.status === 'active'
  ).length

  const messagesThisMonth = chatbots.reduce(
    (sum, chatbot) => sum + chatbot.messages_this_month,
    0
  )

  const leadsThisMonth = chatbots.reduce(
    (sum, chatbot) => sum + chatbot.leads_captured_this_month,
    0
  )

  const hoursSaved = metrics?.hours_saved_estimate ?? 0

  return {
    activeAutomations,
    messagesThisMonth,
    leadsThisMonth,
    hoursSaved,
  }
}

// -----------------------------------------------------------------------------
// getDailyStats
// Returns the last `days` calendar days of aggregated stats for a client,
// ordered oldest-to-newest so callers can feed the array directly into chart
// libraries without additional sorting.
// -----------------------------------------------------------------------------
export async function getDailyStats(
  supabase: SupabaseClient,
  clientId: string,
  days: number = 30
): Promise<DailyStats[]> {
  const since = new Date()
  since.setDate(since.getDate() - days)
  const sinceStr = since.toISOString().slice(0, 10)

  const { data, error } = await supabase
    .from('daily_stats')
    .select('*')
    .eq('client_id', clientId)
    .gte('date', sinceStr)
    .order('date', { ascending: true })

  if (error) throw new Error(`Failed to fetch daily stats: ${error.message}`)
  return data ?? []
}

// -----------------------------------------------------------------------------
// getClientDailyStats
// Thin wrapper around getDailyStats intended for admin-side usage where the
// caller supplies a service-role / admin Supabase client that bypasses RLS.
// Keeping it as a separate export makes the call-site intent explicit and
// allows diverging behaviour later without touching the client-facing function.
// -----------------------------------------------------------------------------
export async function getClientDailyStats(
  supabase: SupabaseClient,
  clientId: string,
  days: number = 30
): Promise<DailyStats[]> {
  return getDailyStats(supabase, clientId, days)
}
