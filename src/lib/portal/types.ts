export interface Client {
  id: string
  user_id: string
  company_name: string
  contact_email: string
  plan: 'starter' | 'growth' | 'enterprise'
  active: boolean
  created_at: string
  phone: string | null
  website: string | null
  industry: string | null
}

export interface Automation {
  id: string
  client_id: string
  name: string
  description: string | null
  status: 'active' | 'paused' | 'error'
  platform: 'n8n' | 'make' | 'zapier' | 'custom' | null
  last_execution: string | null
  executions_this_month: number
  errors_this_month: number
  avg_execution_time_seconds: number
  created_at: string
}

export interface Chatbot {
  id: string
  client_id: string
  name: string
  platform: 'whatsapp' | 'web' | 'instagram' | 'email' | null
  status: 'active' | 'paused' | 'training'
  messages_this_month: number
  leads_captured_this_month: number
  avg_response_time_seconds: number | null
  conversations_this_month: number
  resolution_rate: number
  created_at: string
}

export interface MonthlyMetrics {
  id: string
  client_id: string
  month: string
  messages_total: number
  leads_total: number
  automations_executions: number
  hours_saved_estimate: number
  conversations_total: number
  resolution_rate_avg: number
  avg_response_time: number
  errors_total: number
  created_at: string
}

export interface DailyStats {
  id: string
  client_id: string
  date: string
  messages: number
  conversations: number
  leads: number
  executions: number
  errors: number
}

export interface SupportRequest {
  id: string
  client_id: string
  subject: string
  message: string
  status: 'open' | 'in_progress' | 'resolved'
  created_at: string
}

export interface DashboardStats {
  activeAutomations: number
  messagesThisMonth: number
  leadsThisMonth: number
  hoursSaved: number
}
