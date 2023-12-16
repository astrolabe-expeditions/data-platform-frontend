import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { SensorView } from '@/components/View/ViewSensor'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

async function Home({ params }) {
  const session = await getServerSession(authOptions)
  const sensor = await db.sensor.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      identifier: true,
      station: true,
      files: true,
      type: true,
      nbr_measures: true,
      records: true,
    },
  })

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <SensorView sensor={sensor}></SensorView>
    </Page>
  )
}

export default Home
