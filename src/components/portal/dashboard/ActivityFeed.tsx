'use client'
import { useState } from 'react'
import { Workflow, Layers, Zap, Settings } from 'lucide-react'
import type { Automation } from '@/lib/portal/types'

interface ActivityFeedProps {
  automations: Automation[]
}

function getRelativeTime(dateStr: string | null): string {
  if (!dateStr) return 'Sin ejecuciones'
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (days > 1) return `hace ${days} dias`
  if (days === 1) return 'ayer'
  if (hours > 0) return `hace ${hours}h`
  if (minutes > 0) return `hace ${minutes}m`
  return 'ahora'
}

function getStatusDotColor(status: Automation['status']): string {
  if (status === 'active') return '#C6FF00'
  if (status === 'error') return '#fca5a5'
  return 'rgba(255,255,255,0.25)'
}

function getPlatformIcon(platform: Automation['platform']) {
  if (platform === 'n8n') return Workflow
  if (platform === 'make') return Layers
  if (platform === 'zapier') return Zap
  return Settings
}

function StatusBadge({ status }: { status: Automation['status'] }) {
  const styles: Record<Automation['status'], React.CSSProperties> = {
    active: { background: 'rgba(198,255,0,0.12)', color: '#C6FF00', border: '1px solid rgba(198,255,0,0.2)' },
    paused: { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid transparent' },
    error: { background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' },
  }
  const labels = { active: 'activa', paused: 'pausada', error: 'error' }
  return (
    <span
      style={{
        ...styles[status],
        fontSize: '0.6875rem',
        padding: '2px 7px',
        borderRadius: '99px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      {labels[status]}
    </span>
  )
}

function ActivityRow({ automation }: { automation: Automation }) {
  const [isHovered, setIsHovered] = useState(false)
  const PlatformIcon = getPlatformIcon(automation.platform)
  const dotColor = getStatusDotColor(automation.status)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 10px',
        borderRadius: '8px',
        background: isHovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        {/* Status dot */}
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: dotColor,
            flexShrink: 0,
          }}
        />
        {/* Platform icon */}
        <div
          style={{
            width: '24px',
            height: '24px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <PlatformIcon size={12} color="rgba(255,255,255,0.4)" />
        </div>
        {/* Name */}
        <span
          style={{
            fontSize: '0.8125rem',
            color: '#ffffff',
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {automation.name}
        </span>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, marginLeft: '12px' }}>
        <StatusBadge status={automation.status} />
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.38)', minWidth: '70px', textAlign: 'right' }}>
          {getRelativeTime(automation.last_execution)}
        </span>
      </div>
    </div>
  )
}

export default function ActivityFeed({ automations }: ActivityFeedProps) {
  if (automations.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.38)', fontSize: '0.875rem' }}>
        No hay actividad reciente
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {automations.slice(0, 5).map((automation) => (
        <ActivityRow key={automation.id} automation={automation} />
      ))}
    </div>
  )
}
