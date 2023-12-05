import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'
import SensorForm from '@/components/Form/SensorForm'

async function Home({ params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <PageHeader title={`Seeing add sensor`} showBack />
      <SensorForm></SensorForm>
    </Page>
  )
}

export default Home
