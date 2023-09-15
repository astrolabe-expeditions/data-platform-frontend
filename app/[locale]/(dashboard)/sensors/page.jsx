import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'

export default async function Sensors() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  const sensors = await db.sensor.findMany({
    select: {
      id: true,
      identifier: true,
    },
  })

  return (
    <Page>
      <PageHeader title="Capteurs" />
      <ul>
        {sensors.map(({ id, identifier }) => (
          <li key={id}>{identifier}</li>
        ))}
      </ul>
    </Page>
  )
}
