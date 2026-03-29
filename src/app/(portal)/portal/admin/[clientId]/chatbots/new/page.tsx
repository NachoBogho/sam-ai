import { redirect } from 'next/navigation'
import { getAdminUser } from '@/lib/portal/admin-guard'
import { getClientById } from '@/lib/portal/admin-queries'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import AddChatbotForm from '@/components/portal/admin/AddChatbotForm'

export default async function NewChatbotPage({ params }: { params: Promise<{ clientId: string }> }) {
  const admin = await getAdminUser()
  if (!admin) redirect('/portal')
  const { clientId } = await params
  const client = await getClientById(clientId)
  if (!client) redirect('/portal/admin')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <Link href={`/portal/admin/${clientId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: '1rem' }}>
          <ArrowLeft size={13} /> Volver a {client.company_name}
        </Link>
        <h1 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', margin: 0 }}>Nuevo chatbot</h1>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', marginTop: '4px', marginBottom: 0 }}>Agregar chatbot para {client.company_name}</p>
      </div>
      <AddChatbotForm clientId={clientId} />
    </div>
  )
}
