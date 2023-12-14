'use client'
import { useTranslations as getTranslations } from 'next-intl'
import { StationCard } from '../Card/StationCard'
import { PageHeader } from '../Page/PageHeader'

const StationView = ({ station }) => {
  const t = getTranslations('StationTable')

  return (
    <div>
      <PageHeader title={t('station_view_title')} showBack />
      <br />
      <StationCard station={station}></StationCard>
    </div>
  )
}

export { StationView }
