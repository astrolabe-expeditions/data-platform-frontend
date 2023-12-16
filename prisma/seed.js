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
              name: 'User1',
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
              name: 'User2',
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
              name: 'User3',
              password: password,
              email: 'user3@gmail.com',
              avatar_url: 'https://picsum.photos/200/300.jpg',
            },
          ],
        },
      },
    })

    console.log(organisation_3, organisation_4, organisation_5)

    const User4 = await prisma.user.create({
      data: {
        name: 'User4',
        password: password,
        email: 'user4@gmail.com',
        avatar_url: 'https://picsum.photos/200/300.jpg',
      },
    })

    const User5 = await prisma.user.create({
      data: {
        name: 'User5',
        password: password,
        email: 'user5@gmail.com',
        avatar_url: 'https://picsum.photos/200/300.jpg',
      },
    })

    const User6 = await prisma.user.create({
      data: {
        name: 'User6',
        password: password,
        email: 'user6@gmail.com',
        avatar_url: 'https://picsum.photos/200/300.jpg',
      },
    })

    const User7 = await prisma.user.create({
      data: {
        name: 'User7',
        password: password,
        email: 'user7@gmail.com',
        avatar_url: 'https://picsum.photos/200/300.jpg',
      },
    })

    const User8 = await prisma.user.create({
      data: {
        name: 'User8',
        password: password,
        email: 'user8@gmail.com',
        avatar_url: 'https://picsum.photos/200/300.jpg',
      },
    })

    const station_6 = await prisma.station.create({
      data: {
        name: 'Station n°6',
        type: 'Mobile',
        description: 'Mobile station in London',
        image_url: 'https://picsum.photos/200/300.jpg',
        created_at: new Date('2023-10-31T08:45:00.000Z'),
        created_by: { connect: { id: User6.id } },
        updated_at: new Date('2023-11-01T08:45:00.000Z'),
        updated_by: { connect: { id: User4.id } },
        sensors: {
          create: [
            {
              identifier: 'UV987654',
              type: 'SensOcean',
              nbr_measures: 3,
              created_at: new Date('2023-10-31T08:45:00.000Z'),
              created_by: { connect: { id: User6.id } },
              updated_at: new Date('2023-11-01T08:45:00.000Z'),
              updated_by: { connect: { id: User4.id } },
              records: {
                create: [
                  {
                    latitude: '52.5200',
                    longitude: '13.4050',
                    recorded_at: new Date('2022-10-23T06:45:00.000Z'),
                    battery_voltage: 3.5,
                    battery_percentage: 88,
                    pression_ext: 1010.98,
                    temp_ext: 24.3,
                    temp_int: 21.6,
                    temp_sea: [19.8, 19.9, 19.7],
                    temp_sea_mean: 19.8,
                    ec_sea: [35.7, 35.8, 35.6],
                    ec_sea_mean: 35.7,
                    created_at: new Date('2023-10-31T08:45:00.000Z'),
                    created_by: { connect: { id: User6.id } },
                    updated_at: new Date('2023-11-01T08:45:00.000Z'),
                    updated_by: { connect: { id: User4.id } },
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 6',
                    status: 'Active',
                    file_url: 'https://example.com/file6.csv',
                    created_at: new Date('2023-10-31T08:45:00.000Z'),
                    created_by: { connect: { id: User6.id } },
                    updated_at: new Date('2023-11-01T08:45:00.000Z'),
                    updated_by: { connect: { id: User4.id } },
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
        created_at: new Date('2023-11-01T08:45:00.000Z'),
        created_by: { connect: { id: User7.id } },
        updated_at: new Date('2023-11-04T09:45:00.000Z'),
        updated_by: { connect: { id: User5.id } },
        sensors: {
          create: [
            {
              identifier: 'QR123456',
              type: 'LittObs',
              nbr_measures: 4,
              created_at: new Date('2023-11-01T08:45:00.000Z'),
              created_by: { connect: { id: User7.id } },
              updated_at: new Date('2023-11-04T09:45:00.000Z'),
              updated_by: { connect: { id: User5.id } },
              records: {
                create: [
                  {
                    latitude: '52.5200',
                    longitude: '13.4050',
                    recorded_at: new Date('2023-10-03T16:45:00.000Z'),
                    battery_voltage: 3.8,
                    battery_percentage: 91,
                    pression_ext: 1014.28,
                    temp_ext: 23.5,
                    temp_int: 20.1,
                    temp_sea: [18.7, 18.9, 18.6, 18.7],
                    temp_sea_mean: 18.7,
                    ec_sea: [35.8, 35.9, 35.7, 35.8],
                    ec_sea_mean: 35.8,
                    created_at: new Date('2023-11-01T08:45:00.000Z'),
                    created_by: { connect: { id: User7.id } },
                    updated_at: new Date('2023-11-04T09:45:00.000Z'),
                    updated_by: { connect: { id: User5.id } },
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 7',
                    status: 'Inactive',
                    file_url: 'https://example.com/file7.csv',
                    created_at: new Date('2023-11-01T08:45:00.000Z'),
                    created_by: { connect: { id: User7.id } },
                    updated_at: new Date('2023-11-04T09:45:00.000Z'),
                    updated_by: { connect: { id: User5.id } },
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
        created_at: new Date('2023-09-04T09:45:00.000Z'),
        created_by: { connect: { id: User8.id } },
        updated_at: new Date('2023-09-04T11:45:00.000Z'),
        updated_by: { connect: { id: User6.id } },
        sensors: {
          create: [
            {
              identifier: 'AB123456',
              type: 'LittObs',
              nbr_measures: 5,
              created_at: new Date('2023-09-04T09:45:00.000Z'),
              created_by: { connect: { id: User8.id } },
              updated_at: new Date('2023-09-04T11:45:00.000Z'),
              updated_by: { connect: { id: User6.id } },
              records: {
                create: [
                  {
                    latitude: '41.8781',
                    longitude: '-87.6298',
                    recorded_at: new Date('2023-10-13T10:45:00.000Z'),
                    battery_voltage: 3.6,
                    battery_percentage: 87,
                    pression_ext: 1011.75,
                    temp_ext: 26.8,
                    temp_int: 23.2,
                    temp_sea: [20.5, 20.7, 20.8, 20.6, 20.9],
                    temp_sea_mean: 20.7,
                    ec_sea: [36.2, 36.3, 36.1, 36.1, 36.3],
                    ec_sea_mean: 36.2,
                    created_at: new Date('2023-09-04T09:45:00.000Z'),
                    created_by: { connect: { id: User8.id } },
                    updated_at: new Date('2023-09-04T11:45:00.000Z'),
                    updated_by: { connect: { id: User6.id } },
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 8',
                    status: 'Inactive',
                    file_url: 'https://example.com/file8.csv',
                    created_at: new Date('2023-09-04T09:45:00.000Z'),
                    created_by: { connect: { id: User8.id } },
                    updated_at: new Date('2023-09-04T11:45:00.000Z'),
                    updated_by: { connect: { id: User6.id } },
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
        created_at: new Date('2023-10-04T11:45:00.000Z'),
        created_by: { connect: { id: User4.id } },
        updated_at: new Date('2023-10-23T16:45:00.000Z'),
        updated_by: { connect: { id: User7.id } },
        sensors: {
          create: [
            {
              identifier: 'OP234567',
              type: 'LittObs',
              nbr_measures: 3,
              created_at: new Date('2023-10-04T11:45:00.000Z'),
              created_by: { connect: { id: User4.id } },
              updated_at: new Date('2023-10-23T16:45:00.000Z'),
              updated_by: { connect: { id: User7.id } },
              records: {
                create: [
                  {
                    latitude: '52.2297',
                    longitude: '21.0122',
                    recorded_at: new Date('2022-10-03T16:45:00.000Z'),
                    battery_voltage: 3.6,
                    battery_percentage: 75,
                    pression_ext: 1015.75,
                    temp_ext: 28.2,
                    temp_int: 22.8,
                    temp_sea: [20.0, 20.2, 20.1],
                    temp_sea_mean: 20.1,
                    ec_sea: [36.1, 36.0, 36.2],
                    ec_sea_mean: 36.1,
                    created_at: new Date('2023-10-04T11:45:00.000Z'),
                    created_by: { connect: { id: User4.id } },
                    updated_at: new Date('2023-10-23T16:45:00.000Z'),
                    updated_by: { connect: { id: User7.id } },
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 9',
                    status: 'Inactive',
                    file_url: 'https://example.com/file9.csv',
                    created_at: new Date('2023-10-04T11:45:00.000Z'),
                    created_by: { connect: { id: User4.id } },
                    updated_at: new Date('2023-10-23T16:45:00.000Z'),
                    updated_by: { connect: { id: User7.id } },
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
        created_at: new Date('2023-10-03T16:45:00.000Z'),
        created_by: { connect: { id: User5.id } },
        updated_at: new Date('2023-10-03T23:45:00.000Z'),
        updated_by: { connect: { id: User8.id } },
        sensors: {
          create: [
            {
              identifier: 'MN567890',
              type: 'SensOcean',
              nbr_measures: 3,
              created_at: new Date('2023-10-03T16:45:00.000Z'),
              created_by: { connect: { id: User5.id } },
              updated_at: new Date('2023-10-03T23:45:00.000Z'),
              updated_by: { connect: { id: User8.id } },
              records: {
                create: [
                  {
                    latitude: '40.7128',
                    longitude: '-74.0060',
                    recorded_at: new Date('2022-10-13T16:45:00.000Z'),
                    battery_voltage: 3.7,
                    battery_percentage: 90,
                    pression_ext: 1013.25,
                    temp_ext: 25.5,
                    temp_int: 21.3,
                    temp_sea: [18.5, 19.0, 19.2],
                    temp_sea_mean: 18.9,
                    ec_sea: [35.5, 35.7, 35.9],
                    ec_sea_mean: 35.7,
                    created_at: new Date('2023-10-03T16:45:00.000Z'),
                    created_by: { connect: { id: User5.id } },
                    updated_at: new Date('2023-10-03T23:45:00.000Z'),
                    updated_by: { connect: { id: User8.id } },
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 10',
                    status: 'Inactive',
                    file_url: 'https://example.com/file10.csv',
                    created_at: new Date('2023-10-03T16:45:00.000Z'),
                    created_by: { connect: { id: User5.id } },
                    updated_at: new Date('2023-10-03T23:45:00.000Z'),
                    updated_by: { connect: { id: User8.id } },
                  },
                ],
              },
            },
          ],
        },
      },
    })

    const station_11 = await prisma.station.create({
      data: {
        name: 'Station n°11',
        type: 'Fixed',
        latitude: '40.7128',
        longitude: '-74.0060',
        description: 'Fixed station in New York',
        image_url: 'https://picsum.photos/200/300.jpg',
        created_at: new Date('2023-11-05T10:00:00.000Z'),
        created_by: { connect: { id: User5.id } },
        updated_at: new Date('2023-11-05T11:30:00.000Z'),
        updated_by: { connect: { id: User8.id } },
        sensors: {
          create: [
            {
              identifier: 'NY123456',
              type: 'SensOcean',
              nbr_measures: 2,
              created_at: new Date('2023-11-05T10:00:00.000Z'),
              created_by: { connect: { id: User5.id } },
              updated_at: new Date('2023-11-05T11:30:00.000Z'),
              updated_by: { connect: { id: User8.id } },
              records: {
                create: [
                  {
                    latitude: '40.7128',
                    longitude: '-74.0060',
                    recorded_at: new Date('2023-11-05T10:30:00.000Z'),
                    battery_voltage: 3.6,
                    battery_percentage: 90,
                    pression_ext: 1013.25,
                    temp_ext: 25.5,
                    temp_int: 21.3,
                    temp_sea: [18.5, 19.0, 19.2],
                    temp_sea_mean: 18.9,
                    ec_sea: [35.5, 35.7, 35.9],
                    ec_sea_mean: 35.7,
                    created_at: new Date('2023-11-05T10:30:00.000Z'),
                    created_by: { connect: { id: User5.id } },
                    updated_at: new Date('2023-11-05T11:30:00.000Z'),
                    updated_by: { connect: { id: User8.id } },
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 11',
                    status: 'Inactive',
                    file_url: 'https://example.com/file11.csv',
                    created_at: new Date('2023-11-05T10:30:00.000Z'),
                    created_by: { connect: { id: User5.id } },
                    updated_at: new Date('2023-11-05T11:30:00.000Z'),
                    updated_by: { connect: { id: User8.id } },
                  },
                ],
              },
            },
            {
              identifier: 'NY789012',
              type: 'LittObs',
              nbr_measures: 3,
              created_at: new Date('2023-11-05T10:15:00.000Z'),
              created_by: { connect: { id: User5.id } },
              updated_at: new Date('2023-11-05T11:45:00.000Z'),
              updated_by: { connect: { id: User8.id } },
              records: {
                create: [
                  {
                    latitude: '40.7128',
                    longitude: '-74.0060',
                    recorded_at: new Date('2023-11-05T10:45:00.000Z'),
                    battery_voltage: 3.7,
                    battery_percentage: 91,
                    pression_ext: 1014.28,
                    temp_ext: 25.5,
                    temp_int: 21.3,
                    temp_sea: [18.5, 19.0, 19.2],
                    temp_sea_mean: 18.9,
                    ec_sea: [35.5, 35.7, 35.9],
                    ec_sea_mean: 35.7,
                    created_at: new Date('2023-11-05T10:45:00.000Z'),
                    created_by: { connect: { id: User5.id } },
                    updated_at: new Date('2023-11-05T11:45:00.000Z'),
                    updated_by: { connect: { id: User8.id } },
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 12',
                    status: 'Inactive',
                    file_url: 'https://example.com/file12.csv',
                    created_at: new Date('2023-11-05T10:45:00.000Z'),
                    created_by: { connect: { id: User5.id } },
                    updated_at: new Date('2023-11-05T11:45:00.000Z'),
                    updated_by: { connect: { id: User8.id } },
                  },
                ],
              },
            },
          ],
        },
      },
    })

    const station_12 = await prisma.station.create({
      data: {
        name: 'Station n°12',
        type: 'Fixed',
        latitude: '48.390394',
        longitude: '-4.486076',
        description: 'Fixed station in Brest',
        image_url: 'https://picsum.photos/200/301.jpg',
        created_at: new Date('2023-11-06T10:15:00.000Z'),
        created_by: { connect: { id: User6.id } },
        updated_at: new Date('2023-11-06T11:45:00.000Z'),
        updated_by: { connect: { id: User8.id } },
        sensors: {
          create: [
            {
              identifier: 'NY654321',
              type: 'SensOcean',
              nbr_measures: 3,
              created_at: new Date('2023-11-06T10:30:00.000Z'),
              created_by: { connect: { id: User6.id } },
              updated_at: new Date('2023-11-06T11:30:00.000Z'),
              updated_by: { connect: { id: User8.id } },
              records: {
                create: [
                  {
                    latitude: '48.390394',
                    longitude: '-4.486076',
                    recorded_at: new Date('2023-11-06T10:45:00.000Z'),
                    battery_voltage: 3.8,
                    battery_percentage: 92,
                    pression_ext: 1014.5,
                    temp_ext: 26.0,
                    temp_int: 22.0,
                    temp_sea: [19.0, 19.5, 19.8],
                    temp_sea_mean: 19.4,
                    ec_sea: [36.0, 36.2, 36.4],
                    ec_sea_mean: 36.2,
                    created_at: new Date('2023-11-06T10:45:00.000Z'),
                    created_by: { connect: { id: User6.id } },
                    updated_at: new Date('2023-11-06T11:45:00.000Z'),
                    updated_by: { connect: { id: User8.id } },
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 13',
                    status: 'Active',
                    file_url: 'https://example.com/file13.csv',
                    created_at: new Date('2023-11-06T10:45:00.000Z'),
                    created_by: { connect: { id: User6.id } },
                    updated_at: new Date('2023-11-06T11:45:00.000Z'),
                    updated_by: { connect: { id: User8.id } },
                  },
                ],
              },
            },
            {
              identifier: 'NY987654',
              type: 'LittObs',
              nbr_measures: 4,
              created_at: new Date('2023-11-06T10:30:00.000Z'),
              created_by: { connect: { id: User6.id } },
              updated_at: new Date('2023-11-06T11:30:00.000Z'),
              updated_by: { connect: { id: User8.id } },
              records: {
                create: [
                  {
                    latitude: '48.390394',
                    longitude: '-4.486076',
                    recorded_at: new Date('2023-11-06T10:45:00.000Z'),
                    battery_voltage: 3.9,
                    battery_percentage: 93,
                    pression_ext: 1014.7,
                    temp_ext: 26.5,
                    temp_int: 22.5,
                    temp_sea: [19.2, 19.7, 20.0],
                    temp_sea_mean: 19.6,
                    ec_sea: [36.2, 36.4, 36.6],
                    ec_sea_mean: 36.4,
                    created_at: new Date('2023-11-06T10:45:00.000Z'),
                    created_by: { connect: { id: User6.id } },
                    updated_at: new Date('2023-11-06T11:45:00.000Z'),
                    updated_by: { connect: { id: User8.id } },
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 14',
                    status: 'Active',
                    file_url: 'https://example.com/file14.csv',
                    created_at: new Date('2023-11-06T10:45:00.000Z'),
                    created_by: { connect: { id: User6.id } },
                    updated_at: new Date('2023-11-06T11:45:00.000Z'),
                    updated_by: { connect: { id: User8.id } },
                  },
                ],
              },
            },
            {
              identifier: 'NY123678',
              type: 'LittObs',
              nbr_measures: 4,
              created_at: new Date('2023-11-06T10:30:00.000Z'),
              created_by: { connect: { id: User6.id } },
              updated_at: new Date('2023-11-06T11:30:00.000Z'),
              updated_by: { connect: { id: User8.id } },
              records: {
                create: [
                  {
                    latitude: '48.390394',
                    longitude: '-4.486076',
                    recorded_at: new Date('2023-11-06T10:45:00.000Z'),
                    battery_voltage: 3.9,
                    battery_percentage: 93,
                    pression_ext: 1014.7,
                    temp_ext: 26.5,
                    temp_int: 22.5,
                    temp_sea: [19.2, 19.7, 20.0],
                    temp_sea_mean: 19.6,
                    ec_sea: [36.2, 36.4, 36.6],
                    ec_sea_mean: 36.4,
                    created_at: new Date('2023-11-06T10:45:00.000Z'),
                    created_by: { connect: { id: User6.id } },
                    updated_at: new Date('2023-11-06T11:45:00.000Z'),
                    updated_by: { connect: { id: User8.id } },
                  },
                ],
              },
              files: {
                create: [
                  {
                    name: 'File 15',
                    status: 'Active',
                    file_url: 'https://example.com/file14.csv',
                    created_at: new Date('2023-11-06T10:45:00.000Z'),
                    created_by: { connect: { id: User6.id } },
                    updated_at: new Date('2023-11-06T11:45:00.000Z'),
                    updated_by: { connect: { id: User8.id } },
                  },
                ],
              },
            },
          ],
        },
      },
    })

    console.log(
      station_6,
      station_7,
      station_8,
      station_9,
      station_10,
      station_11,
      station_12,
    )
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
