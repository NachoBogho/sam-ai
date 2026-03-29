'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Users, UserPlus, LogOut, Settings } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const adminNavItems = [
  { label: 'Clientes', icon: Users, href: '/portal/admin', exact: true },
  { label: 'Nuevo cliente', icon: UserPlus, href: '/portal/admin/new', exact: true },
]

interface NavItemProps {
  label: string
  icon: React.ElementType
  href: string
  isActive: boolean
}

function NavItem({ label, icon: Icon, href, isActive }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false)

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
        color: isActive ? '#ffffff' : isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.6)',
        background: isActive ? 'rgba(198,255,0,0.08)' : isHovered ? 'rgba(255,255,255,0.04)' : 'transparent',
        borderLeft: isActive ? '2px solid #C6FF00' : '2px solid transparent',
        textDecoration: 'none',
        transition: 'background 0.15s, color 0.15s',
      }}
    >
      <Icon size={15} color={isActive ? '#C6FF00' : 'rgba(255,255,255,0.35)'} />
      {label}
    </Link>
  )
}

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [logoutHovered, setLogoutHovered] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login-portal')
  }

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
      {/* Logo + admin badge */}
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
              background: 'rgba(198,255,0,0.12)',
              color: '#C6FF00',
              fontSize: '0.625rem',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '4px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Admin
          </span>
        </div>
      </div>

      {/* Separator */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '12px' }} />

      {/* Section label */}
      <div style={{ paddingLeft: '14px', marginBottom: '6px' }}>
        <span
          style={{
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.38)',
            fontWeight: 600,
          }}
        >
          Gestión
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {adminNavItems.map((item) => {
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
      </nav>

      {/* Bottom: email + logout */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px', marginTop: 'auto' }}>
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
          {email}
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
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
