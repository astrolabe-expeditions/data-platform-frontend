'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import { useTranslations } from 'next-intl'
import { useMutation } from '@tanstack/react-query'

import { registerUser } from '@/lib/queries'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { Link } from '@/components/ui/Link'
import { Typography } from '@/components/ui/Typography'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'

export default function Signup() {
  const t = useTranslations('Signup')

  const { mutate, isError, error } = useMutation({ mutationFn: registerUser })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (inputName) => (evt) => {
    setFormData({
      ...formData,
      [inputName]: evt.target.value,
    })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    mutate(formData)
  }

  return (
    <>
      <Typography variant="title" alignCenter className="mb-3">
        {t('title')}
      </Typography>
      <Typography variant="subtitle" alignCenter className="mb-8">
        {t('subtitle')}
      </Typography>
      <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
        {isError ? (
          <Alert variant="destructive">
            <AlertTitle>{t('error_alert.title')}</AlertTitle>
            <AlertDescription>
              {t(`error_alert.errors.${error}`)}
            </AlertDescription>
          </Alert>
        ) : null}
        <Input
          type="text"
          name="name"
          label={t('labels.name')}
          value={formData.name}
          onChange={handleChange('name')}
        />
        <Input
          type="email"
          name="email"
          label={t('labels.email')}
          value={formData.email}
          onChange={handleChange('email')}
        />
        <Input
          type="password"
          name="password"
          label={t('labels.password')}
          value={formData.password}
          onChange={handleChange('password')}
        />
        <Button type="submit" label={t('signup')} />
      </form>
      <Button
        variant="secondary"
        label={t('github')}
        className="mt-4"
        fullWidth
      />
      <Typography
        variant="body2"
        color="textSecondary"
        className="mt-8"
        alignCenter>
        {t('already_signup')}{' '}
        <Link variant="body2" href="/auth/login" as={NextLink}>
          {t('already_signup_link')}
        </Link>
      </Typography>
    </>
  )
}
