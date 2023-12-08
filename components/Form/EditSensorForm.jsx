'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'

import { PageHeader } from '@/components/Page/PageHeader'
import { useTranslations as getTranslations } from 'next-intl'

import { editSensor } from '@/lib/queries'
import { useMutation } from '@tanstack/react-query'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'

export default function EditSensorForm({ sensor }) {
  const router = useRouter()
  const t = getTranslations('EditSensor')

  const { mutate, isError, error } = useMutation({
    mutationFn: editSensor,
    onSuccess: () => {
      router.refresh()
      router.push('/sensors')
    },
  })

  const [formData, setFormData] = useState({
    identifier: sensor.identifier || '',
    type: sensor.type || '',
    nbr_measures: sensor.nbr_measures || '',
    station_id: sensor.station_id || '',
    records: sensor.records || [],
    files: sensor.files || [],
  })

  const [stationName, setStationName] = useState('')

  const handleChange = (inputName) => (evt) => {
    setFormData({
      ...formData,
      [inputName]: evt.target.value,
    })
  }

  useEffect(() => {
    // Fetch station information based on station_id
    const fetchStationName = async () => {
      try {
        const stationResponse = await fetch(
          `http://localhost:3000/api/stations/${formData.station_id}`,
        )
        const stationData = await stationResponse.json()
        setStationName(stationData.station.name) // set station name
      } catch (error) {
        console.error('Failed to fetch station information', error)
      }
    }

    if (formData.station_id) {
      fetchStationName()
    }
  }, [formData.station_id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    mutate({
      id: sensor.id,
      ...formData,
    })
  }

  return (
    <>
      <PageHeader title={t('title')} className={'inline-flex pl-5'} showBack />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xl ">
        {isError ? (
          <Alert variant="destructive">
            <AlertTitle>{t('error_alert.title')}</AlertTitle>
            <AlertDescription>
              {t(`error_alert.errors.${error}`)}
            </AlertDescription>
          </Alert>
        ) : null}
        <Input
          label={t('labels.identifier')}
          value={formData.identifier}
          readOnly
          onChange={handleChange('identifier')}
          type="text"
          placeholder={t('labels.identifier')}
          name="Identifier"
          style={{ backgroundColor: '#C0C0C0' }}
        />
        <Input
          label={t('labels.type')}
          value={formData.type}
          readOnly
          onChange={handleChange('type')}
          type="text"
          placeholder={t('labels.type')}
          name="Type"
          style={{ backgroundColor: '#C0C0C0' }}
        />
        <Input
          label={t('labels.nbr_measures')}
          value={formData.nbr_measures}
          onChange={handleChange('nbr_measures')}
          type="text"
          placeholder={t('labels.nbr_measures')}
          name="Nbr_measures"
        />
        <Input
          label={t('labels.station_name')}
          value={stationName}
          readOnly
          type="text"
          placeholder={t('labels.station_name')}
          name="Station Name"
          style={{ backgroundColor: '#C0C0C0' }}
        />
        <Button type="submit" label={t('edit_sensor')} className="w-fit mt-4" />
      </form>
    </>
  )
}
