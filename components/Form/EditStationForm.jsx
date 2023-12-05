'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
// import { Select } from '@/components/ui/Select/Select'

import { PageHeader } from '@/components/Page/PageHeader'
import { Typography } from '@/components/ui/Typography'
import { StationType } from '@prisma/client'
import { useTranslations as getTranslations } from 'next-intl'

import { editStation } from '@/lib/queries'
import { useMutation } from '@tanstack/react-query'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'

import Select from 'react-select'

import { DropdownMenu } from '@radix-ui/themes'

import { Sensor } from '@prisma/client'

export default function EditStationForm({ station }) {
  const t = getTranslations('EditStation')

  const { mutate, isError, error } = useMutation({ mutationFn: editStation })

  const [formData, setFormData] = useState({
    name: station.name || '',
    type: station.type || '',
    longitude: station.longitude || '',
    latitude: station.latitude || '',
    description: station.description || '',
    image_url: station.image_url || '',
    sensors: station.sensors || [],
  })

  const handleChange = (inputName) => (evt) => {
    setFormData({
      ...formData,
      [inputName]: evt.target.value,
    })
  }

  console.log('station id', station.id)

  const router = useRouter()

  // const handleSubmit = async (evt) => {
  //   evt.preventDefault()
  //   mutate(station.id, formData)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `http://localhost:3000/api/stations/${station.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            type: formData.type,
            longitude: formData.longitude,
            // logitude: parseFloat(formData.longitude),
            latitude: formData.latitude,
            // latitude: parseFloat(formData.latitude),
            description: formData.description,
            image_url: formData.image_url,
            // sensors: formData.sensors,
          }),
        },
      )
      if (!res.ok) throw new Error('Failed to update station')
      router.refresh()
      router.push('/stations')
    } catch (error) {
      console.log(error)
    }
  }

  const isStationTypeFixed = formData.type === StationType.Fixed // Check if the station type is "Fixed"

  const [allSensors, setAllSensors] = useState([]) // State to store all sensors

  const fetchAllSensors = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/sensors')
      if (!response.ok) {
        throw new Error('Failed to fetch sensors')
      }
      const data = await response.json()
      setAllSensors(data) // Store all sensors in the state
      console.log('All Sensors: ', data)
    } catch (error) {
      console.error('Error fetching all sensors:', error)
    }
  }, [setAllSensors])

  useEffect(() => {
    fetchAllSensors()
  }, [fetchAllSensors]) // Fetch all sensors when the component mounts

  // Above works fine

  // React state to manage selected sensors
  const [selectedSensors, setSelectedSensors] = useState()

  // Array of all sensors
  const sensorsList = allSensors.map((sensor) => ({
    value: sensor,
    label: sensor.identifier,
  }))

  console.log('Sensors List: ', sensorsList)

  // Array of linked sensors
  const linkedSensorsList = formData.sensors.map((sensor) => ({
    value: sensor,
    label: sensor.identifier,
  }))

  console.log('Linked Sensors List: ', linkedSensorsList)

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedSensors(data)
    console.log('data: ', data)
  }
  console.log('Selected Sensors: ', selectedSensors)

  // function handleSelect(data) {
  //   setNewSensors(data)
  //   console.log('Selected Sensors: ', newSensors)
  // }

  return (
    <>
      <PageHeader title={t('title')} className={'inline-flex pl-5'} showBack />
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
              // value={linkedSensorsList} // Pre-populate with linked sensors
              onChange={handleSelect}
              isSearchable={true}
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
