import { createClient } from '@/lib/supabase/server'
import { getClientProfile, getClientAutomations } from '@/lib/portal/queries'
import { Zap } from 'lucide-react'
import AutomationRow from '@/components/portal/automations/AutomationRow'

export default async function AutomationsPage() {
  const supabase = await createClient()
  const client = await getClientProfile(supabase)
  if (!client) return <div style={{ color: 'rgba(255,255,255,0.5)', padding: '2rem' }}>Perfil no encontrado.</div>

  const automations = await getClientAutomations(supabase, client.id)

  if (automations.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0 }}>Automatizaciones</h1>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', marginBottom: 0 }}>
            0 flujos configurados
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: 'rgba(255,255,255,0.38)', textAlign: 'center', gap: '1rem' }}>
          <Zap size={40} style={{ opacity: 0.3 }} />
          <div>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500, margin: 0 }}>Sin automatizaciones</p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', marginBottom: 0 }}>Aun no tenes automatizaciones configuradas. Contacta a SAM-AI para empezar.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0 }}>Automatizaciones</h1>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', marginBottom: 0 }}>
            {automations.length} flujo{automations.length !== 1 ? 's' : ''} configurado{automations.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['Nombre', 'Plataforma', 'Estado', 'Ejecuciones', 'Errores', 'Ultima ejecucion'].map((col) => (
                <th
                  key={col}
                  style={{
                    padding: '0.75rem 1rem',
                    fontSize: '0.625rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'rgba(255,255,255,0.38)',
                    fontWeight: 600,
                    textAlign: ['Ejecuciones', 'Errores', 'Ultima ejecucion'].includes(col) ? 'right' : 'left',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {automations.map((automation) => (
              <AutomationRow key={automation.id} automation={automation} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
