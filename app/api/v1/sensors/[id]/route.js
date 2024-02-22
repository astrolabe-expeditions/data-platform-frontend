import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

/**
 * @swagger
 * /api/v1/sensors/{sensorId}:
 *  get:
 *    description: Get a sensor
 *    tags:
 *      - sensors
 *    parameters:
 *      - in: path
 *        name: sensorId
 *        schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 */
export async function GET(request, { params }) {
  const { id } = params
  const sensor = await db.sensor.findUnique({
    where: {
      id: id,
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
  return NextResponse.json({ sensor }, { status: 200 })
}

/**
 * @swagger
 * /api/v1/sensors/{sensorId}:
 *   put:
 *     description: Update a sensor
 *     tags:
 *       - sensors
 *     parameters:
 *       - in: path
 *         name: sensorId
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Optional description in *Markdown*
 *     responses:
 *       200:
 *         description: Success
 */
export async function PUT(request, { params }) {
  const { id } = params
  const { identifier, type, nbr_measures } = await request.json()
  await db.sensor.update({
    where: {
      id: id,
    },
    data: {
      identifier,
      type,
      nbr_measures,
    },
  })
  return NextResponse.json(
    { message: 'Sensor Updated Successfully' },
    { status: 200 },
  )
}

/**
 * @swagger
 * /api/v1/sensors/{sensorId}:
 *   delete:
 *    description: Delete a sensor
 *    tags:
 *      - sensors
 *    parameters:
 *     - in: path
 *       name: sensorId
 *       schema:
 *         type: string
 *    responses:
 *      200:
 *        description: Success
 */
export async function DELETE(request, { params }) {
  const { id } = params

  // Check if the sensor with the given id exists
  const existingSensor = await db.sensor.findUnique({
    where: {
      id,
    },
  })

  // If the sensor doesn't exist, return a 404 response
  if (!existingSensor) {
    return NextResponse.json({ error: 'Sensor not found' }, { status: 404 })
  }

  // Perform the soft delete
  await db.sensor.update({
    where: {
      id,
    },
    data: {
      deleted: true,
      deleted_at: new Date(),
      // deleted_by_id,
    },
  })

  return NextResponse.json(
    { message: 'Sensor Soft Deleted Successfully' },
    { status: 200 },
  )
}
