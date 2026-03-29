'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Zap, MessageSquare, BarChart3, HelpCircle, LogOut, Users, Settings } from 'lucide-react'
import { useClient } from '@/lib/portal/context'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/portal', exact: true },
  { label: 'Automatizaciones', icon: Zap, href: '/portal/automations', exact: false },
  { label: 'Chatbots', icon: MessageSquare, href: '/portal/chatbots', exact: false },
  { label: 'Métricas', icon: BarChart3, href: '/portal/metrics', exact: false },
  { label: 'Soporte', icon: HelpCircle, href: '/portal/support', exact: false },
  { label: 'Configuración', icon: Settings, href: '/portal/settings', exact: false },
]

const adminItems = [
  { label: 'Clientes', icon: Users, href: '/portal/admin', exact: false },
]

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

interface SidebarProps {
  isAdmin?: boolean
}

interface NavItemProps {
  label: string
  icon: React.ElementType
  href: string
  isActive: boolean
}

function NavItem({ label, icon: Icon, href, isActive }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getBackground = () => {
    if (isActive) return 'rgba(198,255,0,0.08)'
    if (isHovered) return 'rgba(255,255,255,0.04)'
    return 'transparent'
  }

  const getColor = () => {
    if (isActive) return '#ffffff'
    if (isHovered) return 'rgba(255,255,255,0.8)'
    return 'rgba(255,255,255,0.6)'
  }

  const getIconColor = () => {
    if (isActive) return '#C6FF00'
    return 'rgba(255,255,255,0.35)'
  }

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '0.8125rem',
        fontWeight: isActive ? 500 : 400,
        color: getColor(),
        background: getBackground(),
        borderLeft: isActive ? '2px solid #C6FF00' : '2px solid transparent',
        textDecoration: 'none',
        transition: 'background 0.15s, color 0.15s',
      }}
    >
      <Icon size={15} color={getIconColor()} />
      {label}
    </Link>
  )
}

export default function Sidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const client = useClient()
  const [logoutHovered, setLogoutHovered] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login-portal')
  }

  const planBadgeStyle = getPlanBadgeStyle(client.plan)
  const planLabel = getPlanLabel(client.plan)

  return (
    <aside
      style={{
        width: '240px',
        minWidth: '240px',
        height: '100vh',
        background: 'rgba(255,255,255,0.02)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 12px',
      }}
    >
      {/* Logo + company */}
      <div style={{ marginBottom: '20px', paddingLeft: '4px' }}>
        <div
          className="logo-text"
          style={{ fontWeight: 700, fontSize: '1.125rem', color: '#ffffff', letterSpacing: '-0.01em' }}
        >
          SAM-AI
        </div>
        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.65)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '130px',
            }}
          >
            {client.company_name}
          </span>
          <span
            style={{
              ...planBadgeStyle,
              fontSize: '0.625rem',
              fontWeight: 600,
              padding: '2px 6px',
              borderRadius: '4px',
              letterSpacing: '0.02em',
              flexShrink: 0,
            }}
          >
            {planLabel}
          </span>
        </div>
      </div>

      {/* Separator */}
      <div
        style={{
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
          marginBottom: '12px',
        }}
      />

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}
      >
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <NavItem
              key={item.href}
              label={item.label}
              icon={item.icon}
              href={item.href}
              isActive={isActive}
            />
          )
        })}

        {/* Admin section */}
        {isAdmin && (
          <>
            <div
              style={{
                marginTop: '16px',
                marginBottom: '6px',
                paddingLeft: '14px',
              }}
            >
              <span
                style={{
                  fontSize: '0.625rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.38)',
                  fontWeight: 600,
                }}
              >
                Administracion
              </span>
            </div>
            <div
              style={{
                height: '1px',
                background: 'rgba(255,255,255,0.06)',
                marginBottom: '6px',
              }}
            />
            {adminItems.map((item) => {
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
              return (
                <NavItem
                  key={item.href}
                  label={item.label}
                  icon={item.icon}
                  href={item.href}
                  isActive={isActive}
                />
              )
            })}
          </>
        )}
      </nav>

      {/* Bottom user card */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '12px',
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.38)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            paddingLeft: '4px',
            marginBottom: '8px',
          }}
        >
          {client.contact_email}
        </div>
        <button
          onClick={handleLogout}
          onMouseEnter={() => setLogoutHovered(true)}
          onMouseLeave={() => setLogoutHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '0.8125rem',
            color: logoutHovered ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.38)',
            background: logoutHovered ? 'rgba(255,255,255,0.04)' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            transition: 'color 0.15s, background 0.15s',
            textAlign: 'left',
          }}
        >
          <LogOut size={14} />
          Cerrar sesion
        </button>
      </div>
    </aside>
  )
}
