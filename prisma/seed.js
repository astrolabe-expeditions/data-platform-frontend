const { PrismaClient } = require('@prisma/client')
const {
  stations,
  sensors,
  records,
  files,
  organisations,
  getUsers,
} = require('./data.js')
const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.station.deleteMany()
    console.log('Deleted all stations')

    await prisma.sensor.deleteMany()
    console.log('Deleted all sensors')

    await prisma.user.deleteMany()
    console.log('Deleted all users')

    await prisma.organisation.deleteMany()
    console.log('Deleted all organisations')

    await prisma.file.deleteMany()
    console.log('Deleted all files')

    await prisma.record.deleteMany()
    console.log('Deleted all records')

    await prisma.station.createMany({
      data: stations,
    })

    console.log('Added station data')

    await prisma.sensor.createMany({
      data: sensors,
    })

    console.log('Added sensor data')

    await prisma.organisation.createMany({
      data: organisations,
    })
    console.log('Added organisation data')

    await prisma.record.createMany({
      data: records,
    })
    console.log('Added record data')

    await prisma.file.createMany({
      data: files,
    })
    console.log('Added file data')

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

async function main() {
  try {
    // Fetch all stations with their related sensors
    const stationsWithSensors = await prisma.station.findMany({
      include: {
        sensors: true, // Include the related sensors
      },
    })

    // Log the stations and their sensors to the console
    console.log('Stations with Sensors:')
    stationsWithSensors.forEach((station) => {
      console.log(`Station Name: ${station.name}`)
      console.log('Related Sensors:')
      station.sensors.forEach((sensor) => {
        console.log(`- Sensor Identifier: ${sensor.identifier}`)
        console.log(`- Sensor Type: ${sensor.type}`)
        // Log other sensor properties as needed
      })
      console.log('----------------------')
    })
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()

async function showLinkedSensorsToStations() {
  try {
    // Query all stations with their associated sensors
    const stationsWithSensors = await prisma.station.findMany({
      include: {
        sensors: true,
      },
    })

    // Loop through the stations and display their associated sensors
    stationsWithSensors.forEach((station) => {
      console.log(`Station Name: ${station.name}`)
      console.log('Associated Sensors:')
      station.sensors.forEach((sensor) => {
        console.log(`- Sensor Identifier: ${sensor.identifier}`)
      })
      console.log('----------------------')
    })
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

showLinkedSensorsToStations()

console.log(stations)
console.log(sensors)
