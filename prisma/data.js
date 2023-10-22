const { hash } = require('bcrypt')

const stations = [
  {
    name: 'Station n°1',
    type: 'Mobile',
    latitude: '40.7128',
    longitude: '-74.0060',
    description: 'Mobile station in New York City',
    image_url: 'https://example.com/station1.jpg',
  },
  {
    name: 'Station n°2',
    type: 'Mobile',
    latitude: '34.0522',
    longitude: '-118.2437',
    description: 'Mobile station in Los Angeles',
    image_url: 'https://example.com/station2.jpg',
  },
  {
    name: 'Station n°3',
    type: 'Fixed',
    latitude: '48.8566',
    longitude: '2.3522',
    description: 'Fixed station in Paris',
    image_url: 'https://example.com/station3.jpg',
  },
  {
    name: 'Station n°4',
    type: 'Mobile',
    latitude: '35.682839',
    longitude: '139.759455',
    description: 'Mobile station in Tokyo',
    image_url: 'https://example.com/station4.jpg',
  },
  {
    name: 'Station n°5',
    type: 'Fixed',
    latitude: '41.8781',
    longitude: '-87.6298',
    description: 'Fixed station in Chicago',
    image_url: 'https://example.com/station5.jpg',
  },
]

const sensors = [
  {
    identifier: 'AB123345',
    type: 'LittObs',
    nbr_measures: 800,
  },
  {
    identifier: 'CD343344',
    type: 'SensOcean',
    nbr_measures: 900,
  },
  {
    identifier: 'ER344344',
    type: 'LittObs',
    nbr_measures: 1000,
  },
  {
    identifier: 'XY987654',
    type: 'LittObs',
    nbr_measures: 950,
  },
  {
    identifier: 'ZW543210',
    type: 'SensOcean',
    nbr_measures: 700,
  },
  {
    identifier: 'JK765432',
    type: 'LittObs',
    nbr_measures: 850,
  },
]

const records = [
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
  {
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
    latitude: '41.8781',
    longitude: '-87.6298',
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
  {
    latitude: '51.5074',
    longitude: '0.1278',
    recorded_at: new Date(),
    battery_voltage: 3.8,
    battery_percentage: 91,
    pression_ext: 1014.28,
    temp_ext: 23.5,
    temp_int: 20.1,
    temp_sea: [18.7, 18.9, 18.6],
    temp_sea_mean: 18.7,
    ec_sea: [35.8, 35.9, 35.7],
    ec_sea_mean: 35.8,
  },
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
]

const files = [
  {
    name: 'File 1',
    update_date: new Date(),
    status: 'Active',
    file_url: 'https://example.com/file1.csv',
  },
  {
    name: 'File 2',
    update_date: new Date(),
    status: 'Inactive',
    file_url: 'https://example.com/file2.csv',
  },
  {
    name: 'File 3',
    update_date: new Date(),
    status: 'Active',
    file_url: 'https://example.com/file3.csv',
  },
  {
    name: 'File 4',
    update_date: new Date(),
    status: 'Active',
    file_url: 'https://example.com/file4.csv',
  },
  {
    name: 'File 5',
    update_date: new Date(),
    status: 'Inactive',
    file_url: 'https://example.com/file5.csv',
  },
  {
    name: 'File 6',
    update_date: new Date(),
    status: 'Active',
    file_url: 'https://example.com/file6.csv',
  },
  {
    name: 'File 7',
    update_date: new Date(),
    status: 'Active',
    file_url: 'https://example.com/file7.csv',
  },
  {
    name: 'File 8',
    update_date: new Date(),
    status: 'Inactive',
    file_url: 'https://example.com/file8.csv',
  },
]

const organisations = [
  {
    name: 'Environmental Research Institute',
    description:
      'A leading institute dedicated to researching and addressing environmental challenges.',
  },
  {
    name: 'Tech Innovators for Sustainability',
    description:
      'A tech organization focused on sustainable solutions and environmental data analysis.',
  },
]

const getUsers = async () => {
  const password = await hash('hi123', 12)
  return [
    {
      name: 'Gabriel',
      password,
      email: 'gabriel@gmail.com',
      image_url: 'https://example.com/gabriel.jpg',
    },
    {
      name: 'Emma',
      password,
      email: 'emma@gmail.com',
      image_url: 'https://example.com/emma.jpg',
    },
    {
      name: 'Felipe',
      password: (await hash('123', 12)).toString(),
      email: 'felipelobato99@hotmail.com',
      image_url: 'https://example.com/felipe.jpg',
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
