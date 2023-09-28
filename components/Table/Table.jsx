'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Button } from '../ui/Button/Button'
import { Edit, Trash } from '../ui/Icons'
import { CRUD } from '@/lib/crud'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function BasicTable({ data, url, columns }) {
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')

  const router = useRouter()
  const crud = new CRUD(url)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  })

  const returnCellTable = function (cell) {
    var cellType = cell.column.columnDef.cellType

    if (cellType === 'multi-select') {
      var objectConfig = cell.column.columnDef.objectConfig

      return (
        <td key={cell.id}>
          {cell.row.original[objectConfig.name].map((obj) => (
            <Button
              label={obj[objectConfig.label]}
              variant="tag"
              key={obj[objectConfig.label]}></Button>
          ))}
        </td>
      )
    } else if (cellType === 'select') {
      return (
        <td key={cell.id} className="whitespace-nowrap px-6 py-4">
          <Button
            label={cell.row.original.type}
            variant="tag"
            disabled={true}></Button>
        </td>
      )
    } else {
      return (
        <td key={cell.id} className="whitespace-nowrap px-6 py-4">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      )
    }
  }

  return (
    <div>
      {/* <input classNameName='border-color: rgb(0 0 0);'
          type='text'
          value={filtering}
          onChange={e => setFiltering(e.target.value)}
        /> */}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-md font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          scope="col"
                          className="px-6 py-4">
                          {header.isPlaceholder ? null : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              {
                                { asc: ' 🔼', desc: ' 🔽' }[
                                  header.column.getIsSorted() ?? null
                                ]
                              }
                            </div>
                          )}
                        </th>
                      ))}
                      <th>Edit</th>
                      <th>Remove</th>
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                      {row
                        .getVisibleCells()
                        .map((cell) => returnCellTable(cell))}
                      <td className="whitespace-nowrap px-6 py-4">
                        <Button
                          label={'Edit'}
                          // starticon={Edit}
                          variant="tag"
                          onClick={() =>
                            router.push(`/${row.original.id}`)
                          }></Button>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Button
                          label={'Remove'}
                          // startIcon={Trash}
                          variant="tag"
                          onClick={(e) =>
                            crud.remove(row.original.id)
                          }></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          label={'First Page'}
          onClick={() => table.setPageIndex(0)}
          size="sm"
          variant="secondary"></Button>
        <Button
          label={'Previous Page'}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          size="sm"
          variant="secondary"></Button>
        <Button
          label={'Next Page'}
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          size="sm"
          variant="secondary"></Button>
        <Button
          label={'Last Page'}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          size="sm"
          variant="secondary"></Button>
      </div>
    </div>
  )
}
