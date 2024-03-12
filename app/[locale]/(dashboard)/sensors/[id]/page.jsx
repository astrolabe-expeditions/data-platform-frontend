'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import NavLink from 'next/link'
import { Badge } from '@radix-ui/themes'

import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'
import { SensorView } from '@/components/View/ViewSensor'
import { findSensorById, findStationById } from '@/lib/queries'
import NotFound from '@/components/404'
import { Button } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'
import { Link } from '@/components/ui/Link'

function SensorDetail({ params }) {
  const t = useTranslations('SensorDetail')
  const { id } = useParams()

  const { data: sensor, isLoading } = useQuery({
    queryKey: ['sensors', id],
    queryFn: () => findSensorById(id),
  })

  const stationId = sensor?.station_id
  const sensorIdentifier = sensor?.identifier
  const sensorType = sensor?.type

  const { data: station } = useQuery({
    queryKey: ['stations', stationId],
    queryFn: () => findStationById(stationId),
    enabled: !!stationId,
  })

  console.log('station', station)
  console.log('sensor', sensor)

  return (
    <Page>
      <PageHeader
        title={
          <>
            <Typography variant="title">
              {t('title', { identifier: sensorIdentifier })}
            </Typography>
            {sensorType ? (
              <Badge className="ml-2" color="orange">
                {sensorType}
              </Badge>
            ) : null}
          </>
        }
        subtitle={
          station ? (
            <Typography variant="subtitle">
              {t('subtitle')}
              <Link
                href={`/stations/${stationId}`}
                as={NavLink}
                className="ml-1">
                {station.name}
              </Link>
            </Typography>
          ) : null
        }
        showBack
        actions={
          <Button
            href={`/sensors/${id}/edit`}
            component={NavLink}
            label={t('actions.edit')}
          />
        }
      />
      {isLoading && <p>Loading...</p>}
      {!isLoading && !sensor && <NotFound />}
      {!isLoading && sensor && <SensorView sensor={sensor} />}
    </Page>
  )
}

export default SensorDetail
