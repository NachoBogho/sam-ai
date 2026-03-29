import { createClient } from '@/lib/supabase/server'
import { getClientProfile, getClientSupportRequests } from '@/lib/portal/queries'
import SupportForm from '@/components/portal/support/SupportForm'
import SupportTabs from '@/components/portal/support/SupportTabs'
import DocsContent from '@/components/portal/support/DocsContent'

export default async function SupportPage() {
  const supabase = await createClient()
  const client = await getClientProfile(supabase)
  if (!client) return <div style={{ color: 'rgba(255,255,255,0.5)', padding: '2rem' }}>Perfil no encontrado.</div>

  const requests = await getClientSupportRequests(supabase, client.id)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0 }}>Soporte</h1>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', marginBottom: 0 }}>
          {requests.length} ticket{requests.length !== 1 ? 's' : ''} enviado{requests.length !== 1 ? 's' : ''}
        </p>
      </div>

      <SupportTabs
        supportContent={<SupportForm clientId={client.id} initialRequests={requests} />}
        docsContent={<DocsContent />}
      />
    </div>
  )
}
