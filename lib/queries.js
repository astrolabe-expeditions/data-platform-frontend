export const registerUser = async (formData) => {
  const response = await fetch('/api/v1/register', {
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
  const res = await fetch(`/api/v1/sensors/${formData.id}`, {
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
  const res = await fetch(`/api/v1/stations/${formData.id}`, {
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

  const res = await fetch(`/api/v1/sensors/${data.sensorId}/files`, {
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
  const res = await fetch(`/api/v1/sensors/${id}`)
  const content = await res.json()
  if (!res.ok) {
    throw new Error('Failed to fetch sensor')
  }
  return content.sensor
}

export const findStationById = async (id) => {
  const res = await fetch(`/api/v1/stations/${id}`)
  const content = await res.json()
  if (!res.ok) {
    throw new Error('Failed to fetch sensor')
  }
  return content.station
}

export const processFile = async ({ fileId, sensorId }) => {
  const res = await fetch(`/api/v1/sensors/${sensorId}/files/${fileId}/process`)
  const content = await res.json()
  if (!res.ok) {
    throw new Error('Failed to process file')
  }
  return content
}

export const getSensorShareToken = async (sensorId) => {
  const res = await fetch(`/api/v1/sensors/share`, {
    method: 'POST',
    body: JSON.stringify({
      sensorId,
    }),
  })

  const content = await res.json()
  if (!res.ok) {
    throw new Error('Failed to process share')
  }
  return content
}

export const findSensorByShareToken = async (token) => {
  const res = await fetch(`/api/v1/sensors/share?token=${token}`)
  const { data } = await res.json()
  if (!res.ok) {
    throw new Error('Failed to fetch sensor')
  }
  return data
}
