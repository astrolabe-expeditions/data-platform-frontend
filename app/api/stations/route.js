import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const stations = await db.station.findMany({
      select: {
        sensors: true,
        name: true,
        type: true,
        id: true,
      },
    })

    return new Response(JSON.stringify(stations))
  } catch (error) {
    console.log('error', error)
    return new Response(null, { status: 500 })
  }
}

export async function POST(request) {
  try {
    return NextResponse.json({ success: true })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: err, success: false })
  }
}

export async function DELETE(request) {
  try {
    console.log(request)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: err, success: false })
  }
}
