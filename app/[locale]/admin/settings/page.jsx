'use client'

import { useTranslations } from 'next-intl'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'

function Settings() {
  const t = useTranslations('Settings')

  return (
    <Page>
      <PageHeader title={t('title')} />
    </Page>
  )
}

export default Settings
