'use client'
import { usePathname } from 'next/navigation'
import { useClient } from '@/lib/portal/context'

interface PageMeta {
  title: string
  subtitle: string
}

const pageMeta: Record<string, PageMeta> = {
  '/portal': { title: 'Dashboard', subtitle: 'Resumen de actividad' },
  '/portal/automations': { title: 'Automatizaciones', subtitle: 'Estado de tus flujos' },
  '/portal/chatbots': { title: 'Chatbots', subtitle: 'Asistentes activos' },
  '/portal/metrics': { title: 'Metricas', subtitle: 'Performance mensual' },
  '/portal/support': { title: 'Soporte', subtitle: 'Consultas y tickets' },
  '/portal/admin': { title: 'Administracion', subtitle: 'Gestion de clientes' },
  '/portal/admin/new': { title: 'Nuevo cliente', subtitle: 'Crear acceso al portal' },
  '/portal/settings': { title: 'Configuración', subtitle: 'Cuenta y seguridad' },
}

function getPlanBadgeStyle(plan: 'starter' | 'growth' | 'enterprise'): React.CSSProperties {
  if (plan === 'enterprise') return { background: 'rgba(198,255,0,0.12)', color: '#C6FF00' }
  if (plan === 'growth') return { background: 'rgba(99,102,241,0.12)', color: '#a5b4fc' }
  return { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }
}

function getPlanLabel(plan: 'starter' | 'growth' | 'enterprise'): string {
  if (plan === 'enterprise') return 'Enterprise'
  if (plan === 'growth') return 'Growth'
  return 'Starter'
}

export default function Header() {
  const pathname = usePathname()
  const client = useClient()
  const meta = pageMeta[pathname] ?? { title: 'Portal', subtitle: '' }

  const planBadgeStyle = getPlanBadgeStyle(client.plan)
  const planLabel = getPlanLabel(client.plan)

  return (
    <header
      style={{
        height: '64px',
        minHeight: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.01)',
      }}
    >
      {/* Left: title + subtitle */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <h1 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1.2 }}>
          {meta.title}
        </h1>
        {meta.subtitle && (
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.2 }}>
            {meta.subtitle}
          </p>
        )}
      </div>

      {/* Right: plan badge + separator + email */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span
          style={{
            ...planBadgeStyle,
            fontSize: '0.625rem',
            fontWeight: 600,
            padding: '3px 8px',
            borderRadius: '4px',
            letterSpacing: '0.02em',
          }}
        >
          {planLabel}
        </span>
        <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.08)' }} />
        <span
          style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.38)',
            maxWidth: '180px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {client.contact_email}
        </span>
      </div>
    </header>
  )
}
