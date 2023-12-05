'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { Select } from '@/components/ui/Select/Select'

import { PageHeader } from '@/components/Page/PageHeader'
import { Typography } from '@/components/ui/Typography'
import { useTranslations as getTranslations } from 'next-intl'

import { editSensor } from '@/lib/queries'
import { useMutation } from '@tanstack/react-query'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'

export default function EditSensorForm({ sensor }) {

  const t = getTranslations('EditSensor')

  const { mutate, isError, error } = useMutation({ mutationFn: editSensor })

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

  console.log('sensor id', sensor.id)

  const router = useRouter()

  useEffect(() => {
    // Fetch station information based on station_id
    const fetchStationName = async () => {
      try {
        const stationResponse = await fetch(
          `http://localhost:3000/api/stations/${formData.station_id}`,
        )
        const stationData = await stationResponse.json()
        console.log('stationData', stationData)
        setStationName(stationData.station.name) // set station name
        console.log('stationName', stationData.station.name)
      } catch (error) {
        console.error('Failed to fetch station information', error)
      }
    }

    if (formData.station_id) {
      fetchStationName()
    }
  }, [formData.station_id])

  // const handleSubmit = async (evt) => {
  //   evt.preventDefault()
  //   mutate(sensor.id, formData)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `http://localhost:3000/api/sensors/${sensor.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: formData.identifier,
            type: formData.type,
            nbr_measures: parseInt(formData.nbr_measures),
            // station_id: formData.station_id,
            // records: formData.records,
            // files: formData.files,
          }),
        },
      )
      if (!res.ok) throw new Error('Failed to update sensor')
      router.refresh()
      router.push('/sensors')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <PageHeader title={t('title')} className={'inline-flex pl-5'} />
      <Typography variant="title" alignCenter className="mb-3">
        {t('title')}
      </Typography>
      <Typography variant="subtitle" alignCenter className="mb-8">
        {t('subtitle')}
      </Typography>
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
          // style={{ backgroundColor: '#F3F3F3' }}
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
        {/* <Input
          label={t('labels.station_id')}
          value={formData.station_id}
          onChange={handleChange('station_id')}
          type="text"
          placeholder="Station ID"
          name="Station ID"
        /> */}
        <Input
          label={t('labels.station_name')}
          value={stationName}
          readOnly
          type="text"
          placeholder={t('labels.station_name')}
          name="Station Name"
          style={{ backgroundColor: '#C0C0C0' }}
        />
        {/* <Input
          label={t('labels.records')}
          value={formData.records}
          onChange={handleChange('records')}
          type="text"
          placeholder={t('labels.records')}
          name="Records"
        />
        <Input
          label={t('labels.files')}
          value={formData.files}
          onChange={handleChange('files')}
          type="text"
          placeholder={t('labels.files')}
          name="Files"
        /> */}
        <Button type="submit" label={t('edit_sensor')} className="w-fit mt-4" />
      </form>
    </>
  )
}
