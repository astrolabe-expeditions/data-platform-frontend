import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

/**
 * @swagger
 * /api/stations:
 *   get:
 *     description: Returns all stations
 *     parameters:
 *      - in: query
 *        name: type
 *        schema:
 *          type: string
 *        description: Filter by type of station (e.g. 'Mobile', 'Fixed')
 *     responses:
 *       200:
 *        description: Success
 */
export async function GET(request) {
  const type = request.nextUrl.searchParams.get('type')

  const stations = await db.station.findMany({
    where: {
      deleted: false,
      type: type ? type : undefined,
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

  return NextResponse.json({ data: stations }, { status: 200 })
}

export async function POST(request) {
  const { name, type, latitude, longitude, description, image_url, sensors } =
    await request.json()
  await db.station.create({
    data: {
      name,
      latitude,
      longitude,
      type,
      description,
      image_url,
      sensors,
    },
  })
  return NextResponse.json(
    { message: 'Station Created Successfully' },
    { status: 201 },
  )
}

// soft DELETE (deleted: true) with deleted_at and deleted_by_id
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id')
  // const deleted_by_id = getUserIdFromRequest(request); // Implement a function to get the user ID from the request.

  await db.station.update({
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
    { message: 'Station Soft Deleted Successfully' },
    { status: 200 },
  )
}
