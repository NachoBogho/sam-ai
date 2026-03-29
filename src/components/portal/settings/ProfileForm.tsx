'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import type { Client } from '@/lib/portal/types'

const INDUSTRIES = [
  'Tecnología', 'E-commerce', 'Salud', 'Educación', 'Finanzas',
  'Inmobiliaria', 'Marketing', 'Logística', 'Gastronomía', 'Retail', 'Otro',
]

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.625rem 1rem',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px', color: '#fff', fontSize: '0.875rem',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.7rem',
  textTransform: 'uppercase', letterSpacing: '0.08em',
  color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem', fontWeight: 500,
}

export default function ProfileForm({ client }: { client: Client }) {
  const router = useRouter()
  const [companyName, setCompanyName] = useState(client.company_name)
  const [contactEmail, setContactEmail] = useState(client.contact_email)
  const [phone, setPhone] = useState(client.phone ?? '')
  const [website, setWebsite] = useState(client.website ?? '')
  const [industry, setIndustry] = useState(client.industry ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const res = await fetch('/api/portal/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company_name: companyName, contact_email: contactEmail, phone, website, industry }),
      })
      const json = await res.json()
      if (!res.ok) setError(json.error ?? 'Error al guardar')
      else {
        setSuccess(true)
        router.refresh()
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Nombre de empresa</label>
          <input
            type="text" required value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Email de contacto</label>
          <input
            type="email" required value={contactEmail}
            onChange={e => setContactEmail(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Teléfono</label>
          <input
            type="tel" value={phone} placeholder="+54 11 1234-5678"
            onChange={e => setPhone(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Sitio web</label>
          <input
            type="url" value={website} placeholder="https://tuempresa.com"
            onChange={e => setWebsite(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Rubro</label>
          <select
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="">Sin especificar</option>
            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#fca5a5', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          type="submit" disabled={loading}
          style={{ padding: '0.625rem 1.25rem', background: loading ? 'rgba(198,255,0,0.5)' : '#C6FF00', color: '#030712', borderRadius: '8px', border: 'none', fontWeight: 600, fontSize: '0.875rem', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
        {success && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8125rem', color: '#C6FF00' }}>
            <CheckCircle size={14} /> Cambios guardados
          </span>
        )}
      </div>
    </form>
  )
}
