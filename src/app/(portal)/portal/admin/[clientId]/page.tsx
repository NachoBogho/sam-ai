import { redirect } from 'next/navigation'
import { getAdminUser } from '@/lib/portal/admin-guard'
import { getClientById, getClientChatbotsAdmin, getClientAutomationsAdmin } from '@/lib/portal/admin-queries'
import Link from 'next/link'
import { ArrowLeft, Plus, MessageSquare, Zap, Building2 } from 'lucide-react'
import ClientActions from '@/components/portal/admin/ClientActions'

// Badge de plan
const planStyles: Record<string, React.CSSProperties> = {
  starter: { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' },
  growth: { background: 'rgba(99,102,241,0.12)', color: '#a5b4fc' },
  enterprise: { background: 'rgba(198,255,0,0.12)', color: '#C6FF00' },
}

const statusStyles: Record<string, React.CSSProperties> = {
  active: { background: 'rgba(198,255,0,0.12)', color: '#C6FF00', border: '1px solid rgba(198,255,0,0.2)' },
  paused: { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid transparent' },
  error: { background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' },
  training: { background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' },
}

const statusLabels: Record<string, string> = { active: 'Activa', paused: 'Pausada', error: 'Error', training: 'Entrenando' }
const platformLabels: Record<string, string> = { whatsapp: 'WhatsApp', web: 'Web', instagram: 'Instagram', email: 'Email', n8n: 'n8n', make: 'Make', zapier: 'Zapier', custom: 'Custom' }

export default async function ClientDetailPage({ params }: { params: Promise<{ clientId: string }> }) {
  const admin = await getAdminUser()
  if (!admin) redirect('/portal')

  const { clientId } = await params
  const [client, chatbots, automations] = await Promise.all([
    getClientById(clientId),
    getClientChatbotsAdmin(clientId),
    getClientAutomationsAdmin(clientId),
  ])

  if (!client) redirect('/portal/admin')

  const sectionCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    overflow: 'hidden',
  }

  const sectionHeader: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.25rem',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Back + header */}
      <div>
        <Link href="/portal/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: '1rem' }}>
          <ArrowLeft size={13} /> Volver a clientes
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: 'rgba(198,255,0,0.08)', border: '1px solid rgba(198,255,0,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={18} color="#C6FF00" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', margin: 0 }}>{client.company_name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>{client.contact_email}</span>
              <span style={{ ...planStyles[client.plan], fontSize: '0.65rem', fontWeight: 600, padding: '2px 7px', borderRadius: '4px' }}>
                {client.plan.charAt(0).toUpperCase() + client.plan.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions: deactivate / delete */}
      <ClientActions
        clientId={client.id}
        active={client.active}
        companyName={client.company_name}
      />

      {/* Chatbots */}
      <div style={sectionCard}>
        <div style={sectionHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={15} color="#C6FF00" />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>Chatbots</span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>({chatbots.length})</span>
          </div>
          <Link href={`/portal/admin/${clientId}/chatbots/new`} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', fontWeight: 600, color: '#030712', background: '#C6FF00', padding: '5px 10px', borderRadius: '6px', textDecoration: 'none' }}>
            <Plus size={12} /> Agregar
          </Link>
        </div>
        {chatbots.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem' }}>Sin chatbots configurados</div>
        ) : (
          <div>
            {chatbots.map((c, i) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.25rem', borderBottom: i < chatbots.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#fff' }}>{c.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.38)', marginTop: '2px' }}>{c.platform ? platformLabels[c.platform] : '—'}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#fff' }}>{c.messages_this_month.toLocaleString('es-AR')} msgs</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>{c.leads_captured_this_month} leads</div>
                  </div>
                  <span style={{ ...(statusStyles[c.status] ?? statusStyles.paused), fontSize: '0.7rem', padding: '2px 8px', borderRadius: '99px', fontWeight: 500 }}>
                    {statusLabels[c.status] ?? c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Automatizaciones */}
      <div style={sectionCard}>
        <div style={sectionHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={15} color="#C6FF00" />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>Automatizaciones</span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>({automations.length})</span>
          </div>
          <Link href={`/portal/admin/${clientId}/automations/new`} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', fontWeight: 600, color: '#030712', background: '#C6FF00', padding: '5px 10px', borderRadius: '6px', textDecoration: 'none' }}>
            <Plus size={12} /> Agregar
          </Link>
        </div>
        {automations.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem' }}>Sin automatizaciones configuradas</div>
        ) : (
          <div>
            {automations.map((a, i) => (
              <div key={a.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.25rem', borderBottom: i < automations.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#fff' }}>{a.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.38)', marginTop: '2px' }}>{a.platform ? platformLabels[a.platform] : '—'} · {a.executions_this_month} ejecuciones este mes</div>
                </div>
                <span style={{ ...(statusStyles[a.status] ?? statusStyles.paused), fontSize: '0.7rem', padding: '2px 8px', borderRadius: '99px', fontWeight: 500 }}>
                  {statusLabels[a.status] ?? a.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* IDs para copiar (útil para configurar webhooks) */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
        <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginBottom: '8px' }}>IDs para webhooks n8n</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>client_id: </span>
            <code style={{ fontFamily: 'monospace', color: '#C6FF00', fontSize: '0.75rem' }}>{client.id}</code>
          </div>
          {chatbots.map(c => (
            <div key={c.id} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>
              <span style={{ color: 'rgba(255,255,255,0.35)' }}>chatbot &quot;{c.name}&quot;: </span>
              <code style={{ fontFamily: 'monospace', color: 'rgba(198,255,0,0.7)', fontSize: '0.75rem' }}>{c.id}</code>
            </div>
          ))}
          {automations.map(a => (
            <div key={a.id} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>
              <span style={{ color: 'rgba(255,255,255,0.35)' }}>automation &quot;{a.name}&quot;: </span>
              <code style={{ fontFamily: 'monospace', color: 'rgba(198,255,0,0.7)', fontSize: '0.75rem' }}>{a.id}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
