import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

const I18nProvider = async ({ children, locale }) => {
  let locales
  try {
    locales = (await import(`../locales/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <NextIntlClientProvider locale={locale} messages={locales}>
      {children}
    </NextIntlClientProvider>
  )
}

export { I18nProvider }
