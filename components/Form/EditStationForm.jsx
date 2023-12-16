'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Select from 'react-select'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'

import { PageHeader } from '@/components/Page/PageHeader'
import { StationType } from '@prisma/client'
import { useTranslations as getTranslations } from 'next-intl'

import { editStation } from '@/lib/queries'
import { useMutation, useQuery } from '@tanstack/react-query'

export default function EditStationForm({ station }) {
  const router = useRouter()
  const t = getTranslations('EditStation')

  const { mutate } = useMutation(editStation, {
    onSuccess: () => {
      router.refresh()
      router.push('/stations')
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

  const handleChange = (inputName) => (evt) => {
    setFormData({
      ...formData,
      [inputName]: evt.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    mutate({
      id: station.id,
      ...formData,
      sensors: selectedSensors.map((sensor) => sensor.value),
    })
  }

  const isStationTypeFixed = formData.type === StationType.Fixed // Check if the station type is "Fixed"

  // Use an inline function for the query
  const { data: allSensorsList, status: sensorStatusQuery } = useQuery(
    ['fetchAllSensors'],
    async () => {
      setSensorStatus('loading')
      try {
        const res = await fetch('http://localhost:3000/api/sensors')
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
        console.log('All Sensors: ', json)
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
      <PageHeader title={t('title')} className={'inline-flex pl-5'} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xl">
        <Input
          label={t('labels.name')}
          value={formData.name}
          onChange={handleChange('name')}
          type="text"
          placeholder={t('labels.name')}
          name="Name"
        />

        <Input
          label={t('labels.type')}
          value={formData.type}
          onChange={handleChange('type')}
          readOnly
          type="text"
          placeholder={t('labels.type')}
          name="Type"
          style={{ backgroundColor: '#C0C0C0' }}
        />

        <div className="app">
          <h2>{t('select_sensors')}</h2>
          <div className="dropdown-container">
            <Select
              options={sensorsList}
              placeholder={t('select_sensors')}
              value={selectedSensors}
              onChange={handleSelect}
              isSearchable={true}
              isDisabled={sensorStatus !== 'loaded'}
              isLoading={sensorStatus === 'loading'}
              isMulti
            />
          </div>
        </div>

        {isStationTypeFixed && (
          <>
            <Input
              label={t('labels.longitude')}
              value={formData.longitude}
              onChange={handleChange('longitude')}
              type="text"
              placeholder={t('labels.longitude')}
              name="Longitude"
            />
            <Input
              label={t('labels.latitude')}
              value={formData.latitude}
              onChange={handleChange('latitude')}
              type="text"
              placeholder={t('labels.latitude')}
              name="Latitude"
            />
          </>
        )}
        <Input
          label={t('labels.description')}
          value={formData.description}
          onChange={handleChange('description')}
          type="text"
          placeholder={t('labels.description')}
          name="Description"
        />
        <Input
          label={t('labels.image_url')}
          value={formData.image_url}
          onChange={handleChange('image_url')}
          type="text"
          placeholder={t('labels.image_url')}
          name="Image_url"
        />
        <Button type="submit" label={t('edit_station')} className="mt-4" />
      </form>
    </>
  )
}
