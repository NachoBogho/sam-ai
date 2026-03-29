import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/portal/layout/Sidebar'
import Header from '@/components/portal/layout/Header'
import AdminSidebar from '@/components/portal/layout/AdminSidebar'
import AdminHeader from '@/components/portal/layout/AdminHeader'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAdmin = !!(user?.email && user.email === process.env.ADMIN_EMAIL)

  if (isAdmin) {
    return (
      <div className="flex h-screen" style={{ background: '#030712' }}>
        <AdminSidebar email={user!.email!} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader email={user!.email!} />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen" style={{ background: '#030712' }}>
      <Sidebar isAdmin={false} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
