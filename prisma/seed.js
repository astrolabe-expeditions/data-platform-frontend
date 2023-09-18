const { PrismaClient } = require('@prisma/client')
const { stations, sensors, getUsers, stationWithSensors } = require('./data.js')
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
    const stationWithSensorResponse = await prisma.station.create({
      data: stationWithSensors,
    })
    console.log('Added station data')

    const getStationWithSensors = await prisma.station.findUnique({
      where: {
        id: stationWithSensorResponse.id,
      },
      include: { // The include function show all the objects below the object father
        sensors: true,
      },
    });

    console.log(getStationWithSensors)

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
