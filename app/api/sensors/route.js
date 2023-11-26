import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const sensors = await db.sensor.findMany({
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
  return NextResponse.json(sensors)
}

export async function POST(request) {
  // const { identifier, type, nbr_measures, station_id, records, files } =
  const { identifier, type, station_id } = await request.json()
  await db.sensor.create({
    data: {
      identifier,
      type,
      // nbr_measures,
      station_id,
      // records,
      // files,
    },
  })
  return NextResponse.json(
    { message: 'Sensor Created Successfully' },
    { status: 201 },
  )
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id')
  await db.sensor.delete({
    where: {
      id,
    },
  })
  return NextResponse.json(
    { message: 'Sensor Deleted Successfully' },
    { status: 200 },
  )
}
