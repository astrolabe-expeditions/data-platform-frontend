import { getRequestConfig } from 'next-intl/server'
import { useTranslations } from 'next-intl'

export const withTranslations = (Component, namespace) => {
  return function WithTranslations({ ...props }) {
    const { t } = useTranslations(namespace)
    return <Component t={t} {...props} />
  }
}

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../locales/${locale}.json`)).default,
}))
