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

  // Check if sensors exist, if not, redirect to a 404 page
  if (!sensors || sensors.length === 0) {
    return NextResponse.redirect('/404') // Adjust the path to your actual 404 page
  }

  return NextResponse.json(sensors, { status: 200 })
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id')

  // Check if the sensor with the given id exists
  const existingSensor = await db.sensor.findUnique({
    where: {
      id,
    },
  })

  // If the sensor doesn't exist, redirect to a 404 page
  if (!existingSensor) {
    return NextResponse.redirect('/404') // Adjust the path to your actual 404 page
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
