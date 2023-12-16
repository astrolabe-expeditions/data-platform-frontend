'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'

import { PageHeader } from '@/components/Page/PageHeader'
import { useTranslations as getTranslations } from 'next-intl'

import { editSensor } from '@/lib/queries'
import { useMutation, useQuery } from '@tanstack/react-query'

export default function EditSensorForm({ sensor }) {
  const router = useRouter()
  const t = getTranslations('EditSensor')

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

  const { mutate } = useMutation(editSensor, {
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

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'error') {
    return <p>Error loading sensor data</p>
  }

  return (
    <>
      <PageHeader title={t('title')} className={'inline-flex pl-5'} showBack />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xl ">
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
