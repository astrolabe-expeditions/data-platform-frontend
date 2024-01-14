'use client'

import { SensorCard } from '@/components/Card/SensorCard'
import { FilesSection } from '@/components/View/FileSection'

const SensorView = ({ sensor }) => {
  return (
    <>
      <SensorCard sensor={sensor}></SensorCard>
      <FilesSection files={sensor.files} sensorId={sensor.id} />
    </>
  )
}

export { SensorView }
