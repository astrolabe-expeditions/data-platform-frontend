import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'
import { Link } from '@/components/ui/Link'

async function Home({ params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <BackpageButton></BackpageButton>
      <PageHeader
        title={`Seeing id of station: ${params.id}`}
        className={'inline-flex pl-5'}
      />
    </Page>
  )
}

export default Home
