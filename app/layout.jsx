import "@/styles/global.css"

export const metadata = {
  title: 'Astrobale Expeditions - Data platform',
  description: 'Platform from the Astrobale Expeditions sensor',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="flex">
        {children}
      </body>
    </html>
  )
}
