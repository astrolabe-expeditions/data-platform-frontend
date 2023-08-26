import { I18nProvider } from '@/components/I18nProvider'
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
      <body className="flex">
        <I18nProvider locale={locale}>{children}</I18nProvider>
      </body>
    </html>
  )
}

export default RootLayout
