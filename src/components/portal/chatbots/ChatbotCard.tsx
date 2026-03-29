'use client'
import { useState } from 'react'
import { MessageSquare, Globe, Mail, Clock } from 'lucide-react'
import type { Chatbot } from '@/lib/portal/types'

const platformConfig = {
  whatsapp: { label: 'WhatsApp', icon: MessageSquare, color: '#25D366' },
  web: { label: 'Web', icon: Globe, color: '#C6FF00' },
  instagram: { label: 'Instagram', icon: MessageSquare, color: '#E1306C' },
  email: { label: 'Email', icon: Mail, color: '#C6FF00' },
}

export default function ChatbotCard({ chatbot }: { chatbot: Chatbot }) {
  const [isHovered, setIsHovered] = useState(false)

  const platform = chatbot.platform ? platformConfig[chatbot.platform] : null
  const PlatformIcon = platform?.icon ?? MessageSquare
  const platformColor = platform?.color ?? '#C6FF00'

  const statusStyles: Record<Chatbot['status'], React.CSSProperties> = {
    active: { background: 'rgba(198,255,0,0.12)', color: '#C6FF00', border: '1px solid rgba(198,255,0,0.2)' },
    paused: { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid transparent' },
    training: { background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' },
  }
  const statusLabels: Record<Chatbot['status'], string> = { active: 'Activo', paused: 'Pausado', training: 'Entrenando' }

  // Convert hex color to rgba for backgrounds
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '198, 255, 0'
  }
  const platformRgb = hexToRgb(platformColor)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.25)' : 'none',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Platform circle */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: `rgba(${platformRgb}, 0.1)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <PlatformIcon size={18} color={platformColor} />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ffffff' }}>{chatbot.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.38)', marginTop: '2px' }}>
              {platform?.label ?? 'Sin plataforma'}
            </div>
          </div>
        </div>
        <span
          style={{
            ...statusStyles[chatbot.status],
            fontSize: '0.6875rem',
            padding: '3px 10px',
            borderRadius: '99px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          {statusLabels[chatbot.status]}
        </span>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '8px',
            padding: '0.75rem',
          }}
        >
          <div
            style={{
              fontSize: '0.625rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.38)',
              marginBottom: '6px',
            }}
          >
            Mensajes
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>
            {chatbot.messages_this_month.toLocaleString('es-AR')}
          </div>
        </div>
        <div
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '8px',
            padding: '0.75rem',
          }}
        >
          <div
            style={{
              fontSize: '0.625rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.38)',
              marginBottom: '6px',
            }}
          >
            Leads
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>
            {chatbot.leads_captured_this_month.toLocaleString('es-AR')}
          </div>
        </div>
      </div>

      {/* Response time */}
      {chatbot.avg_response_time_seconds !== null && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.38)',
          }}
        >
          <Clock size={12} color="rgba(255,255,255,0.3)" />
          <span>Respuesta promedio:</span>
          <span style={{ color: '#C6FF00', fontWeight: 500 }}>{chatbot.avg_response_time_seconds}s</span>
        </div>
      )}
    </div>
  )
}
