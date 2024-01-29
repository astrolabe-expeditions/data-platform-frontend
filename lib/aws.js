import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import { db } from '@/lib/db'

export const uploadFile = async function (file, file_id, sensor_id) {
  const client = new S3({
    region: process.env.S3_REGION || 'fr-par',
    endpoint: process.env.S3_ENDPOINT || 'https://s3.fr-par.scw.cloud',
    credentials: {
      accessKeyId: process.env.S3_ID,
      secretAccessKey: process.env.S3_SECRET,
    },
  })

  const upload = new Upload({
    client,
    params: {
      Bucket: process.env.S3_BUCKET,
      Key: `sensors/${sensor_id}/${file_id}.csv`,
      Body: file,
    },
  })
  await upload.done()
}

export const sendMessageToProcessingQueue = async function (file_id) {
  try {
    const sqsClient = new SQSClient({
      credentials: {
        accessKeyId: process.env.SQS_ID,
        secretAccessKey: process.env.SQS_SECRET,
      },
      region: process.env.SQS_REGION || 'fr-par',
      endpoint:
        process.env.SQS_ENDPOINT || 'https://sqs.mnq.fr-par.scaleway.com',
    })

    const sendMessageCommand = new SendMessageCommand({
      MessageBody: JSON.stringify({
        file_id,
      }),
      QueueUrl: process.env.SQS_QUEUE_URL,
    })

    const sendMessage = await sqsClient.send(sendMessageCommand)
    console.log('Success', sendMessage.MessageId)
  } catch (e) {
    console.log('Send SQS message error : ', e)
  }
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
