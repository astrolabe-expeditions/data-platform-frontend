'use client'

import { FilesSection } from '@/components/View/FileSection'

const SensorView = ({ sensor }) => {
  return <FilesSection files={sensor.files} sensorId={sensor.id} />
}

export { SensorView }
