'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import { useTranslations as getTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { Link } from '@/components/ui/Link'
import { Typography } from '@/components/ui/Typography'
import { signIn } from 'next-auth/react'

export default function Login() {
  const t = getTranslations('Login')
  const router = useRouter()

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

    const res = await signIn('credentials', {
      ...formData,
      redirect: false,
    })
    if (res?.status == 200) {
      router.push('/')
    } else {
      console.log(res)
      console.error('Login failed')
    }
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
        <Button type="submit" label={t('login')} />
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
        {t('no_account')}{' '}
        <Link variant="body2" href="/auth/signup" as={NextLink}>
          {t('no_account_link')}
        </Link>
      </Typography>
    </>
  )
}
