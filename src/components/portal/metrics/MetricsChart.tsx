'use client'
import { useState, useEffect } from 'react'
import { MessageSquare, Users, Zap, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { getClientMetrics } from '@/lib/portal/queries'
import type { MonthlyMetrics } from '@/lib/portal/types'
import MetricCard from '@/components/portal/dashboard/MetricCard'

function getLastSixMonths(): { value: string; label: string }[] {
  const months = []
  for (let i = 0; i < 6; i++) {
    const d = new Date()
    d.setDate(1)
    d.setMonth(d.getMonth() - i)
    const value = d.toISOString().slice(0, 8) + '01'
    const label = d.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })
    months.push({ value, label: label.charAt(0).toUpperCase() + label.slice(1) })
  }
  return months
}

export default function MetricsChart({ clientId }: { clientId: string }) {
  const months = getLastSixMonths()
  const [selectedMonth, setSelectedMonth] = useState(months[0].value)
  const [metrics, setMetrics] = useState<MonthlyMetrics | null | 'loading'>(null)

  async function fetchMetrics(month: string) {
    setMetrics('loading')
    try {
      const supabase = createClient()
      const data = await getClientMetrics(supabase, clientId, month)
      setMetrics(data)
    } catch {
      setMetrics(null)
    }
  }

  useEffect(() => {
    fetchMetrics(selectedMonth)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleMonthChange(month: string) {
    setSelectedMonth(month)
    fetchMetrics(month)
  }

  const isLoading = metrics === 'loading'
  const data = metrics !== 'loading' ? metrics : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Month selector */}
      <div>
        <label style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.38)', display: 'block', marginBottom: '0.5rem' }}>
          Período
        </label>
        <select
          value={selectedMonth}
          onChange={e => handleMonthChange(e.target.value)}
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#ffffff', padding: '0.5rem 1rem', fontSize: '0.875rem', cursor: 'pointer', outline: 'none' }}
        >
          {months.map(m => (
            <option key={m.value} value={m.value} style={{ background: '#0f0f0f' }}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* Metrics */}
      {!isLoading && !data ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.38)', fontSize: '0.875rem' }}>
          Sin datos para este período
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          <MetricCard icon={MessageSquare} label="Total mensajes" value={isLoading ? '—' : (data?.messages_total ?? 0).toLocaleString('es-AR')} loading={isLoading} />
          <MetricCard icon={Users} label="Total leads" value={isLoading ? '—' : (data?.leads_total ?? 0).toLocaleString('es-AR')} loading={isLoading} />
          <MetricCard icon={Zap} label="Ejecuciones" value={isLoading ? '—' : (data?.automations_executions ?? 0).toLocaleString('es-AR')} loading={isLoading} />
          <MetricCard icon={Clock} label="Horas ahorradas" value={isLoading ? '—' : `${data?.hours_saved_estimate ?? 0}h`} loading={isLoading} />
        </div>
      )}
    </div>
  )
}
