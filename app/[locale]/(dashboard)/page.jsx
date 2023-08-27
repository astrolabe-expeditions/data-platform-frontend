import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'

async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  const stations = await db.station.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  return (
    <Page>
      <PageHeader title="Stations" />
      <ul>
        {stations.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </Page>
  )
}

export default Home
