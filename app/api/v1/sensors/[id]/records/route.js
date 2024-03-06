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
    orderBy: {
      recorded_at: 'asc',
    },
  })

  if (format === 'geojson') {
    const geojson = getGeojsonFromRecord(records)
    return NextResponse.json({ ...geojson }, { status: 200 })
  }

  return NextResponse.json({ data: records }, { status: 200 })
}

function getGeojsonFromRecord(recordList) {
  let geojson = {
    type: 'FeatureCollection',
    features: [
      ...recordList
        .filter(({ latitude, longitude }) => latitude !== 0 && longitude !== 0)
        .map(({ id, latitude, longitude, recorded_at, properties }) => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [longitude.toString(), latitude.toString()],
            },
            properties: {
              recorded_at,
              ...properties,
            },
          }
        }),
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: recordList
            .filter(
              ({ latitude, longitude }) => latitude !== 0 && longitude !== 0,
            )
            .map((record) => [record.longitude, record.latitude]),
        },
      },
    ],
  }

  return geojson
}
