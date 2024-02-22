import { hash } from 'bcrypt'

import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { email, password } = await req.json()
  const hashed = await hash(password, 12)

  try {
    const user = await db.user.create({
      data: {
        email,
        password: hashed,
      },
    })

    return NextResponse.json({
      user: {
        email: user.email,
      },
    })
  } catch {
    return NextResponse.json({ error: 'same_email' }, { status: 500 })
  }
}
