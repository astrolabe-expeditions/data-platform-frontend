import Image from 'next/image'

import "@/styles/global.css"

export const metadata = {
  title: 'Astrobale Expeditions - Data platform',
  description: 'Platform from the Astrobale Expeditions sensor',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="flex">
        <main className="max-w-3xl mx-auto mt-16">
          <header className='flex flex-col items-center'>
          <Image
            src="/logo.png"
            width={64}
            height={64}
            alt="Picture of the author"
          />
            <h1 className="text-2xl font-bold">
              Astrolabe Expeditions
            </h1>
          </header>
          {children}
        </main>
      </body>
    </html>
  )
}
