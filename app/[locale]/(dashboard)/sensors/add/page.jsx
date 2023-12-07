import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { Page } from '@/components/Page/Page'
import AddSensorForm from '@/components/Form/AddSensorForm'


export default async function AddSensor() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <Page>
      <AddSensorForm />
    </Page>
  )
}
