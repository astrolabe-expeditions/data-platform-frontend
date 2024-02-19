/**
 * @swagger
 * /api/sensors/{sensorId}/records/create_or_update_many:
 *   post:
 *    description: Create or update many records. Limit 100 records per request
 *    tags:
 *      - sensors
 *    requestBody:
 *      description: Optional description in *Markdown*
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: To many records in request
 */
export async function POST(request) {
  const records = await request.json()
  if (records.length > 100) {
    return NextResponse.json(
      { error: 'To many records in request' },
      { status: 400 },
    )
  }

  await db.record.createMany({
    data: records,
  })

  return NextResponse.json(
    { message: 'Sensor Created Successfully' },
    { status: 201 },
  )
}
