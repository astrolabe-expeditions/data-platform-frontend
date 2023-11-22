import AWS from 'aws-sdk'

export const uploadFile = async function (file) {
  const s3 = new AWS.S3({
    accessKeyId: 'SCW5945W6Z1H949723B5',
    secretAccessKey: '1c249f33-c62d-4ca0-94a7-2da35618ccdc',
    region: 'eu-west-3',
  })

  const filename = file.name
  const fileContent = file

  const params = {
    Bucket: 'astrolabe-expeditions-data',
    Key: filename,
    Body: fileContent,
  }

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err)
    }
  })
}
