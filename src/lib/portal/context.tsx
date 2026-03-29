'use client'
import { createContext, useContext } from 'react'
import type React from 'react'
import type { Client } from './types'

const ClientContext = createContext<Client | null>(null)

export function ClientProvider({ value, children }: { value: Client; children: React.ReactNode }) {
  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
}

export function useClient(): Client {
  const client = useContext(ClientContext)
  if (!client) throw new Error('useClient must be used within ClientProvider')
  return client
}
