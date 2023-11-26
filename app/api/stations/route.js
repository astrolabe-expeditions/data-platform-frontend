import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const stations = await db.station.findMany({
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
  return NextResponse.json(stations)
}

export async function POST(request) {
  const { name, type, latitude, longitude, description, image_url } =
    await request.json()
  await db.station.create({
    data: {
      name,
      latitude,
      longitude,
      type,
      description,
      image_url,
    },
  })
  return NextResponse.json(
    { message: 'Station Created Successfully' },
    { status: 201 },
  )
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id')
  await db.station.delete({
    where: {
      id,
    },
  })
  return NextResponse.json(
    { message: 'Station Deleted Successfully' },
    { status: 200 },
  )
}
