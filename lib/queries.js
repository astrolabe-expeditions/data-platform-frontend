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

// export const editStation = async (id, formData) => {
//   const response = await fetch(`/api/stations/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(formData),
//   })
//   const content = await response.json()
//   if (!response.ok) {
//     throw content.error
//   }
//   return content
// }

export const editStation = async (id, formData) => {
  try {
    const res = await fetch(`http://localhost:3000/api/stations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        type: formData.type,
        // longitude: formData.longitude,
        logitude: parseFloat(formData.longitude),
        // latitude: formData.latitude,
        latitude: parseFloat(formData.latitude),
        description: formData.description,
        image_url: formData.image_url,
        // sensors: formData.sensors,
      }),
    })
    if (!res.ok) throw new Error('Failed to update station')
    router.refresh()
    router.push('/stations')
  } catch (error) {
    console.log(error)
  }
}

// export const editSensor = async (id, formData) => {
//   const response = await fetch(`/api/sensors/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(formData),
//   })
//   const content = await response.json()
//   if (!response.ok) {
//     throw content.error
//   }
//   return content
// }

export const editSensor = async (id, formData) => {
  try {
    const res = await fetch(`http://localhost:3000/api/sensors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: formData.identifier,
        type: formData.type,
        nbr_measures: parseInt(formData.nbr_measures),
        // station_id: formData.station_id,
        // records: formData.records,
        // files: formData.files,
      }),
    })
    if (!res.ok) throw new Error('Failed to update sensor')
    router.refresh()
    router.push('/sensors')
  } catch (error) {
    console.log(error)
  }
}
