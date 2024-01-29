import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

/**
 * @swagger
 * /api/stations/{stationId}:
 *  get:
 *    description: Get a station
 *    tags:
 *      - stations
 *    parameters:
 *      - in: path
 *        name: stationId
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
  const station = await db.station.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      type: true,
      latitude: true,
      longitude: true,
      description: true,
      image_url: true,
      sensors: true,
    },
  })

  if (station === null) {
    return NextResponse.json({ data: null }, { status: 404 })
  }

  return NextResponse.json({ station }, { status: 200 })
}

/**
 * @swagger
 * /api/stations/{stationId}:
 *   put:
 *     description: Update a station
 *     tags:
 *       - stations
 *     parameters:
 *       - in: path
 *         name: stationId
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
  const { name, type, latitude, longitude, description, image_url, sensors } =
    await request.json()
  await db.station.update({
    where: {
      id: id,
    },
    data: {
      name,
      type,
      latitude,
      longitude,
      description,
      image_url,
      sensors,
    },
  })
  return NextResponse.json(
    { message: 'Station Updated Successfully' },
    { status: 200 },
  )
}

/**
 * @swagger
 * /api/stations/{stationId}:
 *   delete:
 *    description: Delete a station
 *    tags:
 *      - stations
 *    parameters:
 *     - in: path
 *       name: stationId
 *       schema:
 *         type: string
 *    responses:
 *      200:
 *        description: Success
 */
export async function DELETE(request, { params }) {
  const { id } = params

  await db.station.update({
    where: {
      id,
    },
    data: {
      deleted: true,
      deleted_at: new Date(),
    },
  })

  return NextResponse.json(
    { message: 'Station Soft Deleted Successfully' },
    { status: 200 },
  )
}
