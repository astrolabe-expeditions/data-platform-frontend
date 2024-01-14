'use client'

import { useTranslations as getTranslations } from 'next-intl'

import { SensorCard } from '@/components/Card/SensorCard'
import { PageHeader } from '@/components/Page/PageHeader'
import { FilesSection } from '@/components/View/FileSection'

const SensorView = ({ sensor }) => {
  const t = getTranslations('Sensors')

  return (
    <>
      <PageHeader title={t('view_screen.title')} showBack />
      <SensorCard sensor={sensor}></SensorCard>
      <FilesSection files={sensor.files} sensorId={sensor.id} />
    </>
  )
}

export { SensorView }
