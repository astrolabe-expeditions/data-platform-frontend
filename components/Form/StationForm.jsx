'use client'
import React, { useState } from 'react'
import { Input } from '../ui/Input/Input'
import { Select } from '../ui/Select/Select'
import { Button } from '../ui/Button/Button'

const StationForm = ({ columns }) => {
  return (
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <Input label={'Name'}></Input>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <Select label={'Type'}></Select>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <Select label={'Sensors'}></Select>
        </div>
      </div>
      <Button label={'Add station'} />
    </form>
  )
}

export { StationForm }
