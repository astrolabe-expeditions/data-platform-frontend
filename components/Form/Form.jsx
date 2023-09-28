'use client'
import { Button } from '../ui/Button/Button'
import React, { useState } from 'react'

const returnFormElement = function (columnConfig) {
  switch (columnConfig.cellType) {
    case 'text':
      return (
        <div
          key={columnConfig.accessorKey}
          className="w-240 md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name">
            {columnConfig.header}
          </label>
          <input
            key={columnConfig.id}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Jane"
          />
        </div>
      )
      break
    case 'select':
      return (
        <div
          key={columnConfig.accessorKey}
          className="inline-block relative w-100">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name">
            {columnConfig.header}
          </label>
          <select
            key={columnConfig.id}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-700">
            <option>
              Really long option that will likely overlap the chevron
            </option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      )
      break
    case 'multi-select':
      return (
        <div
          key={columnConfig.accessorKey}
          className="inline-block relative pl-3 w-96">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name">
            {columnConfig.header}
          </label>
          <select
            key={columnConfig.id}
            multiple
            className="block appearance-none w-full bg-gray-200 border border-gray-200 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-700">
            <option value="3">AS323455</option>
          </select>
        </div>
      )
    default:
      return null
      break
  }
}

const BasicForm = ({ columns }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    sensors: '',
  })

  const handleInput = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }))
  }

  const submitForm = (e) => {
    // We don't want the page to refresh
    e.preventDefault()

    const formURL = e.target.action
    const data = new FormData()

    // Turn our formData state into data we can use with a form submission
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value)
    })

    // POST the data to the URL of the form
    fetch(formURL, {
      method: 'POST',
      body: data,
      headers: {
        accept: 'application/json',
      },
    }).then(() => {
      setFormData({
        name: '',
        email: '',
        message: '',
      })
    })
  }

  return (
    <form
      className="w-full max-w-lg"
      method="POST"
      action="/felipe"
      onSubmit={submitForm}>
      <div className="flex flex-nowrap -mx-3 mb-6">
        {columns.map((column) => returnFormElement(column))}
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 items-end">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2 display:none"
            htmlFor="grid-first-name">
            DISPLAYNONE
          </label>
          <Button label={'Insert'}></Button>
        </div>
      </div>
    </form>
  )
}

export { BasicForm }
