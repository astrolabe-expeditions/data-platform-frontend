import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// export async function GET() {
//   const sensors = await db.sensor.findMany({
//     select: {
//       id: true,
//       identifier: true,
//       type: true,
//       nbr_measures: true,
//       station_id: true,
//       records: true,
//       files: true,
//     },
//   })
//   return NextResponse.json(sensors)
// }

// GET with soft delete (deleted: false)
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

  return NextResponse.json(sensors, { status: 200 })
}

export async function POST(request) {
  // const { identifier, type, nbr_measures, station_id, records, files } = await request.json()
  // const { identifier, type,station_id } = await request.json()
  // const { identifier, type, nbr_measures, station_id } = await request.json()
  const { identifier, type } = await request.json()
  await db.sensor.create({
    data: {
      identifier,
      type,
      // nbr_measures,
      // station_id,
      // records,
      // files,
    },
  })
  return NextResponse.json(
    { message: 'Sensor Created Successfully' },
    { status: 201 },
  )
}

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get('id')
//   await db.sensor.delete({
//     where: {
//       id,
//     },
//   })
//   return NextResponse.json(
//     { message: 'Sensor Deleted Successfully' },
//     { status: 200 },
//   )
// }

// soft DELETE (deleted: true) with deleted_at and deleted_by_id
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id')
  // const deleted_by_id = getUserIdFromRequest(request); // Implement a function to get the user ID from the request.

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
