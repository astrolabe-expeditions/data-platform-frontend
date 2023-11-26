import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  const { id } = params
  const {
    newIdentifier: identifier,
    newType: type,
    // newNbr_measures: nbr_measures,
    newStation_id: station_id,
    // newRecords: records,
    // newFiles: files,
  } = await request.json()
  await db.sensor.update({
    where: {
      id: id,
    },
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
    { message: 'Sensor Updated Successfully' },
    { status: 200 },
  )
}

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
      // nbr_measures: true,
      station_id: true,
      // records: true,
      // files: true,
    },
  })
  return NextResponse.json({ sensor }, { status: 200 })
}
