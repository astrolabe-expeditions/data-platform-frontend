import { I18nProvider } from '@/components/I18nProvider'
import '@/styles/global.css'
import '@radix-ui/themes/styles.css'
import { useLocale } from 'next-intl'
import { Providers } from '@/app/[locale]/Providers'
import { Theme } from '@radix-ui/themes'

export const metadata = {
  title: 'Astrobale Expeditions - Data platform',
  description: 'Platform from the Astrobale Expeditions sensor',
}

const RootLayout = ({ children }) => {
  const locale = useLocale()

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <Theme>
            <I18nProvider locale={locale}>{children}</I18nProvider>
          </Theme>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
