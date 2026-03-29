import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  loading?: boolean
  accentColor?: string
}

export default function MetricCard({
  icon: Icon,
  label,
  value,
  loading,
  accentColor = '#C6FF00',
}: MetricCardProps) {
  if (loading) {
    return (
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderTop: `2px solid ${accentColor}`,
          borderRadius: '12px',
          padding: '1.25rem',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
          className="animate-pulse"
        />
        <div
          style={{
            height: '10px',
            width: '55%',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '4px',
            marginBottom: '10px',
          }}
          className="animate-pulse"
        />
        <div
          style={{
            height: '28px',
            width: '40%',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '4px',
          }}
          className="animate-pulse"
        />
      </div>
    )
  }

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderTop: `2px solid ${accentColor}`,
        borderRadius: '12px',
        padding: '1.25rem',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      {/* Icon box */}
      <div
        style={{
          width: '32px',
          height: '32px',
          background: `${accentColor}14`,
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <Icon size={16} color={accentColor} />
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.38)',
          marginBottom: '4px',
        }}
      >
        {label}
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  )
}
