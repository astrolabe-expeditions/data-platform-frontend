import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

/**
 * @swagger
 * /api/v1/sensors/{sensorId}/records:
 *   get:
 *     description: Returns records for a sensor
 *     tags:
 *       - sensors
 *     parameters:
 *       - in: path
 *         name: sensorId
 *         schema:
 *           type: string
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *         description: Change format to GeoJSON (e.g. 'geojson', 'json')
 *     responses:
 *       200:
 *         description: Success
 */
export async function GET(request, { params }) {
  const format = request.nextUrl.searchParams.get('format')
  const { id: sensorId } = params

  const records = await db.record.findMany({
    where: {
      sensor_id: sensorId,
    },
  })

  if (format === 'geojson') {
    const geojson = getGeojsonFromRecord(records)
    return NextResponse.json({ data: geojson }, { status: 200 })
  }

  return NextResponse.json({ data: records }, { status: 200 })
}

function getGeojsonFromRecord(recordList) {
  let geojson = {
    type: 'FeatureCollection',
    features: [
      ...recordList.map((record) => {
        const { id, latitude, longitude, ...properties } = record
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [longitude.toString(), latitude.toString()],
          },
          properties,
        }
      }),
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: recordList.map((record) => [
            record.longitude,
            record.latitude,
          ]),
        },
      },
    ],
  }

  return geojson
}
