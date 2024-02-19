'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import SensorTable from '@/components/Table/SensorTable'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/Page/PageHeader'

export default function SensorSearchbar({ data }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSensors, setFilteredSensors] = useState([])

  const t = useTranslations('SensorsTable')

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
  }

  useEffect(() => {
    if (searchTerm !== '') {
      const filteredData = data.filter((sensor) => {
        const { id, ...rest } = sensor
        return Object.values(rest).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm)
          }
          return false
        })
      })
      setFilteredSensors(filteredData)
    } else {
      setFilteredSensors(data)
    }
  }, [searchTerm, data])

  return (
    <div>
      <PageHeader
        title={t('title')}
        showBack
        actions={
          <Button
            href="/admin/sensors/add"
            component={Link}
            label={t('labels.add_sensor')}
          />
        }
      />
      <form>
        <input
          className="search"
          name="searchTerm"
          value={searchTerm}
          onChange={handleSearch}
          type="text"
          required
          placeholder={t('labels.search')}></input>
        <button className="search-btn">{t('labels.search')}</button>

        {filteredSensors && filteredSensors.length > 0 && (
          <SensorTable data={filteredSensors} />
        )}
      </form>
    </div>
  )
}

export { SensorSearchbar }
