export const registerUser = async (formData) => {
  const response = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(formData),
  })
  const content = await response.json()
  if (!response.ok) {
    throw content.error
  }
  return content
}

export const editSensor = async (formData) => {
  const res = await fetch(`/api/sensors/${formData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: formData.identifier,
      type: formData.type,
      nbr_measures: parseInt(formData.nbr_measures),
    }),
  })

  const content = await res.json()
  if (!res.ok) {
    throw new Error('Failed to update Sensor')
  }
  return content
}

export const editStation = async (formData) => {
  const res = await fetch(`/api/stations/${formData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.name,
      type: formData.type,
      longitude: formData.longitude ? formData.longitude.toString() : null,
      latitude: formData.latitude ? formData.latitude.toString() : null,
      description: formData.description,
      image_url: formData.image_url,
      sensors: {
        set: formData.sensors.map((sensor) => ({ id: sensor.id })),
      },
    }),
  })

  const content = await res.json()
  if (!res.ok) {
    throw new Error('Failed to update Station')
  }
  return content
}

export const uploadFile = async (data) => {
  const formData = new FormData()
  formData.append('file', data.file)
  formData.append('sensor_id', data.sensorId)

  const res = await fetch(`/api/sensors/${data.sensorId}/files`, {
    method: 'POST',
    body: formData,
  })

  const content = await res.json()
  if (!res.ok) {
    throw new Error('Failed to upload file')
  }
  return content.data
}

export const findSensorById = async (id) => {
  const res = await fetch(`/api/sensors/${id}`)
  const content = await res.json()
  if (!res.ok) {
    throw new Error('Failed to fetch sensor')
  }
  return content.sensor
}

export const findStationById = async (id) => {
  const res = await fetch(`/api/stations/${id}`)
  const content = await res.json()
  if (!res.ok) {
    throw new Error('Failed to fetch sensor')
  }
  return content.station
}

export const processFile = async (fileId, sensorId) => {
  const res = await fetch(`/api/${sensorId}/files/${fileId}/process`)
  const content = await res.json()
  if (!res.ok) {
    throw new Error('Failed to process file')
  }
  return content
}
