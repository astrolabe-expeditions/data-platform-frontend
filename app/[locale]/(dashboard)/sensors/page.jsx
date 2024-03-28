'use client'

import { Page } from '@/components/Page/Page'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/Page/PageHeader'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useQuery } from '@tanstack/react-query'

import SensorSearchBar from '@/components/Searchbar/SensorSearchBar'
import { findAllSensors } from '@/lib/queries'

function SensorList() {
  const t = useTranslations('SensorList')

  const { data: sensors, isLoading } = useQuery({
    queryKey: ['sensors'],
    queryFn: () => findAllSensors(),
  })

  return (
    <Page>
      <PageHeader
        title={t('title')}
        showBack
        actions={
          <Button
            href="/sensors/add"
            component={Link}
            label={t('actions.add')}
          />
        }
      />
      {isLoading ? <p>Loading...</p> : null}
      {sensors?.length === 0 ? <p>No sensors found</p> : null}
      {sensors?.length > 0 ? <SensorSearchBar data={sensors} /> : null}
    </Page>
  )
}

export default SensorList
