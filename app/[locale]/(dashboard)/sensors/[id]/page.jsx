import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import { PageHeader } from '@/components/Page/PageHeader'
import { IconButton } from '@/components/ui/IconButton/IconButton'
import { Left } from '@/components/ui/Icons'
import { Link } from '@/components/ui/Link'
import { redirect } from 'next/navigation'

async function Home({ params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <IconButton icon={Left} variant="secondary">
        <Link href={'/sensors'}></Link>
      </IconButton>
      <PageHeader title={`Seeing id of sensors: ${params.id}`} />
    </Page>
  )
}

export default Home
