import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'

import SensorSearchBar from '@/components/Searchbar/SensorSearchBar'

import { db } from '@/lib/db'

const sensors = await db.sensor.findMany({
  where: {
    deleted: false,
  },
  select: {
    id: true,
    identifier: true,
    type: true,
    nbr_measures: true,
    created_at: true,
    updated_at: true,
  },
})

async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <SensorSearchBar data={sensors} />
    </Page>
  )
}

export default Home
