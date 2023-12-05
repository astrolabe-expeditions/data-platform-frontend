import { Page } from '@/components/Page/Page'
import { db } from '@/lib/db'
import SensorsUploadForm from '@/components/Form/SensorsUploadForm'

export default async function Home({ params }) {
  const sensor = await db.sensor.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      identifier: true,
      station: true,
      files: true,
      type: true,
      nbr_measures: true,
      records: true,
    },
  })
  return (
    <Page>
      <SensorsUploadForm sensor={sensor}></SensorsUploadForm>
    </Page>
  )
}
