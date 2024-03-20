'use client'

import { useRef } from 'react'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useQuery, useMutation } from '@tanstack/react-query'

import { findSensorByShareToken, uploadFile } from '@/lib/queries'
import { Button } from '@/components/ui/Button/Button'

function Upload() {
  const t = useTranslations('Upload')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const { data } = useQuery({
    queryKey: ['sensors', 'share', token],
    queryFn: () => findSensorByShareToken(token),
  })

  const hiddenFileInput = useRef(null)

  const { mutate, isError, error } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      queryClient.setQueryData(['sensors', data.id], data)
    },
  })

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const handleInputChange = function (event) {
    if (event?.target?.files?.length > 0) {
      mutate({ file: event.target.files[0], sensorId: data.id })
    }
  }

  return (
    <div>
      <h1>Upload a new file</h1>
      <form>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleInputChange}
          style={{ display: 'none' }}
          accept=".csv"
        />
        <Button
          onClick={handleClick}
          label={t('upload')}
          variant="link"
          colorScheme="primary"
        />
      </form>
    </div>
  )
}

export default Upload
