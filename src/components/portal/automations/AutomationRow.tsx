'use client'
import { useState } from 'react'
import { Workflow, Layers, Zap, Settings, AlertCircle } from 'lucide-react'
import type { Automation } from '@/lib/portal/types'

function getRelativeTime(dateStr: string | null): string {
  if (!dateStr) return '—'
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(hours / 24)
  if (days > 1) return `hace ${days} dias`
  if (days === 1) return 'ayer'
  if (hours > 0) return `hace ${hours}h`
  return 'hace menos de 1h'
}

const platformConfig: Record<string, { label: string; Icon: React.ElementType }> = {
  n8n: { label: 'n8n', Icon: Workflow },
  make: { label: 'Make', Icon: Layers },
  zapier: { label: 'Zapier', Icon: Zap },
  custom: { label: 'Custom', Icon: Settings },
}

export default function AutomationRow({ automation }: { automation: Automation }) {
  const [isHovered, setIsHovered] = useState(false)

  const statusStyles: Record<Automation['status'], React.CSSProperties> = {
    active: { background: 'rgba(198,255,0,0.12)', color: '#C6FF00', border: '1px solid rgba(198,255,0,0.2)' },
    paused: { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid transparent' },
    error: { background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' },
  }
  const statusLabels: Record<Automation['status'], string> = { active: 'Activa', paused: 'Pausada', error: 'Error' }

  const platform = automation.platform ? platformConfig[automation.platform] : null
  const PlatformIcon = platform?.Icon ?? Settings

  return (
    <tr
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        background: isHovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      {/* Name */}
      <td style={{ padding: '0.75rem 1rem' }}>
        <span style={{ color: '#ffffff', fontSize: '0.8125rem', fontWeight: 500 }}>
          {automation.name}
        </span>
        {automation.description && (
          <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.38)', marginTop: '2px' }}>
            {automation.description}
          </div>
        )}
      </td>

      {/* Platform */}
      <td style={{ padding: '0.75rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div
            style={{
              width: '20px',
              height: '20px',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PlatformIcon size={11} color="rgba(255,255,255,0.4)" />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
            {platform?.label ?? '—'}
          </span>
        </div>
      </td>

      {/* Status */}
      <td style={{ padding: '0.75rem 1rem' }}>
        <span
          style={{
            ...statusStyles[automation.status],
            fontSize: '0.6875rem',
            padding: '2px 8px',
            borderRadius: '99px',
            fontWeight: 500,
          }}
        >
          {statusLabels[automation.status]}
        </span>
      </td>

      {/* Executions */}
      <td style={{ padding: '0.75rem 1rem', color: 'rgba(255,255,255,0.65)', fontSize: '0.8125rem', textAlign: 'right' }}>
        {automation.executions_this_month.toLocaleString('es-AR')}
      </td>

      {/* Errors */}
      <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
        {automation.errors_this_month > 0 ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#fca5a5', fontSize: '0.8125rem' }}>
            <AlertCircle size={12} color="#fca5a5" />
            {automation.errors_this_month}
          </span>
        ) : (
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8125rem' }}>0</span>
        )}
      </td>

      {/* Last execution */}
      <td style={{ padding: '0.75rem 1rem', color: 'rgba(255,255,255,0.38)', fontSize: '0.75rem', textAlign: 'right' }}>
        {getRelativeTime(automation.last_execution)}
      </td>
    </tr>
  )
}
