import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { createKeyInDatabase, uploadFile } from '@/lib/aws'

export async function POST(request) {
  const data = await request.formData()
  const file = data.get('file')
  const sensor_id = data.get('sensor_id')

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const file_id = await createKeyInDatabase(file, sensor_id)
  uploadFile(file, file_id, sensor_id)

  return NextResponse.json({ success: true, file_id: file_id })
}

export async function GET(request, { params }) {
  return NextResponse.json(sensor)
}
