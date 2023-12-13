import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import StationSearchBar from '@/components/Searchbar/StationSearchBar'
import { Theme } from '@radix-ui/themes'
import { db } from '@/lib/db'

const stations = await db.station.findMany({
  where: {
    deleted: false,
  },
  select: {
    sensors: true,
    name: true,
    type: true,
    id: true,
  },
})

async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <Theme>
        <StationSearchBar data={stations} />
      </Theme>
    </Page>
  )
}

export default Home
