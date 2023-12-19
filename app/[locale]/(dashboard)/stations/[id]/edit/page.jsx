import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import EditStationForm from '@/components/Form/EditStationForm'
import NotFound from '@components/404'

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
  try {
    const { station } = await getStationById(id)

    if (!session) {
      redirect('/auth/login')
    }

    return (
      <Page>
        <EditStationForm station={station} />
      </Page>
    )
  } catch (error) {
    if (error.message === 'Station not found') {
      // Redirect to 404 page
      redirect('/404')
    } else {
      // Handle other errors
      console.error(error)
      return (
        <Page>
          <NotFound errorMessage={'Station Not Found'} />
        </Page>
      )
    }
  }
}
