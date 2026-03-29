import { createClient } from '@/lib/supabase/server'
import { getClientProfile } from '@/lib/portal/queries'
import ProfileForm from '@/components/portal/settings/ProfileForm'
import PasswordForm from '@/components/portal/settings/PasswordForm'

const planLabels = { starter: 'Starter', growth: 'Growth', enterprise: 'Enterprise' }
const planColors: Record<string, React.CSSProperties> = {
  starter: { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid transparent' },
  growth: { background: 'rgba(99,102,241,0.12)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' },
  enterprise: { background: 'rgba(198,255,0,0.12)', color: '#C6FF00', border: '1px solid rgba(198,255,0,0.2)' },
}

const section: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  overflow: 'hidden',
}

const sectionHeader: React.CSSProperties = {
  padding: '1rem 1.25rem',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
}

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const client = await getClientProfile(supabase)
  if (!client || !user) return <div style={{ color: 'rgba(255,255,255,0.5)', padding: '2rem' }}>Perfil no encontrado.</div>

  const planStyle = planColors[client.plan]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '680px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0 }}>Configuración</h1>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', marginBottom: 0 }}>
          Datos de tu cuenta y seguridad
        </p>
      </div>

      {/* Plan info (read-only) */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginBottom: '4px' }}>Plan contratado</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ ...planStyle, fontSize: '0.75rem', fontWeight: 600, padding: '3px 10px', borderRadius: '99px' }}>
              {planLabels[client.plan]}
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
              Para cambiar de plan, contactá a SAM-AI desde soporte.
            </span>
          </div>
        </div>
      </div>

      {/* Datos de empresa */}
      <div style={section}>
        <div style={sectionHeader}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', margin: 0 }}>Datos de la empresa</h2>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>
            Esta información puede ser visible en reportes y comunicaciones
          </p>
        </div>
        <div style={{ padding: '1.25rem' }}>
          <ProfileForm client={client} />
        </div>
      </div>

      {/* Contraseña */}
      <div style={section}>
        <div style={sectionHeader}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', margin: 0 }}>Seguridad</h2>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>
            Cambiá tu contraseña de acceso al portal
          </p>
        </div>
        <div style={{ padding: '1.25rem' }}>
          <PasswordForm email={user.email!} />
        </div>
      </div>
    </div>
  )
}
