import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import EditSensorForm from '@/components/Form/EditSensorForm'
import { redirect } from 'next/navigation'

const getSensorById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/sensors/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error('Failed to fetch sensor')
    const json = await res.json()
    return json
  } catch (error) {
    console.log(error)
  }
}

export default async function EditSensor({ params }) {
  const session = await getServerSession(authOptions)

  const { id } = params

  const { sensor } = await getSensorById(id)
  console.log('id: ', id)
  console.log('sensor identifier : ', sensor.identifier)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <EditSensorForm sensor={sensor} />
    </Page>
  )
}
