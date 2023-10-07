import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'

import StationTable from '@/components/Table/StationTable'
import { Theme } from '@radix-ui/themes'

import { db } from '@/lib/db'

const stations = await db.station.findMany({
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

  // const columnsConfig = [
  //   {
  //     header: 'Name',
  //     accessorKey: 'name',
  //     cellType: 'text',
  //     formConfig: {
  //       placeholder: '',
  //       data: '',
  //     },
  //   },
  //   {
  //     header: 'Type',
  //     accessorKey: 'type',
  //     cellType: 'select',
  //     formConfig: {
  //       placeholder: '',
  //       data: '',
  //     },
  //   },
  //   {
  //     header: 'Sensors',
  //     accessorKey: 'sensors',
  //     cellType: 'multi-select',
  //     objectConfig: {
  //       name: 'sensors',
  //       label: 'identifier',
  //     },
  //     formConfig: {
  //       placeholder: '',
  //       data: '',
  //     },
  //   },
  // ]

  return (
    <Page>
      <PageHeader title="Stations" />
      <Theme>
        <StationTable data={stations} />
      </Theme>
    </Page>
  )
}

export default Home
