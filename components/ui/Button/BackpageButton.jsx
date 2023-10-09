'use client'

import { IconButton } from '../IconButton/IconButton'
import { Left } from '../Icons'
import { useRouter } from 'next/navigation'

const BackpageButton = ({}) => {
  const router = useRouter()
  return (
    <IconButton
      icon={Left}
      label={'retour'}
      variant="secondary"
      className={'inline-flex'}
      onClick={() => router.back()}></IconButton>
  )
}

export { BackpageButton }
