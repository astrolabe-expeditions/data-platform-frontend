import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import {
  createKeyInDatabase,
  uploadFile,
  sendMessageToProcessingQueue,
} from '@/lib/aws'

/**
 * @swagger
 * /api/sensors/{sensorId}/upload:
 *   post:
 *    description: Create a new station
 *    parameters:
 *     - in: path
 *       name: sensorId
 *       schema:
 *         type: string
 *    tags:
 *      - sensors
 *    requestBody:
 *      description: Optional description in *Markdown*
 *    responses:
 *      200:
 *        description: Success
 */
export async function POST(request) {
  const data = await request.formData()
  const file = data.get('file')
  const sensor_id = data.get('sensor_id')

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const file_id = await createKeyInDatabase(file, sensor_id)
  await uploadFile(file, file_id, sensor_id)

  sendMessageToProcessingQueue(file_id)

  const sensor = await db.sensor.findUnique({
    where: {
      id: sensor_id,
    },
    select: {
      id: true,
      identifier: true,
      type: true,
      nbr_measures: true,
      station_id: true,
      records: true,
      files: true,
    },
  })

  return NextResponse.json({ success: true, data: sensor }, { status: 201 })
}
