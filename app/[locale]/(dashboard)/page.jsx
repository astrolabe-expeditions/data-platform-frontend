import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'

import BasicTable from '@/components/Table/Table'
import { BasicForm } from '@/components/Form/Form'

async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  //const stations = await getData()

  const columnsConfig = [
    {
      header: 'Name',
      accessorKey: 'name',
      cellType: 'text',
      formConfig: {
        placeholder: '',
        data: '',
      },
    },
    {
      header: 'Type',
      accessorKey: 'type',
      cellType: 'select',
      formConfig: {
        placeholder: '',
        data: '',
      },
    },
    {
      header: 'Sensors',
      accessorKey: 'sensors',
      cellType: 'multi-select',
      objectConfig: {
        name: 'sensors',
        label: 'identifier',
      },
      formConfig: {
        placeholder: '',
        data: '',
      },
    },
  ]

  return (
    <Page>
      <PageHeader title="Stations" />
      <BasicForm columns={columnsConfig} />
      <BasicTable data={stations} columns={mainColumns} />
    </Page>
  )
}

export default Home
