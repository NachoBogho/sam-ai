'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus, Eye, EyeOff, CheckCircle } from 'lucide-react'

type Plan = 'starter' | 'growth' | 'enterprise'

const planConfig: Record<Plan, { label: string; style: React.CSSProperties }> = {
  starter: { label: 'Starter', style: { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' } },
  growth: { label: 'Growth', style: { background: 'rgba(99,102,241,0.12)', color: '#a5b4fc' } },
  enterprise: { label: 'Enterprise', style: { background: 'rgba(198,255,0,0.12)', color: '#C6FF00' } },
}

export default function CreateClientForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    companyName: '',
    contactEmail: '',
    email: '',
    password: '',
    plan: 'starter' as Plan,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function handleChange(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/portal/create-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()

      if (!res.ok) {
        setError(json.error ?? 'Error al crear el cliente')
      } else {
        setSuccess(true)
        setTimeout(() => router.push('/portal/admin'), 1500)
      }
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.625rem 1rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'rgba(255,255,255,0.4)',
    marginBottom: '0.4rem',
    fontWeight: 500,
  }

  if (success) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', gap: '1rem', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', background: 'rgba(198,255,0,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle size={28} color="#C6FF00" />
        </div>
        <h2 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Cliente creado exitosamente</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', margin: 0 }}>Redirigiendo...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '520px' }}>
      {/* Company Info */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#ffffff', margin: 0, letterSpacing: '0.02em' }}>Datos de la empresa</h3>

        <div>
          <label style={labelStyle}>Nombre de la empresa</label>
          <input
            type="text"
            value={form.companyName}
            onChange={e => handleChange('companyName', e.target.value)}
            required
            placeholder="Acme Corp"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Email de contacto</label>
          <input
            type="email"
            value={form.contactEmail}
            onChange={e => handleChange('contactEmail', e.target.value)}
            required
            placeholder="contacto@empresa.com"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Plan</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {(['starter', 'growth', 'enterprise'] as Plan[]).map(p => (
              <button
                key={p}
                type="button"
                onClick={() => handleChange('plan', p)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '99px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  border: form.plan === p ? '1px solid rgba(198,255,0,0.3)' : '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  ...(form.plan === p ? planConfig[p].style : { background: 'transparent', color: 'rgba(255,255,255,0.4)' }),
                }}
              >
                {planConfig[p].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Auth Info */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#ffffff', margin: 0, letterSpacing: '0.02em' }}>Acceso al portal</h3>

        <div>
          <label style={labelStyle}>Email de acceso</label>
          <input
            type="email"
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            required
            placeholder="acceso@empresa.com"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Contraseña temporal</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={e => handleChange('password', e.target.value)}
              required
              minLength={6}
              placeholder="Mínimo 6 caracteres"
              style={{ ...inputStyle, paddingRight: '2.5rem' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(p => !p)}
              style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.38)', padding: 0 }}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.35rem', marginBottom: 0 }}>El cliente puede cambiarla luego desde su perfil</p>
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#fca5a5' }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: loading ? 'rgba(198,255,0,0.5)' : '#C6FF00', color: '#030712', borderRadius: '8px', border: 'none', fontWeight: 600, fontSize: '0.875rem', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}
      >
        <UserPlus size={15} />
        {loading ? 'Creando...' : 'Crear cliente'}
      </button>
    </form>
  )
}
