import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'

async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <PageHeader title="Dashboard" />
    </Page>
  )
}

export default Home
