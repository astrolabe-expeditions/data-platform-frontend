'use client'

import { useState, useEffect } from 'react'
import SensorTable from '@/components/Table/SensorTable'
import { useTranslations as getTranslations } from 'next-intl'
import { PageHeader } from '../Page/PageHeader'
import Link from 'next/link'

export default function SensorSearchbar({ data }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSensors, setFilteredSensors] = useState([])

  const t = getTranslations('SensorsTable')

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
      <PageHeader title={t('title')} showBack />
      <br />
      <Link href={'/sensors/add'} passHref>
        {t('labels.add_sensor')}
      </Link>

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
