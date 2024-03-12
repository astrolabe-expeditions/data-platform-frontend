'use client'

import { useTranslations } from 'next-intl'

import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'

function Dashboard() {
  const t = useTranslations('Dashboard')

  return (
    <Page>
      <PageHeader title={t('title')} />
    </Page>
  )
}

export default Dashboard
