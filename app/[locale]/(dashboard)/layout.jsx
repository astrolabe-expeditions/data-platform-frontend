import { Providers } from '@/components/Providers'
import { Sidebar } from '@/components/Sidebar/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <Providers>
      <main className="flex flex-row-reverse">
        {children}
        <Sidebar />
      </main>
    </Providers>
  )
}
