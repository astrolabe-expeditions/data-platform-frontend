'use client'

import { useTranslations as getTranslations } from 'next-intl'
import Link from 'next/link'

import { SensorCard } from '@/components/Card/SensorCard'
import { PageHeader } from '@/components/Page/PageHeader'
import { Button } from '@/components/ui/Button/Button'

const SensorView = ({ sensor }) => {
  const t = getTranslations('Sensors')

  return (
    <>
      <PageHeader
        title={t('view_screen.title')}
        actions={
          <Button
            href={`${sensor.id}/upload`}
            component={Link}
            label={t('labels.upload_file')}
          />
        }
        showBack
      />
      <SensorCard sensor={sensor}></SensorCard>
    </>
  )
}

export { SensorView }
