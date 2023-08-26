import '@/styles/global.css'
import { useLocale } from 'next-intl'

export const metadata = {
  title: 'Astrobale Expeditions - Data platform',
  description: 'Platform from the Astrobale Expeditions sensor',
}

const RootLayout = ({ children }) => {
  const locale = useLocale()

  return (
    <html lang={locale}>
      <body className="flex">{children}</body>
    </html>
  )
}

export default RootLayout
