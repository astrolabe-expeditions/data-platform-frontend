import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'
import EditStationForm from '@/components/Form/EditStationForm'
import { Edit } from '@/components/ui/Icons'

const getStationById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/stations/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error('Failed to fetch station')
    const json = await res.json()
    return json
  } catch (error) {
    console.log(error)
  }
}

export default async function EditStation({ params }) {
  const session = await getServerSession(authOptions)
  const { id } = params
  const { station } = await getStationById(id)

  console.log('id: ', id)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <EditStationForm station={station} />
    </Page>
  )
}
