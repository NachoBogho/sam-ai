'use client'
import type { Client } from '@/lib/portal/types'
import { Building2, Mail, Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const planConfig: Record<Client['plan'], { label: string; style: React.CSSProperties }> = {
  starter: { label: 'Starter', style: { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid transparent' } },
  growth: { label: 'Growth', style: { background: 'rgba(99,102,241,0.12)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' } },
  enterprise: { label: 'Enterprise', style: { background: 'rgba(198,255,0,0.12)', color: '#C6FF00', border: '1px solid rgba(198,255,0,0.2)' } },
}

export default function ClientList({ clients }: { clients: Client[] }) {
  if (clients.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center', gap: '0.75rem' }}>
        <Building2 size={36} style={{ opacity: 0.4 }} />
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>No hay clientes registrados todavía</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {clients.map(client => {
        const plan = planConfig[client.plan]
        return (
          <Link
            key={client.id}
            href={`/portal/admin/${client.id}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', gap: '1rem', textDecoration: 'none', cursor: 'pointer' }}
          >
            {/* Left: company info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flex: 1, minWidth: 0 }}>
              <div style={{ width: '36px', height: '36px', background: 'rgba(198,255,0,0.08)', border: '1px solid rgba(198,255,0,0.15)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Building2 size={16} color="#C6FF00" />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {client.company_name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Mail size={11} color="rgba(255,255,255,0.3)" />
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.38)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {client.contact_email}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: plan + status + date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
              <span style={{ ...plan.style, fontSize: '0.7rem', padding: '3px 10px', borderRadius: '99px', fontWeight: 500 }}>
                {plan.label}
              </span>
              <span style={{ background: client.active ? 'rgba(198,255,0,0.1)' : 'rgba(255,255,255,0.05)', color: client.active ? '#C6FF00' : 'rgba(255,255,255,0.4)', border: `1px solid ${client.active ? 'rgba(198,255,0,0.2)' : 'transparent'}`, fontSize: '0.7rem', padding: '3px 10px', borderRadius: '99px', fontWeight: 500 }}>
                {client.active ? 'Activo' : 'Inactivo'}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={11} color="rgba(255,255,255,0.25)" />
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>
                  {new Date(client.created_at).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <ChevronRight size={14} color="rgba(255,255,255,0.2)" style={{ flexShrink: 0 }} />
            </div>
          </Link>
        )
      })}
    </div>
  )
}
