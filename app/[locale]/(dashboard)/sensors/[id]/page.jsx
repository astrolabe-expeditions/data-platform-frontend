'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import NavLink from 'next/link'
import { Badge } from '@radix-ui/themes'
import { Copy } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'
import { SensorView } from '@/components/View/ViewSensor'
import {
  findSensorById,
  findStationById,
  getSensorShareToken,
} from '@/lib/queries'
import NotFound from '@/components/404'
import { Button, IconButton } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'
import { Link } from '@/components/ui/Link'
import { Input } from '@/components/ui/Input/Input'

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

  const { data: token } = useQuery({
    queryKey: ['sensors', id, 'share'],
    queryFn: () => getSensorShareToken(id),
  })

  const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/upload?token=${token?.data?.token}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink)
  }

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
          <>
            <Button
              href={`/sensors/${id}/edit`}
              component={NavLink}
              variant="secondary"
              label={t('actions.edit')}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-4" label={t('actions.share')} />
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{t('shareDialog.title')}</DialogTitle>
                  <DialogDescription>
                    {t('shareDialog.description')}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input
                      label="Link"
                      id="link"
                      defaultValue={shareLink}
                      readOnly
                    />
                  </div>
                  <IconButton
                    onClick={handleCopy}
                    icon={<Copy className="h-4 w-4" />}
                    size="sm"
                    label={t('actions.share')}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </>
        }
      />
      {isLoading && <p>Loading...</p>}
      {!isLoading && !sensor && <NotFound />}
      {!isLoading && sensor && <SensorView sensor={sensor} />}
    </Page>
  )
}

export default SensorDetail
