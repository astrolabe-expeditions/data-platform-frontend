'use client'

import { useTranslations as getTranslations } from 'next-intl'
import { useState } from 'react'
import { useRef } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { Typography } from '@/components/ui/Typography'
import { PageHeader } from '@/components/Page/PageHeader'
import { SensorCard } from '@/components/Card/SensorCard'
import { Alert, AlertTitle, AlertDescription } from '../ui/Alert'

export default function SensorsUploadForm({ sensor }) {
  const t = getTranslations('Sensors')

  const hiddenFileInput = useRef(null)
  const [formData, setFormData] = useState({
    file: null,
  })

  const handleInputChange = async function (event) {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]
      setFormData({ ...formData, file: i })

      var fd = new FormData()
      fd.append('file', i)
      fd.append('sensor_id', sensor.id)

      try {
        const res = await fetch('/api/sensors', {
          method: 'POST',
          body: fd,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleClick = (event) => {
    hiddenFileInput.current.click()
  }

  return (
    <>
      <PageHeader title={t('upload_screen.upload_file')} showBack />
      <SensorCard sensor={sensor} />
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />

      <Button
        onClick={handleClick}
        label={t('upload_screen.upload_file_for_sensor')}
      />
      {formData.file !== null && (
        <>
          <div>
            <Typography>{formData.file.name}</Typography>
            <Typography>{formData.file.size}</Typography>
          </div>
        </>
      )}
    </>
  )
}
