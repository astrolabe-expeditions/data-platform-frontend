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
  const res = await fetch(`http://localhost:3000/api/sensors/${formData.id}`, {
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
  const res = await fetch(`http://localhost:3000/api/stations/${formData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.name,
      type: formData.type,
      longitude: formData.longitude.toString(),
      latitude: formData.latitude.toString(),
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
