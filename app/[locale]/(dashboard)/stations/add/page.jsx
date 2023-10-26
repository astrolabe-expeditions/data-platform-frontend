import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'
import { StationForm } from '@/components/Form/StationForm'
import { BackpageButton } from '@/components/ui/Button/BackpageButton'
import { db } from '@/lib/db'


async function Home({ params }) {
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
      <BackpageButton></BackpageButton>
      
      <StationForm sensors = {sensors}/>
    </Page>
  )
}

export default Home
