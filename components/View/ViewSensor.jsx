'use client'
import { useTranslations as getTranslations } from 'next-intl'
import { SensorCard } from '../Card/SensorCard'
import { PageHeader } from '../Page/PageHeader'
import { Link } from '../ui/Link'

const SensorView = ({ sensor }) => {
  const t = getTranslations('Sensors')

  return (
    <div>
      <PageHeader title={t('view_screen.title')} showBack />
      <br />
      <Link href={`${sensor.id}/upload`}>Upload file</Link>
      <SensorCard sensor={sensor}></SensorCard>
    </div>
  )
}

export { SensorView }
