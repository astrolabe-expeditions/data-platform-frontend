import NextLink from 'next/link'
import { useTranslations as getTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button/Button'
import { Link } from '@/components/ui/Link'
import { Typography } from '@/components/ui/Typography'
import { SignupForm } from './components/form'

export default function Signup() {
  const t = getTranslations('Signup')

  return (
    <>
      <Typography variant="title" alignCenter className="mb-3">
        {t('title')}
      </Typography>
      <Typography variant="subtitle" alignCenter className="mb-8">
        {t('subtitle')}
      </Typography>
      <SignupForm />
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
