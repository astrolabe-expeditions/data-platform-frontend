import "@/styles/global.css"
import { Provider } from '@/components/Provider'
import { Header } from "@/components/Header"

export const metadata = {
  title: 'Astrobale Expeditions - Data platform',
  description: 'Platform from the Astrobale Expeditions sensor',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="flex">
        <main className="max-w-3xl mx-auto mt-16">
          <Provider>          
            <Header />
            {children}
          </Provider>
        </main>
      </body>
    </html>
  )
}
