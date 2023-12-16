import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import AddStationForm from '@/components/Form/AddStationForm'

export default async function AddStation() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <AddStationForm />
    </Page>
  )
}
