import { redirect } from 'next/navigation'
import { getAdminUser } from '@/lib/portal/admin-guard'
import { getAllClients } from '@/lib/portal/admin-queries'
import { Users, UserPlus } from 'lucide-react'
import Link from 'next/link'
import ClientList from '@/components/portal/admin/ClientList'

export default async function AdminPage() {
  const admin = await getAdminUser()
  if (!admin) redirect('/portal')

  const clients = await getAllClients()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>Clientes</h1>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', marginBottom: 0 }}>
            {clients.length} cliente{clients.length !== 1 ? 's' : ''} registrado{clients.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/portal/admin/new"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.125rem', background: '#C6FF00', color: '#030712', borderRadius: '8px', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600 }}
        >
          <UserPlus size={15} />
          Nuevo cliente
        </Link>
      </div>

      {/* Client list */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem', overflow: 'hidden' }}>
        <ClientList clients={clients} />
      </div>
    </div>
  )
}
