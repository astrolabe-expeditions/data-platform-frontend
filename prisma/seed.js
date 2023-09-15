const { PrismaClient } = require('@prisma/client')
const { stations, sensors, getUsers } = require('./data.js')
const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.station.deleteMany()
    console.log('Deleted all stations')

    await prisma.sensor.deleteMany()
    console.log('Deleted all sensors')

    await prisma.user.deleteMany()
    console.log('Deleted all users')

    await prisma.station.createMany({
      data: stations,
    })
    console.log('Added station data')

    await prisma.sensor.createMany({
      data: sensors,
    })
    console.log('Added sensor data')

    const users = await getUsers()
    await prisma.user.createMany({
      data: users,
    })
    console.log('Added user data')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
