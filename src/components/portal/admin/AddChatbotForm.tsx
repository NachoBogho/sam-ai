'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

type Platform = 'whatsapp' | 'web' | 'instagram' | 'email'
type Status = 'active' | 'paused' | 'training'

const platforms: { value: Platform; label: string }[] = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'web', label: 'Web' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'email', label: 'Email' },
]

const statuses: { value: Status; label: string }[] = [
  { value: 'active', label: 'Activo' },
  { value: 'paused', label: 'Pausado' },
  { value: 'training', label: 'Entrenando' },
]

export default function AddChatbotForm({ clientId }: { clientId: string }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [platform, setPlatform] = useState<Platform>('whatsapp')
  const [status, setStatus] = useState<Status>('active')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/portal/add-chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, name, platform, status }),
      })
      const json = await res.json()
      if (!res.ok) setError(json.error ?? 'Error al agregar el chatbot')
      else {
        setSuccess(true)
        setTimeout(() => router.push(`/portal/admin/${clientId}`), 1200)
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

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

  if (success) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem', gap: '0.75rem', textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', background: 'rgba(198,255,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle size={24} color="#C6FF00" />
        </div>
        <p style={{ color: '#fff', fontWeight: 600, margin: 0 }}>Chatbot agregado</p>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', margin: 0 }}>Redirigiendo...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '480px' }}>
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Nombre del chatbot</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Ej: Chatbot WhatsApp Ventas" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Plataforma</label>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {platforms.map(p => (
              <button key={p.value} type="button" onClick={() => setPlatform(p.value)}
                style={{ padding: '6px 14px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', border: platform === p.value ? '1px solid rgba(198,255,0,0.3)' : '1px solid rgba(255,255,255,0.1)', background: platform === p.value ? 'rgba(198,255,0,0.1)' : 'transparent', color: platform === p.value ? '#C6FF00' : 'rgba(255,255,255,0.45)' }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={labelStyle}>Estado inicial</label>
          <div style={{ display: 'flex', gap: '6px' }}>
            {statuses.map(s => (
              <button key={s.value} type="button" onClick={() => setStatus(s.value)}
                style={{ padding: '6px 14px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', border: status === s.value ? '1px solid rgba(198,255,0,0.3)' : '1px solid rgba(255,255,255,0.1)', background: status === s.value ? 'rgba(198,255,0,0.1)' : 'transparent', color: status === s.value ? '#C6FF00' : 'rgba(255,255,255,0.45)' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {error && <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#fca5a5', fontSize: '0.875rem' }}>{error}</div>}
      <button type="submit" disabled={loading} style={{ padding: '0.75rem 1.5rem', background: loading ? 'rgba(198,255,0,0.5)' : '#C6FF00', color: '#030712', borderRadius: '8px', border: 'none', fontWeight: 600, fontSize: '0.875rem', cursor: loading ? 'not-allowed' : 'pointer', alignSelf: 'flex-start' }}>
        {loading ? 'Guardando...' : 'Guardar chatbot'}
      </button>
    </form>
  )
}
