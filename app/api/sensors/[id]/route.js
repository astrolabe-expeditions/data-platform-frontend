import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import {
  createKeyInDatabase,
  uploadFile,
  sendMessageToProcessingQueue,
} from '@/lib/aws'

export async function PUT(request, { params }) {
  const { id } = params
  const {
    identifier,
    type,
    nbr_measures,
    // station_id,
    // records,
    // files,
  } = await request.json()
  await db.sensor.update({
    where: {
      id: id,
    },
    data: {
      identifier,
      type,
      nbr_measures,
      // station_id,
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
      nbr_measures: true,
      station_id: true,
      records: true,
      files: true,
    },
  })
  return NextResponse.json({ sensor }, { status: 200 })
}

export async function POST(request) {
  const data = await request.formData()
  const file = data.get('file')
  const sensor_id = data.get('sensor_id')

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const file_id = await createKeyInDatabase(file, sensor_id)
  await uploadFile(file, file_id, sensor_id)

  sendMessageToProcessingQueue(file_id)

  const sensor = await db.sensor.findUnique({
    where: {
      id: sensor_id,
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

  return NextResponse.json({ success: true, data: sensor }, { status: 201 })
}
