'use client'

import { Table } from '@radix-ui/themes'
import { IconButton } from '../ui/IconButton/IconButton'
import { Edit } from '../ui/Icons'

export default function StationTable({ data }) {
  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Sensors</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.id}>
              <Table.RowHeaderCell>{row.name}</Table.RowHeaderCell>
              <Table.Cell>{row.type}</Table.Cell>
              <Table.Cell>{row.sensors.id}</Table.Cell>
              <Table.Cell>
                <IconButton
                  icon={Edit}
                  size="sm"
                  variant="secondary"></IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
