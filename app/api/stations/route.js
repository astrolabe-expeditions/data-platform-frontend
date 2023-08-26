import { db } from '@/lib/db'

export async function GET() {
  try {
    const stations = await db.station.findMany({
      select: {
        id: true,
        name: true,
      },
    })

    return new Response(JSON.stringify(stations))
  } catch (error) {
    console.log('error', error)
    return new Response(null, { status: 500 })
  }
}
