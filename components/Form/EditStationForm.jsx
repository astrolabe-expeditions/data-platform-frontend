'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Select from 'react-select'
import { StationType } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { PageHeader } from '@/components/Page/PageHeader'
import { editStation } from '@/lib/queries'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'

export default function EditStationForm({ station }) {
  const router = useRouter()
  const t = useTranslations('EditStation')

  const form = useForm()
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = form

  const { mutate, isError, error } = useMutation(editStation, {
    onSuccess: () => {
      router.refresh()
      router.push('/admin/stations')
    },
  })

  const [formData, setFormData] = useState({
    name: station.name || '',
    type: station.type || '',
    longitude: station.longitude || '',
    latitude: station.latitude || '',
    description: station.description || '',
    image_url: station.image_url || '',
    sensors: station.sensors || [],
  })
  const [allSensors, setAllSensors] = useState([]) // State to store all sensors
  const [sensorStatus, setSensorStatus] = useState('idle') // State to manage the status of the sensor fetch request
  const [selectedSensors, setSelectedSensors] = useState([]) // React state to manage selected sensors

  // Function to handle the form input changes
  const handleChange = (inputName) => (evt) => {
    setFormData({
      ...formData,
      [inputName]: evt.target.value,
    })
  }

  // Function to handle the form submission
  const onSubmit = async (formData) => {
    mutate({
      id: station.id,
      ...formData,
      sensors: selectedSensors.map((sensor) => sensor.value),
    })
  }

  // Watch the station type
  const stationType = watch('type', formData.type)

  // Fetch all sensors from the API
  const { data: allSensorsList, status: sensorStatusQuery } = useQuery(
    ['fetchAllSensors'],
    async () => {
      setSensorStatus('loading')
      try {
        const res = await fetch('/api/v1/sensors')
        if (!res.ok) {
          throw new Error('Failed to fetch sensors')
        }
        const json = await res.json()
        setAllSensors(json) // Store all sensors in the state
        const linkedSensorsList = formData.sensors.map((sensor) => ({
          value: sensor,
          label: sensor.identifier,
        }))
        setSelectedSensors(linkedSensorsList)
        setSensorStatus('loaded')
        return json
      } catch (error) {
        setSensorStatus('error')
        console.error('Error fetching all sensors:', error)
      }
    },
  )

  // Array of all sensors that are not linked to a station
  const sensorsList = allSensors
    .filter((sensor) => sensor.station_id === null)
    .map((sensor) => ({
      value: sensor,
      label: sensor.identifier,
    }))

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedSensors(data)
  }

  if (sensorStatusQuery === 'loading') {
    return <p>Loading...</p>
  }

  if (sensorStatusQuery === 'error') {
    return <p>Error loading sensor data</p>
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 max-w-xl">
        {isError ? (
          <Alert variant="destructive">
            <AlertTitle>{t('error_alert.title')}</AlertTitle>
            <AlertDescription>
              {t(`error_alert.errors.${error}`)}
            </AlertDescription>
          </Alert>
        ) : null}
        <Controller
          name="name"
          control={control}
          defaultValue={formData.name}
          render={({ field }) => (
            <Input
              {...register('name', { required: true })}
              label={t('labels.name')}
              value={field.value}
              onChange={(e) => {
                handleChange('name')(e)
                field.onChange(e)
              }}
              type="text"
              placeholder={t('labels.name')}
              name="Name"
            />
          )}
        />
        {errors.name && <p className="error">{t('name_required')}</p>}
        <Controller
          name="type"
          control={control}
          defaultValue={formData.type}
          render={({ field }) => (
            <Input
              label={t('labels.type')}
              value={field.value}
              onChange={(e) => {
                handleChange('type')(e)
                field.onChange(e)
              }}
              readOnly
              type="text"
              placeholder={t('labels.type')}
              name="Type"
              style={{ backgroundColor: '#C0C0C0' }}
            />
          )}
        />
        <Controller
          name="sensors"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div className="app">
              <h2>{t('select_sensors')}</h2>
              <div className="dropdown-container">
                <Select
                  options={sensorsList}
                  placeholder={t('select_sensors')}
                  value={selectedSensors}
                  onChange={(selectedOptions) => {
                    handleSelect(selectedOptions)
                    field.onChange(selectedOptions)
                  }}
                  isSearchable={true}
                  isDisabled={sensorStatus !== 'loaded'}
                  isLoading={sensorStatus === 'loading'}
                  isMulti
                />
              </div>
            </div>
          )}
        />

        {stationType === StationType.Fixed && (
          <>
            <Controller
              name="longitude"
              control={control}
              defaultValue={formData.longitude}
              render={({ field }) => (
                <Input
                  label={t('labels.longitude')}
                  value={field.value}
                  onChange={(e) => {
                    handleChange('longitude')(e)
                    field.onChange(e)
                  }}
                  type="text"
                  placeholder={t('labels.longitude')}
                  name="Longitude"
                />
              )}
            />

            <Controller
              name="latitude"
              control={control}
              defaultValue={formData.latitude}
              render={({ field }) => (
                <Input
                  label={t('labels.latitude')}
                  value={field.value}
                  onChange={(e) => {
                    handleChange('latitude')(e)
                    field.onChange(e)
                  }}
                  type="text"
                  placeholder={t('labels.latitude')}
                  name="Latitude"
                />
              )}
            />
          </>
        )}

        <Controller
          name="description"
          control={control}
          defaultValue={formData.description}
          render={({ field }) => (
            <Input
              label={t('labels.description')}
              value={field.value}
              onChange={(e) => {
                handleChange('description')(e)
                field.onChange(e)
              }}
              type="text"
              placeholder={t('labels.description')}
              name="Description"
            />
          )}
        />

        <Controller
          name="image_url"
          control={control}
          defaultValue={formData.image_url}
          render={({ field }) => (
            <Input
              label={t('labels.image_url')}
              value={field.value}
              onChange={(e) => {
                handleChange('image_url')(e)
                field.onChange(e)
              }}
              type="text"
              placeholder={t('labels.image_url')}
              name="Image_url"
            />
          )}
        />
        <Button type="submit" label={t('edit_station')} className="mt-4" />
      </form>
      <DevTool control={control} />
    </>
  )
}
