import jwt from 'jsonwebtoken'

export function sign(data) {
  if (!process.env.APP_KEY) throw new Error('APP_KEY not set')
  return jwt.sign(data, process.env.APP_KEY)
}

export function verify(token) {
  if (!process.env.APP_KEY) throw new Error('APP_KEY not set')
  try {
    return jwt.verify(token, process.env.APP_KEY)
  } catch (err) {
    throw new Error('Invalid token')
  }
}
