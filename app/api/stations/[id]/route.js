import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

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
  return NextResponse.json({ station }, { status: 200 })
}
