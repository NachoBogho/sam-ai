'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { createSupportRequest, getClientSupportRequests } from '@/lib/portal/queries'
import type { SupportRequest } from '@/lib/portal/types'

interface SupportFormProps {
  clientId: string
  initialRequests: SupportRequest[]
}

export default function SupportForm({ clientId, initialRequests }: SupportFormProps) {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [requests, setRequests] = useState<SupportRequest[]>(initialRequests)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const supabase = createClient()
      await createSupportRequest(supabase, clientId, subject, message)
      setSuccess(true)
      setSubject('')
      setMessage('')
      // Refetch tickets
      const updated = await getClientSupportRequests(supabase, clientId)
      setRequests(updated)
    } catch {
      setError('No se pudo enviar el mensaje. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const statusConfig: Record<SupportRequest['status'], { label: string; style: React.CSSProperties }> = {
    open: { label: 'Abierto', style: { background: 'rgba(245,158,11,0.1)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.2)' } },
    in_progress: { label: 'En progreso', style: { background: 'rgba(198,255,0,0.12)', color: '#C6FF00', border: '1px solid rgba(198,255,0,0.2)' } },
    resolved: { label: 'Resuelto', style: { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid transparent' } },
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Form */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.5rem' }}>
        <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ffffff', marginTop: 0, marginBottom: '1.25rem' }}>Nueva consulta</h2>

        {success && (
          <div style={{ background: 'rgba(198,255,0,0.08)', border: '1px solid rgba(198,255,0,0.2)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.875rem', color: '#C6FF00' }}>
            Tu consulta fue enviada. Te contactaremos a la brevedad.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.38)', marginBottom: '0.5rem' }}>
              Asunto
            </label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
              placeholder="Describe brevemente tu consulta"
              style={{ width: '100%', padding: '0.625rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#ffffff', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.38)', marginBottom: '0.5rem' }}>
              Mensaje
            </label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              rows={4}
              placeholder="Describí el problema o consulta en detalle..."
              style={{ width: '100%', padding: '0.625rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#ffffff', fontSize: '0.875rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </div>

          {error && (
            <p style={{ fontSize: '0.875rem', color: '#fca5a5', margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ alignSelf: 'flex-start', background: '#C6FF00', color: '#030712', padding: '0.625rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 600, fontSize: '0.875rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'opacity 0.15s' }}
          >
            {loading ? 'Enviando...' : 'Enviar consulta'}
          </button>
        </form>
      </div>

      {/* Previous tickets */}
      {requests.length > 0 && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>Consultas anteriores</h2>
          </div>
          <div>
            {requests.map((req) => {
              const conf = statusConfig[req.status]
              return (
                <div key={req.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#ffffff', fontWeight: 500 }}>{req.subject}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.38)', marginTop: '2px' }}>
                      {new Date(req.created_at).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                  <span style={{ ...conf.style, fontSize: '0.7rem', padding: '2px 10px', borderRadius: '99px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {conf.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
