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
              <Table.ColumnHeaderCell>Identifier</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Measures</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
  
          <Table.Body>
            {data.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.identifier}</Table.Cell>
                <Table.Cell>{row.type}</Table.Cell>
                <Table.Cell>{row.nbr_measures}</Table.Cell>
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
  