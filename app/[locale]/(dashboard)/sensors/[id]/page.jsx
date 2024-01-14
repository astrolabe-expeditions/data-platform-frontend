'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'
import { SensorView } from '@/components/View/ViewSensor'
import { findSensorById } from '@/lib/queries'
import NotFound from '@/components/404'

function SensorDetail({ params }) {
  const t = useTranslations('Sensors')
  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['sensors', id],
    queryFn: () => findSensorById(id),
  })

  return (
    <Page>
      <PageHeader title={t('view_screen.title')} showBack />
      {isLoading && <p>Loading...</p>}
      {!isLoading && !data && <NotFound />}
      {!isLoading && data && <SensorView sensor={data} />}
    </Page>
  )
}

export default SensorDetail
