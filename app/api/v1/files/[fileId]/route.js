import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

/**
 * @swagger
 * /api/v1/files/{fileId}:
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
  const { fileId } = params
  const file = await db.file.findUnique({
    where: {
      id: fileId,
    },
  })

  if (file === null) {
    return NextResponse.json({ data: null }, { status: 404 })
  }

  return NextResponse.json({ data: file }, { status: 200 })
}

/**
 * @swagger
 * /api/v1/files/{fileId}:
 *   put:
 *     description: Update a file
 *     tags:
 *       - files
 *     parameters:
 *       - in: path
 *         name: fileId
 *         schema:
 *         type: string
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
export async function PUT(request, { params }) {
  const { fileId } = params
  const json = await request.json()

  const { status } = json

  const updatedFile = await db.file.update({
    where: {
      id: fileId,
    },
    data: {
      status,
    },
  })

  if (updatedFile === null) {
    return NextResponse.json({ data: null }, { status: 404 })
  }

  return NextResponse.json({ data: updatedFile }, { status: 200 })
}
