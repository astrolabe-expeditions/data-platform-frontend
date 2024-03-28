import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

/**
 * @swagger
 * /api/v1/sensors:
 *   get:
 *     description: Returns all sensors
 *     tags:
 *       - sensors
 *     responses:
 *       200:
 *         description: Success
 */
export async function GET() {
  const sensors = await db.sensor.findMany({
    where: {
      deleted: false,
    },
    select: {
      id: true,
      identifier: true,
      type: true,
      nbr_measures: true,
      station_id: true,
      created_at: true,
      updated_at: true,
    },
  })

  return NextResponse.json({ data: sensors }, { status: 200 })
}

/**
 * @swagger
 * /api/v1/sensors:
 *   post:
 *    description: Create a new sensor
 *    tags:
 *      - sensors
 *    requestBody:
 *      description: Optional description in *Markdown*
 *    responses:
 *      200:
 *        description: Success
 */
export async function POST(request) {
  const { identifier, type, nbr_measures } = await request.json()
  await db.sensor.create({
    data: {
      identifier,
      type,
      nbr_measures,
    },
  })
  return NextResponse.json(
    { message: 'Sensor Created Successfully' },
    { status: 201 },
  )
}
