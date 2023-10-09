import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'
import { StationForm } from '@/components/Form/StationForm'
import { BackpageButton } from '@/components/ui/Button/BackpageButton'
async function Home({ params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <BackpageButton></BackpageButton>
      <PageHeader title={`Add Station`} className={'inline-flex pl-5'} />
      <StationForm />
    </Page>
  )
}

export default Home
