import { Header } from '@/components/Header'
import { Providers } from '@/components/Providers'

export default function DashboardLayout({ children }) {
  return (
    <Providers>
      <div className="flex flex-col-reverse ">
        <main className="lg:ps-72">{children}</main>
        <Header />
      </div>
    </Providers>
  )
}
