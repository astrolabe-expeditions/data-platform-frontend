import { Providers } from '@/components/Providers'
import { Header } from '@/components/Header'

export default function DashboardLayout({ children }) {
  return (
    <main className="max-w-3xl mx-auto mt-16">
      <Providers>
        <Header />
        {children}
      </Providers>
    </main>
  )
}
