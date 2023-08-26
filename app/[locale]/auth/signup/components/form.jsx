'use client'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { useTranslations as getTranslations } from 'next-intl'

const SignupForm = () => {
  const t = getTranslations('Signup')

  return (
    <form className="flex flex-col gap-3 w-full">
      <Input type="text" name="name" label={t('labels.name')} />
      <Input type="email" name="email" label={t('labels.email')} />
      <Input type="password" name="password" label={t('labels.password')} />
      <Button type="submit" label={t('signup')} />
    </form>
  )
}

export { SignupForm }
