import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { db } from '@/lib/db'

export const uploadFile = async function (file, file_id, sensor_id) {
  const config = {
    region: process.env.REGION || 'fr-par',
    endpoint: process.env.ENDPOINT || 'https://s3.fr-par.scw.cloud',
    credentials: {
      accessKeyId: process.env.SCW_ACCESS_KEY_ID,
      secretAccessKey: process.env.SCW_SECRET_ACCESS_KEY,
    },
  }

  const client = new S3({
    endpoint: config.endpoint,
    region: config.region,
    credentials: {
      accessKeyId: config.credentials.accessKeyId,
      secretAccessKey: config.credentials.secretAccessKey,
    },
  })

  const filename = file.name
  const fileContent = file
  const filePath = `sensors/${sensor_id}/${file_id}.csv`

  const params = {
    Bucket: 'astrolabe-expeditions-data',
    Key: filePath,
    Body: fileContent,
  }

  const upload = new Upload({
    client,
    params: {
      ...params,
    },
  })
  await upload.done()
}

export const createKeyInDatabase = async function (_file, sensor_id) {
  const file = await db.file.create({
    data: {
      name: _file.name,
      status: 'to_process',
      created_at: new Date(),
      //created_by: 'TODO: user_id',
      sensor_id: sensor_id,
      updated_at: null,
    },
  })
  return file.id
}
