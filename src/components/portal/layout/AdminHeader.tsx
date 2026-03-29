'use client'
import { usePathname } from 'next/navigation'

interface PageMeta {
  title: string
  subtitle: string
}

const adminPageMeta: Record<string, PageMeta> = {
  '/portal/admin': { title: 'Clientes', subtitle: 'Gestión de cuentas' },
  '/portal/admin/new': { title: 'Nuevo cliente', subtitle: 'Crear acceso al portal' },
}

function getAdminMeta(pathname: string): PageMeta {
  if (adminPageMeta[pathname]) return adminPageMeta[pathname]
  if (pathname.match(/\/portal\/admin\/[^/]+\/chatbots\/new/)) return { title: 'Nuevo chatbot', subtitle: 'Agregar chatbot al cliente' }
  if (pathname.match(/\/portal\/admin\/[^/]+\/automations\/new/)) return { title: 'Nueva automatización', subtitle: 'Agregar automatización al cliente' }
  if (pathname.match(/\/portal\/admin\/[^/]+/)) return { title: 'Detalle del cliente', subtitle: 'Chatbots y automatizaciones' }
  return { title: 'Administración', subtitle: '' }
}

export default function AdminHeader({ email }: { email: string }) {
  const pathname = usePathname()
  const meta = getAdminMeta(pathname)

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

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span
          style={{
            background: 'rgba(198,255,0,0.12)',
            color: '#C6FF00',
            fontSize: '0.625rem',
            fontWeight: 600,
            padding: '3px 8px',
            borderRadius: '4px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Admin
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
          {email}
        </span>
      </div>
    </header>
  )
}
