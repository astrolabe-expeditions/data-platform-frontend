import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

const uploadFile = async function (file, file_id, sensor_id) {
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

const createKeyInDatabase = async function (_file, sensor_id) {
  const file = await db.file.create({
    data: {
      name: _file.name,
      status: 'Active',
      created_at: new Date(),
      sensor_id: sensor_id,
    },
  })
  return file.id
}

export async function POST(request) {
  const data = await request.formData()
  const file = data.get('file')
  const sensor_id = data.get('sensor_id')

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const file_id = await createKeyInDatabase(file, sensor_id)
  uploadFile(file, file_id, sensor_id)

  return NextResponse.json({ success: true, file_id: file_id })
}
