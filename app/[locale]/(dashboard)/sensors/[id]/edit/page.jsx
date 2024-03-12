'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { Page } from '@/components/Page/Page'
import EditSensorForm from '@/components/Form/EditSensorForm'
import NotFound from '@/components/404'
import { PageHeader } from '@/components/Page/PageHeader'
import { findSensorById } from '@/lib/queries'

export default function EditSensor() {
  const t = useTranslations('EditSensor')
  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['sensors', id],
    queryFn: () => findSensorById(id),
  })

  return (
    <Page>
      <PageHeader title={t('title')} showBack />
      {isLoading && <p>Loading...</p>}
      {!isLoading && !data && <NotFound />}
      {!isLoading && data && <EditSensorForm sensor={data} />}
    </Page>
  )
}
