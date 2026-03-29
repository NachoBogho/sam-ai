// Server Component
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getClientProfile } from '@/lib/portal/queries'
import { ClientProvider } from '@/lib/portal/context'

export default async function PortalAuthLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login-portal')
  }

  // Admin has their own layout — no client profile needed
  const isAdmin = !!(user.email && user.email === process.env.ADMIN_EMAIL)
  if (isAdmin) {
    return <>{children}</>
  }

  const client = await getClientProfile(supabase)

  if (!client) {
    return (
      <div style={{ background: '#030712', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.65)', maxWidth: '400px', padding: '2rem' }}>
          <h2 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Cuenta no configurada
          </h2>
          <p>Tu cuenta aún no está configurada. Contactá a SAM-AI para completar la activación.</p>
        </div>
      </div>
    )
  }

  return (
    <ClientProvider value={client}>
      {children}
    </ClientProvider>
  )
}
