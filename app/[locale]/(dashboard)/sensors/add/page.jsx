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
      <PageHeader title={`Add a new sensor`} className={'inline-flex pl-5'} />
      <SensorForm></SensorForm>
    </Page>
  )
}

export default Home
