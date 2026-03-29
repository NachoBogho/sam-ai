import { createAdminClient } from '@/lib/supabase/admin'
import type { Client, Chatbot, Automation } from './types'

// Obtener todos los clientes (admin only)
export async function getAllClients(): Promise<Client[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(`Failed to fetch clients: ${error.message}`)
  return data ?? []
}

// Crear un nuevo cliente (user en Auth + registro en clients)
export async function createClientWithUser(params: {
  email: string
  password: string
  companyName: string
  contactEmail: string
  plan: 'starter' | 'growth' | 'enterprise'
}): Promise<{ user_id: string; client: Client }> {
  const supabase = createAdminClient()

  // 1. Crear usuario en Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: params.email,
    password: params.password,
    email_confirm: true, // confirmar email automáticamente
  })

  if (authError || !authData.user) {
    throw new Error(`Failed to create user: ${authError?.message ?? 'Unknown error'}`)
  }

  const userId = authData.user.id

  // 2. Crear registro en clients
  const { data: clientData, error: clientError } = await supabase
    .from('clients')
    .insert({
      user_id: userId,
      company_name: params.companyName,
      contact_email: params.contactEmail,
      plan: params.plan,
      active: true,
    })
    .select()
    .single()

  if (clientError || !clientData) {
    // Rollback: eliminar el usuario creado
    await supabase.auth.admin.deleteUser(userId)
    throw new Error(`Failed to create client: ${clientError?.message ?? 'Unknown error'}`)
  }

  return { user_id: userId, client: clientData }
}

// Eliminar cliente (auth user + client row — cascade se encarga del resto)
export async function deleteClient(userId: string): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase.auth.admin.deleteUser(userId)
  if (error) throw new Error(`Failed to delete client: ${error.message}`)
  // El cliente se elimina en cascada por FK ON DELETE CASCADE
}

// Activar o desactivar un cliente
export async function setClientActive(clientId: string, active: boolean): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('clients')
    .update({ active })
    .eq('id', clientId)
  if (error) throw new Error(`Failed to update client status: ${error.message}`)
}

// Obtener un cliente por ID
export async function getClientById(clientId: string): Promise<Client | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', clientId)
    .maybeSingle()
  if (error) throw new Error(`Failed to fetch client: ${error.message}`)
  return data ?? null
}

// Obtener chatbots de un cliente (admin)
export async function getClientChatbotsAdmin(clientId: string): Promise<Chatbot[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('chatbots')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
  if (error) throw new Error(`Failed to fetch chatbots: ${error.message}`)
  return data ?? []
}

// Obtener automations de un cliente (admin)
export async function getClientAutomationsAdmin(clientId: string): Promise<Automation[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('automations')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
  if (error) throw new Error(`Failed to fetch automations: ${error.message}`)
  return data ?? []
}

// Agregar chatbot a un cliente
export async function addChatbot(params: {
  clientId: string
  name: string
  platform: 'whatsapp' | 'web' | 'instagram' | 'email'
  status: 'active' | 'paused' | 'training'
}): Promise<Chatbot> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('chatbots')
    .insert({
      client_id: params.clientId,
      name: params.name,
      platform: params.platform,
      status: params.status,
      messages_this_month: 0,
      conversations_this_month: 0,
      leads_captured_this_month: 0,
      resolution_rate: 0,
    })
    .select()
    .single()
  if (error) throw new Error(`Failed to add chatbot: ${error.message}`)
  return data
}

// Agregar automatización a un cliente
export async function addAutomation(params: {
  clientId: string
  name: string
  description: string
  platform: 'n8n' | 'make' | 'zapier' | 'custom'
  status: 'active' | 'paused'
}): Promise<Automation> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('automations')
    .insert({
      client_id: params.clientId,
      name: params.name,
      description: params.description || null,
      platform: params.platform,
      status: params.status,
      executions_this_month: 0,
      errors_this_month: 0,
      avg_execution_time_seconds: 0,
    })
    .select()
    .single()
  if (error) throw new Error(`Failed to add automation: ${error.message}`)
  return data
}
