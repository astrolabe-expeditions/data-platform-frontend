import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'

import SensorSearchBar from '@/components/Searchbar/SensorSearchBar'
import { Theme } from '@radix-ui/themes'

import { db } from '@/lib/db'
import { Link } from '@/components/ui/Link'

const sensors = await db.sensor.findMany({
  select: {
    id: true,
    identifier: true,
    type: true,
    nbr_measures: true,
    created_at: true,
    updated_at: true
  },
})


async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <PageHeader title={'Capteurs'} showBack />
      <ul>
        {sensors.map(({ id, identifier }) => (
          <li key={id}>{identifier}</li>
        ))}
      </ul>
    </Page>
  )
}

export default Home
