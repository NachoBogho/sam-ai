import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getClientProfile, getClientAutomations, getClientChatbots, getClientMetrics } from '@/lib/portal/queries'
import { Zap, MessageSquare, Users, Clock } from 'lucide-react'
import Link from 'next/link'
import MetricCard from '@/components/portal/dashboard/MetricCard'
import ActivityFeed from '@/components/portal/dashboard/ActivityFeed'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user?.email === process.env.ADMIN_EMAIL) {
    redirect('/portal/admin')
  }

  const client = await getClientProfile(supabase)

  if (!client) {
    return <div style={{ color: 'rgba(255,255,255,0.5)', padding: '2rem' }}>Perfil no encontrado.</div>
  }

  const currentMonth = new Date().toISOString().slice(0, 8) + '01'
  const [automations, chatbots, metrics] = await Promise.all([
    getClientAutomations(supabase, client.id),
    getClientChatbots(supabase, client.id),
    getClientMetrics(supabase, client.id, currentMonth),
  ])

  const activeAutomations = automations.filter(a => a.status === 'active').length
  const totalMessages = chatbots.reduce((sum, c) => sum + c.messages_this_month, 0)
  const totalLeads = chatbots.reduce((sum, c) => sum + c.leads_captured_this_month, 0)
  const hoursSaved = metrics?.hours_saved_estimate ?? 0

  const today = new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Greeting */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
          {client.company_name}
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', marginBottom: 0 }}>
          {todayCapitalized}
        </p>
      </div>

      {/* Metric cards grid - 2 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        <MetricCard icon={Zap} label="Automatizaciones activas" value={activeAutomations} />
        <MetricCard icon={MessageSquare} label="Mensajes este mes" value={totalMessages.toLocaleString('es-AR')} />
        <MetricCard icon={Users} label="Leads capturados" value={totalLeads.toLocaleString('es-AR')} />
        <MetricCard icon={Clock} label="Horas ahorradas (est.)" value={`${hoursSaved}h`} />
      </div>

      {/* Activity feed */}
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <h2 style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
            Actividad reciente
          </h2>
          <Link
            href="/portal/automations"
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Ver todas →
          </Link>
        </div>
        <div style={{ padding: '0.5rem' }}>
          <ActivityFeed automations={automations} />
        </div>
      </div>
    </div>
  )
}
