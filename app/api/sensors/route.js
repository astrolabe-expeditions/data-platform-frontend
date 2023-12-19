import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

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
      records: true,
      files: true,
    },
  })

  // If the sensor doesn't exist, return a 404 response
  if (!sensors || sensors.length === 0) {
    return NextResponse.json({ error: 'Sensors not found' }, { status: 404 })
  }

  return NextResponse.json(sensors, { status: 200 })
}

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

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id')

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
