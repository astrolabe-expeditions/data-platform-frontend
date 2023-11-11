'use client'

import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import { StationTableDropdown } from '../ui/Dropdown/StationTableDropdown'

function formatDate(date) {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = `0${formattedDate.getMonth() + 1}`.slice(-2);
  const day = `0${formattedDate.getDate()}`.slice(-2);
  const hours = `0${formattedDate.getHours()}`.slice(-2);
  const minutes = `0${formattedDate.getMinutes()}`.slice(-2);
  const seconds = `0${formattedDate.getSeconds()}`.slice(-2);
  
  return `${year}-${month}-${day} at ${hours}:${minutes}:${seconds}`;
}

export default function StationTable({ data }) {
    return (
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Identifier</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Measures</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created at</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Last update</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
  
          <Table.Body>
            {data.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.identifier}</Table.Cell>
                <Table.Cell>{row.type}</Table.Cell>
                <Table.Cell>{row.nbr_measures}</Table.Cell>
                <Table.Cell>{formatDate(row.created_at)}</Table.Cell>
                <Table.Cell>{formatDate(row.updated_at)}</Table.Cell>
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
  