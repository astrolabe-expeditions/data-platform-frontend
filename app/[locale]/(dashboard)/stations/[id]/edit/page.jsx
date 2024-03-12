'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { Page } from '@/components/Page/Page'
import EditStationForm from '@/components/Form/EditStationForm'
import NotFound from '@/components/404'
import { PageHeader } from '@/components/Page/PageHeader'
import { findStationById } from '@/lib/queries'

export default function EditStation() {
  const { id } = useParams()
  const t = useTranslations('EditStation')

  const { data, isLoading } = useQuery({
    queryKey: ['stations', id],
    queryFn: () => findStationById(id),
  })

  console.log(data)

  return (
    <Page>
      <PageHeader title={t('title')} showBack />
      {isLoading && <p>Loading...</p>}
      {!isLoading && !data && <NotFound errorMessage={'Station Not Found'} />}
      {!isLoading && data && <EditStationForm station={data} />}
    </Page>
  )
}
