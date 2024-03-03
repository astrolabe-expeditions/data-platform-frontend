import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

/**
 * @swagger
 * /api/v1/sensors/{sensorId}/records/create_or_update_many:
 *   post:
 *    description: Create or update many records. Limit 100 records per request
 *    tags:
 *      - sensors
 *    requestBody:
 *      description: Optional description in *Markdown*
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: To many records in request
 */
export async function POST(request) {
  const { data } = await request.json()
  const records = JSON.parse(data).map((record) => {
    const recordedAt = new Date(record.recorded_at).toISOString()
    return { ...record, recorded_at: recordedAt }
  })

  if (records.length > 100) {
    return NextResponse.json(
      { error: 'To many records in request' },
      { status: 400 },
    )
  }

  for (const record of records) {
    const existingRecord = await db.record.findFirst({
      where: {
        sensor_id: record.sensor_id,
        recorded_at: record.recorded_at,
      },
    })

    if (existingRecord) {
      await db.record.update({
        where: {
          id: existingRecord.id,
        },
        data: record,
      })
    } else {
      await db.record.create({
        data: record,
      })
    }
  }

  return NextResponse.json(
    { message: 'Sensor Created Successfully' },
    { status: 201 },
  )
}
