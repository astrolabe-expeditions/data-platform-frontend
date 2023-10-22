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

const { hash } = require('bcrypt')

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

    const station_6 = await prisma.station.create({
      data: {
        name: 'Station n°6',
        type: 'Mobile',
        latitude: '51.5074',
        longitude: '0.1278',
        description: 'Mobile station in London',
        image_url: 'https://example.com/station6.jpg',
        sensors: {
          create: [
            { identifier: 'UV987654', type: 'SensOcean', nbr_measures: 720 },
          ],
        },
      },
    })

    const station_7 = await prisma.station.create({
      data: {
        name: 'Station n°7',
        type: 'Fixed',
        latitude: '52.5200',
        longitude: '13.4050',
        description: 'Fixed station in Berlin',
        image_url: 'https://example.com/station7.jpg',
        sensors: {
          create: [
            { identifier: 'QR123456', type: 'LittObs', nbr_measures: 920 },
          ],
        },
      },
    })

    const station_8 = await prisma.station.create({
      data: {
        name: 'Station n°8',
        type: 'Mobile',
        latitude: '34.0522',
        longitude: '-118.2437',
        description: 'Mobile station in Los Angeles',
        image_url: 'https://example.com/station8.jpg',
        sensors: {
          create: [
            { identifier: 'AB123456', type: 'LittObs', nbr_measures: 800 },
          ],
        },
      },
    })

    const station_9 = await prisma.station.create({
      data: {
        name: 'Station n°9',
        type: 'Fixed',
        latitude: '52.2297',
        longitude: '21.0122',
        description: 'Fixed station in Warsaw',
        image_url: 'https://example.com/station9.jpg',
        sensors: {
          create: [
            { identifier: 'OP234567', type: 'LittObs', nbr_measures: 780 },
          ],
        },
      },
    })

    const station_10 = await prisma.station.create({
      data: {
        name: 'Station n°10',
        type: 'Fixed',
        latitude: '34.7478',
        longitude: '10.7661',
        description: 'Fixed station in Sfax',
        image_url: 'https://example.com/station10.jpg',
        sensors: {
          create: [
            { identifier: 'MN567890', type: 'SensOcean', nbr_measures: 630 },
          ],
        },
      },
    })

    console.log(station_6, station_7, station_8, station_9, station_10)

    const users = await getUsers()
    await prisma.user.createMany({
      data: users,
    })

    console.log('Added user data')
    const password = await hash('hi123', 12)
    console.log(password)

    const organisation_3 = await prisma.organisation.create({
      data: {
        name: 'Global Environmental Solutions',
        description:
          'A company specializing in environmental monitoring and sustainable technology.',
        users: {
          create: [
            {
              name: 'user1',
              password: password,
              email: 'user1@gmail.com',
              image_url: 'https://example.com/user1.jpg',
            },
          ],
        },
      },
    })

    const organisation_4 = await prisma.organisation.create({
      data: {
        name: 'Climate Change Advocates',
        description:
          'A non-profit organization committed to raising awareness and taking action on climate change.',
        users: {
          create: [
            {
              name: 'user2',
              password: password,
              email: 'user2@gmail.com',
              image_url: 'https://example.com/user2.jpg',
            },
          ],
        },
      },
    })

    const organisation_5 = await prisma.organisation.create({
      data: {
        name: 'Tech Innovators for Sustainability',
        description:
          'A tech organization focused on sustainable solutions and environmental data analysis.',
        users: {
          create: [
            {
              name: 'user3',
              password: password,
              email: 'user3@gmail.com',
              image_url: 'https://example.com/user3.jpg',
            },
          ],
        },
      },
    })

    console.log(organisation_3, organisation_4, organisation_5)
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()

async function showLinkedSensorsToStations() {
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

showLinkedSensorsToStations()

console.log(stations)

console.log(sensors)
