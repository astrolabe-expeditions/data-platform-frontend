import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

export const uploadFile = async function (file) {
  console.log('process.env.SCW_ACCESS_KEY_ID', process.env.SCW_ACCESS_KEY_ID)
  const config = {
    region: process.env.REGION || 'fr-par',
    endpoint: process.env.ENDPOINT || 'https://s3.fr-par.scw.cloud',
    credentials: {
      accessKeyId: process.env.SCW_ACCESS_KEY_ID || 'your access id',
      secretAccessKey: process.env.SCW_SECRET_ACCESS_KEY || 'your access key',
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

  const params = {
    Bucket: 'astrolabe-expeditions-data',
    Key: filename,
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
