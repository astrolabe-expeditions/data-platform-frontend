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
        description: 'Mobile station in London',
        image_url: 'https://picsum.photos/200/300.jpg',
        sensors: {
          create: [
            {
              identifier: 'UV987654',
              type: 'SensOcean',
              nbr_measures: 3,
              records: {
                create: [
                  {
                    latitude: '52.5200',
                    longitude: '13.4050',
                    recorded_at: new Date(),
                    battery_voltage: 3.5,
                    battery_percentage: 88,
                    pression_ext: 1010.98,
                    temp_ext: 24.3,
                    temp_int: 21.6,
                    temp_sea: [19.8, 19.9, 19.7],
                    temp_sea_mean: 19.8,
                    ec_sea: [35.7, 35.8, 35.6],
                    ec_sea_mean: 35.7,
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 6',
                    status: 'Active',
                    file_url: 'https://example.com/file6.csv',
                  },
                ],
              },
            },
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
        image_url: 'https://picsum.photos/200/300.jpg',
        sensors: {
          create: [
            {
              identifier: 'QR123456',
              type: 'LittObs',
              nbr_measures: 4,
              records: {
                create: [
                  {
                    latitude: '52.5200',
                    longitude: '13.4050',
                    recorded_at: new Date(),
                    battery_voltage: 3.8,
                    battery_percentage: 91,
                    pression_ext: 1014.28,
                    temp_ext: 23.5,
                    temp_int: 20.1,
                    temp_sea: [18.7, 18.9, 18.6, 18.7],
                    temp_sea_mean: 18.7,
                    ec_sea: [35.8, 35.9, 35.7, 35.8],
                    ec_sea_mean: 35.8,
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 7',
                    status: 'Inactive',
                    file_url: 'https://example.com/file7.csv',
                  },
                ],
              },
            },
          ],
        },
      },
    })

    const station_8 = await prisma.station.create({
      data: {
        name: 'Station n°8',
        type: 'Mobile',
        description: 'Mobile station in Los Angeles',
        image_url: 'https://picsum.photos/200/300.jpg',
        sensors: {
          create: [
            {
              identifier: 'AB123456',
              type: 'LittObs',
              nbr_measures: 5,
              records: {
                create: [
                  {
                    latitude: '41.8781',
                    longitude: '-87.6298',
                    recorded_at: new Date(),
                    battery_voltage: 3.6,
                    battery_percentage: 87,
                    pression_ext: 1011.75,
                    temp_ext: 26.8,
                    temp_int: 23.2,
                    temp_sea: [20.5, 20.7, 20.8, 20.6, 20.9],
                    temp_sea_mean: 20.7,
                    ec_sea: [36.2, 36.3, 36.1, 36.1, 36.3],
                    ec_sea_mean: 36.2,
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 8',
                    status: 'Inactive',
                    file_url: 'https://example.com/file8.csv',
                  },
                ],
              },
            },
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
        image_url: 'https://picsum.photos/200/300.jpg',
        sensors: {
          create: [
            {
              identifier: 'OP234567',
              type: 'LittObs',
              nbr_measures: 780,
              records: {
                create: [
                  {
                    latitude: '52.2297',
                    longitude: '21.0122',
                    recorded_at: new Date(),
                    battery_voltage: 3.6,
                    battery_percentage: 75,
                    pression_ext: 1015.75,
                    temp_ext: 28.2,
                    temp_int: 22.8,
                    temp_sea: [20.0, 20.2, 20.1],
                    temp_sea_mean: 20.1,
                    ec_sea: [36.1, 36.0, 36.2],
                    ec_sea_mean: 36.1,
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 9',
                    status: 'Inactive',
                    file_url: 'https://example.com/file9.csv',
                  },
                ],
              },
            },
          ],
        },
      },
    })

    const station_10 = await prisma.station.create({
      data: {
        name: 'Station n°10',
        type: 'Mobile',
        description: 'Mobile station in Brest',
        image_url: 'https://picsum.photos/200/300.jpg',
        sensors: {
          create: [
            {
              identifier: 'MN567890',
              type: 'SensOcean',
              nbr_measures: 630,
              records: {
                create: [
                  {
                    latitude: '40.7128',
                    longitude: '-74.0060',
                    recorded_at: new Date(),
                    battery_voltage: 3.7,
                    battery_percentage: 90,
                    pression_ext: 1013.25,
                    temp_ext: 25.5,
                    temp_int: 21.3,
                    temp_sea: [18.5, 19.0, 19.2],
                    temp_sea_mean: 18.9,
                    ec_sea: [35.5, 35.7, 35.9],
                    ec_sea_mean: 35.7,
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 10',
                    status: 'Inactive',
                    file_url: 'https://example.com/file10.csv',
                  },
                ],
              },
            },
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
              avatar_url: 'https://picsum.photos/200/300.jpg',
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
              avatar_url: 'https://picsum.photos/200/300.jpg',
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
              avatar_url: 'https://picsum.photos/200/300.jpg',
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
