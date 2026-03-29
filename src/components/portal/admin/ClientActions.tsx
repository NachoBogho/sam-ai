'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PowerOff, Power, Trash2, AlertTriangle } from 'lucide-react'

interface ClientActionsProps {
  clientId: string
  active: boolean
  companyName: string
}

export default function ClientActions({ clientId, active, companyName }: ClientActionsProps) {
  const router = useRouter()
  const [isActive, setIsActive] = useState(active)
  const [loadingToggle, setLoadingToggle] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleToggleActive() {
    setLoadingToggle(true)
    setError(null)
    try {
      const res = await fetch('/api/portal/set-client-active', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, active: !isActive }),
      })
      const json = await res.json()
      if (!res.ok) setError(json.error ?? 'Error al cambiar el estado')
      else {
        setIsActive(!isActive)
        router.refresh()
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setLoadingToggle(false)
    }
  }

  async function handleDelete() {
    setLoadingDelete(true)
    setError(null)
    try {
      const res = await fetch('/api/portal/delete-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId }),
      })
      const json = await res.json()
      if (!res.ok) setError(json.error ?? 'Error al eliminar')
      else router.push('/portal/admin')
    } catch {
      setError('Error de conexión')
    } finally {
      setLoadingDelete(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {/* Toggle active */}
        <button
          onClick={handleToggleActive}
          disabled={loadingToggle || loadingDelete}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: 500,
            cursor: loadingToggle ? 'not-allowed' : 'pointer',
            border: isActive ? '1px solid rgba(255,193,7,0.3)' : '1px solid rgba(198,255,0,0.3)',
            background: isActive ? 'rgba(255,193,7,0.08)' : 'rgba(198,255,0,0.08)',
            color: isActive ? '#fcd34d' : '#C6FF00',
            opacity: loadingToggle ? 0.6 : 1,
            transition: 'all 0.15s',
          }}
        >
          {isActive
            ? <><PowerOff size={13} />{loadingToggle ? 'Actualizando...' : 'Dar de baja'}</>
            : <><Power size={13} />{loadingToggle ? 'Actualizando...' : 'Reactivar cliente'}</>
          }
        </button>

        {/* Delete */}
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            disabled={loadingToggle || loadingDelete}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: 500,
              cursor: 'pointer', border: '1px solid rgba(239,68,68,0.25)',
              background: 'rgba(239,68,68,0.06)', color: '#fca5a5',
              transition: 'all 0.15s',
            }}
          >
            <Trash2 size={13} /> Eliminar cliente
          </button>
        ) : (
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: '8px', padding: '0.5rem 0.875rem',
            }}
          >
            <AlertTriangle size={13} color="#fca5a5" />
            <span style={{ fontSize: '0.8125rem', color: '#fca5a5' }}>
              ¿Eliminar <strong>{companyName}</strong>? Acción irreversible.
            </span>
            <button
              onClick={handleDelete}
              disabled={loadingDelete}
              style={{
                padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600,
                background: '#ef4444', color: '#fff', border: 'none', cursor: loadingDelete ? 'not-allowed' : 'pointer',
                opacity: loadingDelete ? 0.7 : 1, marginLeft: '4px',
              }}
            >
              {loadingDelete ? 'Eliminando...' : 'Confirmar'}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              disabled={loadingDelete}
              style={{
                padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem',
                background: 'transparent', color: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
              }}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {error && (
        <div style={{
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: '8px', padding: '0.5rem 0.875rem',
          color: '#fca5a5', fontSize: '0.8125rem',
        }}>
          {error}
        </div>
      )}
    </div>
  )
}
