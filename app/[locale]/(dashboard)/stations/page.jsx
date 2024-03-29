import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import StationSearchBar from '@/components/Searchbar/StationSearchBar'
import { db } from '@/lib/db'

async function StationList() {
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

  return (
    <Page>
      <StationSearchBar data={stations} />
    </Page>
  )
}

export default StationList
