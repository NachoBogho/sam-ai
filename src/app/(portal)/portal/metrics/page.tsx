import { createClient } from '@/lib/supabase/server'
import { getClientProfile } from '@/lib/portal/queries'
import MetricsChart from '@/components/portal/metrics/MetricsChart'

export default async function MetricsPage() {
  const supabase = await createClient()
  const client = await getClientProfile(supabase)
  if (!client) return <div style={{ color: 'rgba(255,255,255,0.5)', padding: '2rem' }}>Perfil no encontrado.</div>

  return <MetricsChart clientId={client.id} />
}
