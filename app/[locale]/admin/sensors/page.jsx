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
  return (
    <Page>
      <SensorSearchBar data={sensors} />
    </Page>
  )
}

export default Home
