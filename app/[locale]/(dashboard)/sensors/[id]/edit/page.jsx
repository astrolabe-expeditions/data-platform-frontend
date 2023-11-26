import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'
import { BackpageButton } from '@/components/ui/Button/BackpageButton'
import EditSensorForm from '@/components/Form/EditSensorForm'
import { Edit } from '@/components/ui/Icons'

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
  // const { identifier, type, nbr_measures, station_id, records, files } = sensor
  // const { identifier, type, station_id } = sensor
  const { identifier, type } = sensor
  console.log('id: ', id)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <BackpageButton></BackpageButton>
      <EditSensorForm
        id={id}
        identifier={identifier}
        type={type}
        // nbr_measures={nbr_measures}
        // station_id={station_id}
        // records={records}
        // files={files}
      />
    </Page>
  )
}
