const { hash } = require('bcrypt')

const stations = [
  {
    name: 'Station n°1',
    type: 'Mobile',
    audit: {
      created_at: new Date('2023-10-23T08:00:00Z'),
      created_by: 'User1',
      updated_at: new Date('2023-10-23T10:30:00Z'),
      updated_by: 'User1',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    description: 'Mobile station in New York City',
    image_url: 'https://picsum.photos/200/300.jpg',
  },
  {
    name: 'Station n°2',
    type: 'Fixed',
    audit: {
      created_at: new Date('2023-10-22T08:00:00Z'),
      created_by: 'User13',
      updated_at: new Date('2023-10-23T10:30:00Z'),
      updated_by: 'User2',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    latitude: '34.0522',
    longitude: '-118.2437',
    description: 'Fixed station in Los Angeles',
    image_url: 'https://picsum.photos/200/300.jpg',
  },
  {
    name: 'Station n°3',
    type: 'Fixed',
    audit: {
      created_at: new Date('2023-10-21T08:00:00Z'),
      created_by: 'User3',
      updated_at: new Date('2023-10-24T10:30:00Z'),
      updated_by: 'User1',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    latitude: '48.8566',
    longitude: '2.3522',
    description: 'Fixed station in Paris',
    image_url: 'https://picsum.photos/200/300.jpg',
  },
  {
    name: 'Station n°4',
    type: 'Mobile',
    audit: {
      created_at: new Date('2023-10-20T08:00:00Z'),
      created_by: 'User1',
      updated_at: new Date('2023-11-23T10:30:00Z'),
      updated_by: 'User2',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    description: 'Mobile station in Tokyo',
    image_url: 'https://picsum.photos/200/300.jpg',
  },
  {
    name: 'Station n°5',
    type: 'Fixed',
    audit: {
      created_at: new Date('2023-10-26T08:00:00Z'),
      created_by: 'Gabriel',
      updated_at: new Date('2023-10-26T10:30:00Z'),
      updated_by: 'Gabriel',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    latitude: '41.8781',
    longitude: '-87.6298',
    description: 'Fixed station in Chicago',
    image_url: 'https://picsum.photos/200/300.jpg',
  },
]

const sensors = [
  {
    identifier: 'AB123345',
    type: 'LittObs',
    audit: {
      created_at: new Date('2023-10-26T08:00:00Z'),
      created_by: 'Gabriel',
      updated_at: new Date('2023-10-26T10:30:00Z'),
      updated_by: 'Gabriel',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    nbr_measures: 5,
  },
  {
    identifier: 'CD343344',
    type: 'SensOcean',
    audit: {
      created_at: new Date('2023-10-26T08:00:00Z'),
      created_by: 'Gabriel',
      updated_at: new Date('2023-10-26T10:30:00Z'),
      updated_by: 'Gabriel',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    nbr_measures: 3,
  },
  {
    identifier: 'ER344344',
    type: 'LittObs',
    audit: {
      created_at: new Date('2023-10-26T08:00:00Z'),
      created_by: 'Gabriel',
      updated_at: new Date('2023-10-26T10:30:00Z'),
      updated_by: 'Gabriel',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    nbr_measures: 5,
  },
  {
    identifier: 'XY987654',
    type: 'LittObs',
    audit: {
      created_at: new Date('2023-10-26T08:00:00Z'),
      created_by: 'Gabriel',
      updated_at: new Date('2023-10-26T10:30:00Z'),
      updated_by: 'Gabriel',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    nbr_measures: 4,
  },
  {
    identifier: 'ZW543210',
    type: 'SensOcean',
    audit: {
      created_at: new Date('2023-10-26T08:00:00Z'),
      created_by: 'Gabriel',
      updated_at: new Date('2023-10-26T10:30:00Z'),
      updated_by: 'Gabriel',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    nbr_measures: 3,
  },
  {
    identifier: 'JK765432',
    type: 'LittObs',
    audit: {
      created_at: new Date('2023-10-26T08:00:00Z'),
      created_by: 'Gabriel',
      updated_at: new Date('2023-10-26T10:30:00Z'),
      updated_by: 'Gabriel',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    nbr_measures: 3,
  },
]

const records = [
  {
    audit: {
      created_at: new Date('2023-10-26T08:00:00Z'),
      created_by: 'Gabriel',
      updated_at: new Date('2023-10-26T10:30:00Z'),
      updated_by: 'Gabriel',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    latitude: '34.0522',
    longitude: '-118.2437',
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
  {
    audit: {
      created_at: new Date('2023-10-26T08:00:00Z'),
      created_by: 'Gabriel',
      updated_at: new Date('2023-10-26T10:30:00Z'),
      updated_by: 'Gabriel',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    latitude: '48.8566',
    longitude: '2.3522',
    recorded_at: new Date(),
    battery_voltage: 3.6,
    battery_percentage: 87,
    pression_ext: 1011.75,
    temp_ext: 26.8,
    temp_int: 23.2,
    temp_sea: [20.5, 20.7, 20.8],
    temp_sea_mean: 20.7,
    ec_sea: [36.2, 36.3, 36.1],
    ec_sea_mean: 36.2,
  },
]

const files = [
  {
    name: 'File 1',
    audit: {
      created_at: new Date('2023-10-26T08:00:00Z'),
      created_by: 'Gabriel',
      updated_at: new Date('2023-10-26T10:30:00Z'),
      updated_by: 'Gabriel',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    status: 'Active',
    file_url: 'https://example.com/file1.csv',
  },
  {
    name: 'File 2',
    audit: {
      created_at: new Date('2023-10-26T08:00:00Z'),
      created_by: 'Gabriel',
      updated_at: new Date('2023-10-26T10:30:00Z'),
      updated_by: 'Gabriel',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    status: 'Inactive',
    file_url: 'https://example.com/file2.csv',
  },
  {
    name: 'File 3',
    audit: {
      created_at: new Date('2023-10-26T08:00:00Z'),
      created_by: 'Gabriel',
      updated_at: new Date('2023-10-26T10:30:00Z'),
      updated_by: 'Gabriel',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    status: 'Active',
    file_url: 'https://example.com/file3.csv',
  },
  {
    name: 'File 4',
    audit: {
      created_at: new Date('2023-10-26T08:00:00Z'),
      created_by: 'Gabriel',
      updated_at: new Date('2023-10-26T10:30:00Z'),
      updated_by: 'Gabriel',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    status: 'Active',
    file_url: 'https://example.com/file4.csv',
  },
  {
    name: 'File 5',
    audit: {
      created_at: new Date('2023-10-26T08:00:00Z'),
      created_by: 'Gabriel',
      updated_at: new Date('2023-10-26T10:30:00Z'),
      updated_by: 'Gabriel',
      deleted_at: null, // No deletion yet
      deleted_by: null, // No deletion yet
    },
    status: 'Inactive',
    file_url: 'https://example.com/file5.csv',
  },
]

const organisations = [
  {
    name: 'Environmental Research Institute',
    description:
      'A leading institute dedicated to researching and addressing environmental challenges.',
  },
]

const getUsers = async () => {
  const password = await hash('hi123', 12)
  return [
    {
      name: 'Gabriel',
      password,
      email: 'gabriel@gmail.com',
      avatar_url: 'https://picsum.photos/200/300.jpg',
    },
    {
      name: 'Emma',
      password,
      email: 'emma@gmail.com',
      avatar_url: 'https://picsum.photos/200/300.jpg',
    },
    {
      name: 'Felipe',
      password: (await hash('123', 12)).toString(),
      email: 'felipelobato99@hotmail.com',
      avatar_url: 'https://picsum.photos/200/300.jpg',
    },
  ]
}

module.exports = {
  stations,
  sensors,
  records,
  files,
  organisations,
  getUsers,
}
