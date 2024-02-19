'use client'

import { Table } from '@radix-ui/themes'
import { useState } from 'react'
import Link from 'next/link'
import ReactPaginate from 'react-paginate'
import { StationTableDropdown } from '../ui/Dropdown/StationTableDropdown'
import '../ui/SearchBar/pagination-style.css'
import { useTranslations as getTranslations } from 'next-intl'

const itemsPerPage = 6

export default function StationTable({ data }) {
  const t = getTranslations('StationTable')

  const [currentPage, setCurrentPage] = useState(0)

  const offset = currentPage * itemsPerPage
  const currentPageData = data.slice(offset, offset + itemsPerPage)

  const pageCount = Math.ceil(data.length / itemsPerPage)

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected)
  }

  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>{t('labels.name')}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{t('labels.type')}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {t('labels.associated_sensors')}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{t('labels.edit')}</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {currentPageData.map((row) => (
            <Table.Row key={row.id}>
              <Table.RowHeaderCell>
                <Link href={`stations/${row.id}`}>{row.name}</Link>
              </Table.RowHeaderCell>
              <Table.Cell>{row.type}</Table.Cell>
              <Table.Cell>
                {row.sensors.map((sensor) => (
                  <div key={sensor.id}>
                    <Link href={`/admin/sensors/${sensor.id}`}>
                      {sensor.identifier}
                    </Link>
                  </div>
                ))}
              </Table.Cell>
              <Table.Cell>
                <StationTableDropdown obj={row}></StationTableDropdown>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  )
}
