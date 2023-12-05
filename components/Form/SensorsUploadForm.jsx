'use client'
import { useTranslations as getTranslations } from 'next-intl'
import { useState } from 'react'
import { useRef } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { PageHeader } from '@/components/Page/PageHeader'
import { SensorCard } from '../Card/SensorCard'
import { useRouter } from 'next/navigation'

export default function SensorsUploadForm({ sensor }) {
  const t = getTranslations('Sensors')
  const router = useRouter()

  const hiddenFileInput = useRef(null)
  const [formData, setFormData] = useState({
    file: null,
  })

  const handleInputChange = function (event) {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]

      if (i.type !== 'text/csv') {
        console.log('Wrong format')
      } else {
        setFormData({ ...formData, file: i })
        sendData(i, sensor.id)
      }
    }
  }

  const handleClick = (event) => {
    hiddenFileInput.current.click()
  }

  const sendData = function (i, sensor_id) {
    var fd = new FormData()
    fd.append('file', i)
    fd.append('sensor_id', sensor.id)

    try {
      const res = fetch(`/api/sensors/${sensor_id}`, {
        method: 'POST',
        body: fd,
      }).then((_res) => {
        console.log(_res)
        router.refresh()
      })
    } catch (error) {
      console.error(error)
    }
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
    </>
  )
}
