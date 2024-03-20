import { sign, verify } from '@/lib/crypto'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

/**
 * @swagger
 * /api/v1/sensors/share:
 *  get:
 *    description: Get the sensor from a share token
 *    tags:
 *      - sensors
 *    parameters:
 *      - in: query
 *         name: token
 *         schema:
 *           type: string
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 */
export async function GET(request, { params }) {
  const token = request.nextUrl.searchParams.get('token')
  console.log(token)

  const data = verify(token)

  const sensor = await db.sensor.findUnique({
    where: {
      id: data.sensorId,
    },
    select: {
      id: true,
      identifier: true,
    },
  })

  return NextResponse.json(
    {
      data: sensor,
    },
    { status: 200 },
  )
}

/**
 * @swagger
 * /api/v1/sensors/share:
 *  post:
 *    description: Get the token to share a sensor
 *    tags:
 *      - sensors
 *    requestBody:
 *      description: Optional description in *Markdown*
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 */
export async function POST(request) {
  const { sensorId } = await request.json()

  return NextResponse.json(
    {
      data: {
        token: sign({
          sensorId,
        }),
      },
    },
    { status: 200 },
  )
}
