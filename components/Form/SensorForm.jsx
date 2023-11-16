'use client'
import { useState } from 'react'
import NextLink from 'next/link'
import { useTranslations as getTranslations } from 'next-intl'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { Link } from '@/components/ui/Link'
import { Typography } from '@/components/ui/Typography'
import { signIn } from 'next-auth/react'
import { Select } from '../ui/Select/Select'



export default function SensorForm() {
    const t = getTranslations('SensorForm')
  
    const [formData, setFormData] = useState({
      identifier : '',
      type: '',
      nbr_measures: '',
    })
  
    const handleChange = (inputName) => (evt) => {
      setFormData({
        ...formData,
        [inputName]: evt.target.value,
      })
    }
  
    const handleSubmit = (evt) => {
      evt.preventDefault()
      signIn('credentials', {
        ...formData,
        callbackUrl: '/',
      })
    }
  
    return (
        <>
         <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <Input label={t('name')}></Input>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <Input label={t('identifier')}></Input>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <Select label={t('type')}>
            <option value = ''> </option>
            <option value ='LittObs'>LittObs</option>
            <option value ='SensOcean'>SensOcean</option>
          </Select>
        </div>
      </div>
      <Button label={t('create')} />
    </form> 

        </>
    )
} 











   