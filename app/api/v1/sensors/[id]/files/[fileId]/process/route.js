import { NextResponse } from 'next/server'

import { sendMessageToProcessingQueue } from '@/lib/aws'

/**
 * @swagger
 * /api/v1/sensors/{sensorId}/files/{fileId}/process:
 *   get:
 *     description: Process a file
 *     tags:
 *       - sensors
 *     parameters:
 *      - in: path
 *        name: sensorId
 *        schema:
 *          type: string
 *      - in: path
 *        name: fileId
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
export async function GET(request, { params }) {
  const { fileId } = params

  sendMessageToProcessingQueue(fileId)

  return NextResponse.json({ message: 'Success' }, { status: 200 })
}
