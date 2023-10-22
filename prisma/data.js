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
