'use client'
import { useState } from 'react'
import { MessageCircle, BookOpen } from 'lucide-react'

interface SupportTabsProps {
  supportContent: React.ReactNode
  docsContent: React.ReactNode
}

export default function SupportTabs({ supportContent, docsContent }: SupportTabsProps) {
  const [tab, setTab] = useState<'support' | 'docs'>('support')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '4px', alignSelf: 'flex-start' }}>
        {[
          { key: 'support', label: 'Consultas', icon: MessageCircle },
          { key: 'docs', label: 'Documentación', icon: BookOpen },
        ].map(({ key, label, icon: Icon }) => {
          const isActive = tab === key
          return (
            <button
              key={key}
              onClick={() => setTab(key as 'support' | 'docs')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '7px',
                fontSize: '0.8125rem',
                fontWeight: isActive ? 500 : 400,
                color: isActive ? '#ffffff' : 'rgba(255,255,255,0.45)',
                background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <Icon size={13} color={isActive ? '#C6FF00' : 'rgba(255,255,255,0.35)'} />
              {label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      {tab === 'support' ? supportContent : docsContent}
    </div>
  )
}
