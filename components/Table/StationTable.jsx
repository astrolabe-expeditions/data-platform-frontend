'use client'

import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import { StationTableDropdown } from '../ui/Dropdown/StationTableDropdown'

export default function StationTable({ data }) {
  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Associated sensors</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.id}>
              <Table.RowHeaderCell>{row.name}</Table.RowHeaderCell>
              <Table.Cell>{row.type}</Table.Cell>
              <Table.Cell>
                {row.sensors.map((sensor) => (
                  <div key={sensor.id}>
                    <Link href={`/sensors/${sensor.id}`}>
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
    </div>
  )
}
