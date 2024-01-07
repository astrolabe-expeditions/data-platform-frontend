'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations as getTranslations } from 'next-intl'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { PageHeader } from '@/components/Page/PageHeader'
import { editSensor } from '@/lib/queries'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'

export default function EditSensorForm({ sensor }) {
  const router = useRouter()
  const t = getTranslations('EditSensor')

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const getSensorById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/sensors/${id}`, {
        cache: 'no-store',
      })
      if (!res.ok) throw new Error('Failed to fetch sensor')
      const json = await res.json()
      return json
    } catch (error) {
      console.log(error)
    }
  }

  const { data, status } = useQuery(['sensor', sensor.id], () =>
    getSensorById(sensor.id),
  )

  const { mutate, isError, error } = useMutation(editSensor, {
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

  const onSubmit = async (formData) => {
    mutate({
      id: sensor.id,
      ...formData,
    })
  }

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'error') {
    return <p>Error loading sensor data</p>
  }

  return (
    <>
      <PageHeader title={t('title')} showBack />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 max-w-xl ">
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
        <Controller
          name="nbr_measures"
          control={control}
          defaultValue={formData.nbr_measures}
          render={({ field }) => (
            <Input
              {...register('nbr_measures', { required: true })}
              label={t('labels.nbr_measures')}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              type="text"
              placeholder={t('labels.nbr_measures')}
              name="Nbr_measures"
            />
          )}
        />
        {errors.nbr_measures && (
          <p className="error">{t('nbr_measures_required')}</p>
        )}
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
      <DevTool control={control} />
    </>
  )
}
