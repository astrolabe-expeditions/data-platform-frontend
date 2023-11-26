import { NextResponse } from 'next/server'
import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

const uploadFile = async function (file) {
  const config = {
    region: process.env.REGION || 'fr-par',
    endpoint: process.env.ENDPOINT || 'https://s3.fr-par.scw.cloud',
    credentials: {
      accessKeyId: process.env.SCW_ACCESS_KEY_ID || 'SCWCNNWKMSTD5E39H86P',
      secretAccessKey:
        process.env.SCW_SECRET_ACCESS_KEY ||
        'd7714a6f-b245-433b-ad17-608265b2c956',
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
    Key: `${filename}`,
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

export async function POST(req, res) {
  try {
    const data = await req.json()
    uploadFile(data.file)
    return NextResponse.json({ message: 'Felipe' })
  } catch (err) {
    return NextResponse.json({ message: err, success: false })
  }
}

// export async function DELETE(request) {
//   try {
//     console.log(request)
//     return NextResponse.json({ success: true })
//   } catch (err) {
//     console.log(err)
//     return NextResponse.json({ message: err, success: false })
//   }
// }
