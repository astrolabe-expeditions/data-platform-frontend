'use client'
import { IconButton } from '../ui/IconButton/IconButton'
import { Typography } from '../ui/Typography'
import { useRouter } from 'next/navigation'
import { Left } from '../ui/Icons'
import clsx from 'clsx'

const PageHeader = ({ title, className, showBack }) => {
  const router = useRouter()
  return (
    <header className={clsx(className, 'mb-8 inline-flex')}>
      {showBack ? (
        <IconButton
          icon={Left}
          label={'retour'}
          variant={null}
          className={'border-white shadow-white'}
          onClick={() => router.back()}></IconButton>
      ) : null}
      <Typography variant="title" className={'ml-5'}>
        {title}
      </Typography>
    </header>
  )
}

export { PageHeader }
