import { redirect } from 'next/navigation'
import { getAdminUser } from '@/lib/portal/admin-guard'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import CreateClientForm from '@/components/portal/admin/CreateClientForm'

export default async function NewClientPage() {
  const admin = await getAdminUser()
  if (!admin) redirect('/portal')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <Link
          href="/portal/admin"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', marginBottom: '1rem' }}
        >
          <ArrowLeft size={14} />
          Volver a clientes
        </Link>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>Nuevo cliente</h1>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', marginBottom: 0 }}>
          Creá el acceso al portal y los datos del cliente
        </p>
      </div>

      {/* Form */}
      <CreateClientForm />
    </div>
  )
}
