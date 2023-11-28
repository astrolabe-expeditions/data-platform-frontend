'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'

import { PageHeader } from '@/components/Page/PageHeader'
import { Typography } from '@/components/ui/Typography'
// import { useTranslations as getTranslations } from 'next-intl'

import { DropdownMenu } from '@radix-ui/themes'

export default function EditStationForm({
  id,
  name,
  type,
  sensors,
  longitude,
  latitude,
  description,
  image_url,
}) {
  const [newName, setNewName] = useState(name)
  const [newType, setNewType] = useState(type)
  const [newSensors, setNewSensors] = useState(sensors)
  const [newLongitude, setNewLongitude] = useState(longitude)
  const [newLatitude, setNewLatitude] = useState(latitude)
  const [newDescription, setNewDescription] = useState(description)
  const [newImage_url, setNewImage_url] = useState(image_url)


  const router = useRouter()

  // const t = getTranslations('Station')



  const [selectedItems, setSelectedItems] = useState(newSensors)

  const handleItemClick = (itemValue) => {
    setSelectedItems((prevItems) =>
      prevItems.includes(itemValue)
        ? prevItems.filter((item) => item !== itemValue)
        : [...prevItems, itemValue],
    )
  }
  console.log('Selected Items:', selectedItems)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/stations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newName,
          newType,
          newLongitude,
          newLatitude,
          newDescription,
          newImage_url,
          // newSensors, // Include newSensors in the request body
        }),
      })
      if (!res.ok) throw new Error('Failed to update station')
      router.refresh()
      router.push('/stations')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <PageHeader title={'Edit Station'} className={'inline-flex pl-5'} />
      <Typography variant="title" alignCenter className="mb-3">
        Edit Station
      </Typography>
      <Typography variant="subtitle" alignCenter className="mb-8">
        Please fill all fields
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xl">
        <Input
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
          type="text"
          placeholder="Name"
          name="newName"
        />
        <Input
          onChange={(e) => setNewType(e.target.value)}
          value={newType}
          type="text"
          placeholder="Type"
          name="newType"
        />
        <Input
          onChange={(e) => setNewLongitude(e.target.value)}
          value={newLongitude}
          type="text"
          placeholder="Longitude"
          name="newLongitude"
        />
        <Input
          onChange={(e) => setNewLatitude(e.target.value)}
          value={newLatitude}
          type="text"
          placeholder="Latitude"
          name="newLatitude"
        />
        <Input
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          type="text"
          placeholder="Description"
          name="newDescription"
        />
        <Input
          onChange={(e) => setNewImage_url(e.target.value)}
          value={newImage_url}
          type="text"
          placeholder="Image_url"
          name="newImage_url"
        />
        <Button type="submit" label="Edit Station" className="mt-4" />
      </form>
    </>
  )
}
