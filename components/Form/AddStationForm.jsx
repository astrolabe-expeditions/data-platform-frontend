'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'

import { PageHeader } from '@/components/Page/PageHeader'
import { StationType } from '@prisma/client'
import { useTranslations as getTranslations } from 'next-intl'

import Select from 'react-select'

export default function AddStation() {
  const t = getTranslations('AddStation')

  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    sensors: [],
    longitude: '',
    latitude: '',
    description: '',
    image_url: '',
  })

  const [allSensors, setAllSensors] = useState([]) // State to store all sensors

  const [selectedSensors, setSelectedSensors] = useState([]) // React state to manage selected sensors

  const [selectedType, setSelectedType] = useState() // React state to manage selected type

  const isStationTypeFixed = formData.type === StationType.Fixed // Check if the station type is "Fixed"

  const handleChange = (inputName) => (evt) => {
    setFormData({
      ...formData,
      [inputName]: evt.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !formData.name ||
      !formData.type ||
      !formData.sensors ||
      !formData.description ||
      !formData.image_url
    ) {
      alert('Please fill all fields')
      return
    }

    // If the station type is "Fixed," check for longitude and latitude
    if (isStationTypeFixed && (!formData.longitude || !formData.latitude)) {
      alert('Please fill longitude and latitude for Fixed station')
      return
    }

    try {
      const res = await fetch('http://localhost:3000/api/stations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          sensors: {
            connect: formData.sensors.map((sensor) => ({ id: sensor.id })),
          },
          longitude: formData.longitude,
          latitude: formData.latitude,
          description: formData.description,
          image_url: formData.image_url,
        }),
      })
      if (res.ok) {
        router.push('/stations')
      } else {
        throw new Error('Failed to add station')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAllSensors = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/sensors')
      if (!response.ok) {
        throw new Error('Failed to fetch sensors')
      }
      const data = await response.json()
      setAllSensors(data) // Store all sensors in the state
    } catch (error) {
      console.error('Error fetching all sensors:', error)
    }
  }, [setAllSensors])

  useEffect(() => {
    fetchAllSensors()
  }, [fetchAllSensors]) // Fetch all sensors when the component mounts

  // Array of all station's types
  const typeList = Object.values(StationType).map((value) => ({
    value,
    label: value,
  }))

  // Function triggered on type selection
  function handleTypeSelect(typedata) {
    setSelectedType(typedata)

    // Update the formData with the selected type
    setFormData({
      ...formData,
      type: typedata.value,
    })
  }

  // Array of all sensors
  const sensorsList = allSensors.map((sensor) => ({
    value: sensor,
    label: sensor.identifier,
  }))

  // Function triggered on sensor selection
  function handleSensorSelect(data) {
    setSelectedSensors(data)

    // Extract values from the selected sensors array
    const selectedSensorValues = data.map((sensor) => sensor.value)

    // Assign the selected sensor values to formData.sensors
    setFormData({
      ...formData,
      sensors: selectedSensorValues,
    })
  }

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

        <div className="app">
          <h2>{t('select_type')}</h2>
          <div className="dropdown-container">
            <Select
              options={typeList}
              placeholder={t('select_type')}
              value={selectedType}
              onChange={handleTypeSelect}
              isSearchable={true}
            />
          </div>
        </div>

        <div className="app">
          <h2>{t('select_sensors')}</h2>
          <div className="dropdown-container">
            <Select
              options={sensorsList}
              placeholder={t('select_sensors')}
              value={selectedSensors.value}
              onChange={handleSensorSelect}
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
        <Button type="submit" label={t('add_station')} className="mt-4" />
      </form>
    </>
  )
}
