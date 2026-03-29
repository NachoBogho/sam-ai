'use client'
import { useState } from 'react'
import { CheckCircle, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

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

function PasswordField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          required
          style={{ ...inputStyle, paddingRight: '2.5rem' }}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 0 }}
        >
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  )
}

export default function PasswordForm({ email }: { email: string }) {
  const [current, setCurrent] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (newPass.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres')
      return
    }
    if (newPass !== confirm) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    const supabase = createClient()

    // Verificar contraseña actual
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: current })
    if (signInError) {
      setError('La contraseña actual es incorrecta')
      setLoading(false)
      return
    }

    // Actualizar contraseña
    const { error: updateError } = await supabase.auth.updateUser({ password: newPass })
    if (updateError) {
      setError(updateError.message)
    } else {
      setSuccess(true)
      setCurrent('')
      setNewPass('')
      setConfirm('')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <PasswordField label="Contraseña actual" value={current} onChange={setCurrent} />
      <PasswordField label="Nueva contraseña" value={newPass} onChange={setNewPass} />
      <PasswordField label="Confirmar nueva contraseña" value={confirm} onChange={setConfirm} />

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
          {loading ? 'Actualizando...' : 'Cambiar contraseña'}
        </button>
        {success && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8125rem', color: '#C6FF00' }}>
            <CheckCircle size={14} /> Contraseña actualizada
          </span>
        )}
      </div>
    </form>
  )
}
