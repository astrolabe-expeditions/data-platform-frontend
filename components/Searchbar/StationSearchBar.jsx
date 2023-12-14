'use client'

import { useState, useEffect } from 'react'
import StationTable from '@/components/Table/StationTable'
import { Button } from '../ui/Button/Button'
import { useTranslations as getTranslations } from 'next-intl'
import { PageHeader } from '../Page/PageHeader'
import { Link } from '../ui/Link'

export default function StationSearchbar({ data }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredStations, setFilteredStations] = useState([])
  const [associatedSensors, setAssociatedSensors] = useState([])
  const t = getTranslations('StationTable')

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
  }

  useEffect(() => {
    if (searchTerm !== '') {
      const filteredData = data.filter((station) => {
        const { id, ...rest } = station
        return Object.values(rest).some((value) => {
          console.log(rest.sensors)
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm)
          } else if (typeof value === 'object') {
            console.log(value.sensors)
          }

          return false
        })
      })
      setFilteredStations(filteredData)
    } else {
      setFilteredStations(data)
    }
  }, [searchTerm, data])

  return (
    <div>
      <div>
        <PageHeader title={t('title')} showBack />
        <br />
        <Link href={'/stations/add'} passHref>
          {t('labels.add_station')}
        </Link>
      </div>
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

        {filteredStations && filteredStations.length > 0 && (
          <StationTable data={filteredStations} />
        )}
      </form>
    </div>
  )
}

export { StationSearchbar }
