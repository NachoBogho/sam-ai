import { createClient } from '@/lib/supabase/server'
import { getClientProfile, getClientChatbots } from '@/lib/portal/queries'
import { MessageSquare } from 'lucide-react'
import ChatbotCard from '@/components/portal/chatbots/ChatbotCard'

export default async function ChatbotsPage() {
  const supabase = await createClient()
  const client = await getClientProfile(supabase)
  if (!client) return <div style={{ color: 'rgba(255,255,255,0.5)', padding: '2rem' }}>Perfil no encontrado.</div>

  const chatbots = await getClientChatbots(supabase, client.id)

  if (chatbots.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0 }}>Chatbots</h1>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', marginBottom: 0 }}>
            0 asistentes configurados
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: 'rgba(255,255,255,0.38)', textAlign: 'center', gap: '1rem' }}>
          <MessageSquare size={40} style={{ opacity: 0.3 }} />
          <div>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500, margin: 0 }}>Sin chatbots</p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', marginBottom: 0 }}>Aun no tenes chatbots configurados. Contacta a SAM-AI para empezar.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0 }}>Chatbots</h1>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', marginBottom: 0 }}>
            {chatbots.length} asistente{chatbots.length !== 1 ? 's' : ''} configurado{chatbots.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {chatbots.map((chatbot) => (
          <ChatbotCard key={chatbot.id} chatbot={chatbot} />
        ))}
      </div>
    </div>
  )
}
