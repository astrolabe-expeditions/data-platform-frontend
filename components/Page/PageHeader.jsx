'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

import { Typography } from '../ui/Typography'
import { Left } from '../ui/Icons'
import { Button } from '../ui/Button'

const PageHeader = ({ title, subtitle, className, showBack, actions }) => {
  const t = useTranslations('PageHeader')
  const router = useRouter()

  return (
    <header className={clsx(className, 'mb-8 flex flex-col')}>
      {showBack ? (
        <Button
          leftIcon={Left}
          variant="link"
          colorScheme="gray"
          label={t('back')}
          onClick={() => router.back()}
          className="mb-5"
        />
      ) : null}
      <div className="flex flex-col items-start md:flex-row md:items-center">
        {typeof title === 'string' ? (
          <Typography variant="title">{title}</Typography>
        ) : (
          title
        )}
        {actions ? (
          <div className="md:ml-auto md:mt-0 mt-4">{actions}</div>
        ) : null}
      </div>
      {subtitle ? (
        <div className="mt-1">
          <Typography variant="subtitle">{subtitle}</Typography>
        </div>
      ) : null}
    </header>
  )
}

export { PageHeader }
