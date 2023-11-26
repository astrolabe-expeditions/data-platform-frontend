'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { Select } from '@/components/ui/Select/Select'

import { PageHeader } from '@/components/Page/PageHeader'
import { Typography } from '@/components/ui/Typography'
import { StationType } from '@prisma/client'
import { useTranslations as getTranslations } from 'next-intl'

export default function EditSensorForm({
  id,
  identifier,
  type,
  nbr_measures,
  station_id,
  records,
  files,
}) {
  const [newIdentifier, setNewIdentifier] = useState(identifier)
  const [newType, setNewType] = useState(type)
  // const [newNbr_measures, setNewNbr_measures] = useState(nbr_measures)
  // const [newStation_id, setNewStation_id] = useState(station_id)
  // const [newRecords, setNewRecords] = useState(records)
  // const [newFiles, setNewFiles] = useState(files)

  const router = useRouter()

  // const t = getTranslations('Sensor')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/sensors/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newIdentifier,
          newType,
          // newNbr_measures,
          // newStation_id,
          // newRecords,
          // newFiles
        }),
      })
      if (!res.ok) throw new Error('Failed to update sensor')
      router.refresh()
      router.push('/sensors')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <PageHeader title={'Edit Sensor'} className={'inline-flex pl-5'} />
      <Typography variant="title" alignCenter className="mb-3">
        Edit Sensor
      </Typography>
      <Typography variant="subtitle" alignCenter className="mb-8">
        Please fill all fields
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xl">
        <Input
          label="Identifier"
          onChange={(e) => setNewIdentifier(e.target.value)}
          value={newIdentifier}
          type="text"
          placeholder="Identifier"
          name="newIdentifier"
        />
        <Input
          label="Type"
          onChange={(e) => setNewType(e.target.value)}
          value={newType}
          type="text"
          placeholder="Type"
          name="newType"
        />
        {/* <Input
          onChange={(e) => setNewSensors(e.target.value)}
          value={newSensors}
          type="text"
          placeholder="Sensors"
          name="sensors"
        /> */}
        {/* <Input
          onChange={(e) => setNewNbr_measures(e.target.value)}
          value={newNbr_measures}
          type="text"
          placeholder="Nbr_measures"
          name="newNbr_measures"
        /> */}
        {/* <Input
          type="text"
          name="name"
          //label={t('labels.name')}
          //value={formData.name}
          //onChange={handleChange('name')}
        /> */}
        {/* <Input
          label="Station ID"
          onChange={(e) => setNewStation_id(e.target.value)}
          value={newStation_id}
          type="text"
          placeholder="Station ID"
          name="newStation_id"
        /> */}
        {/* <Input
          onChange={(e) => setNewRecords(e.target.value)}
          value={newRecords}
          type="text"
          placeholder="Records"
          name="newRecords"
        /> */}
        {/* <Input
          onChange={(e) => setNewFiles(e.target.value)}
          value={newFiles}
          type="text"
          placeholder="Files"
          name="newFiles"
        /> */}
        <Button type="submit" label="Edit Sensor" className="w-fit mt-4" />
      </form>
    </>
  )
}
