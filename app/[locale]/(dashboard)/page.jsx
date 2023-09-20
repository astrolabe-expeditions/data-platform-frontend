import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'

import BasicTable from '@/components/Table/Table'

async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  const stations = await db.station.findMany({
    select: {
      sensors:true,
      name:true, 
      type: true,
      id: true,
    }
  })

  const mainColumns = [
    {
      header: 'Name',
      accessorKey: 'name',
      footer: 'Name',
      cellType: 'string',
    },
    {
      header: 'Type',
      accessorKey: 'type',
      footer: 'type',
      cellType: 'select',
    },
    {
      header: 'Sensors',
      accessorKey: 'sensors',
      footer: 'Sensors',
      cellType: 'multi-select',
      objectName: 'sensors',
      objectLabel: 'identifier',
    },
  ]

  return (
    <Page>
      <PageHeader title="Stations" />
      <BasicTable 
        data={stations} 
        columns={mainColumns}/>
    </Page>
  )
}

export default Home
