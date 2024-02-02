import { NextResponse } from 'next/server'

import { sendMessageToProcessingQueue } from '@/lib/aws'

/**
 * @swagger
 * /api/files/{fileId}/process:
 *  get:
 *    description: Get a file
 *    tags:
 *      - files
 *    parameters:
 *      - in: path
 *        name: fileId
 *        schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 */
export async function GET(request, { params }) {
  const { id } = params

  sendMessageToProcessingQueue(id)

  return NextResponse.json({ message: 'Success' }, { status: 200 })
}
