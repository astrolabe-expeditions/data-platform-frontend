'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'

import { PageHeader } from '@/components/Page/PageHeader'
import { SensorType } from '@prisma/client'
import { useTranslations as getTranslations } from 'next-intl'

import Select from 'react-select'

export default function AddSensor() {
  const t = getTranslations('AddSensor')

  const router = useRouter()

  const [formData, setFormData] = useState({
    identifier: '',
    type: '',
    nbr_measures: '',
  })

  const [selectedType, setSelectedType] = useState() // React state to manage selected type

  const handleChange = (inputName) => (evt) => {
    setFormData({
      ...formData,
      [inputName]: evt.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.identifier || !formData.type || !formData.nbr_measures) {
      alert('Please fill all fields')
      return
    }

    try {
      const res = await fetch('http://localhost:3000/api/sensors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: formData.identifier,
          type: formData.type,
          nbr_measures: parseInt(formData.nbr_measures),
        }),
      })
      if (res.ok) {
        router.push('/sensors')
      } else {
        throw new Error('Failed to add sensor')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Array of all sensor's types
  const typeList = Object.values(SensorType).map((value) => ({
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

  return (
    <>
      <PageHeader title={t('title')} showBack />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xl">
        <Input
          label={t('labels.identifier')}
          value={formData.identifier}
          onChange={handleChange('identifier')}
          type="text"
          placeholder={t('labels.identifier')}
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

        <Input
          label={t('labels.nbr_measures')}
          value={formData.nbr_measures}
          onChange={handleChange('nbr_measures')}
          type="text"
          placeholder={t('labels.nbr_measures')}
          name="nbr_measures"
        />
        <Button type="submit" label={t('add_sensor')} className="mt-4" />
      </form>
    </>
  )
}
