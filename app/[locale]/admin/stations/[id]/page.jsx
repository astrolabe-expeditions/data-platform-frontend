import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { db } from '@/lib/db'
import { StationView } from '@/components/View/ViewStation'

async function Home({ params }) {
  const session = await getServerSession(authOptions)

  const station = await db.station.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <StationView station={station}></StationView>
    </Page>
  )
}

export default Home
