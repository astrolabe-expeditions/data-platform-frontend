import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'
import { IconButton } from '@/components/ui/IconButton/IconButton'
import { Left } from '@/components/ui/Icons'
import { Link } from '@/components/ui/Link'

async function Home({ params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <PageHeader title={`Seeing edit of id: ${params.id}`} showBack />
    </Page>
  )
}

export default Home
