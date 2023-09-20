const { hash } = require('bcrypt')

const stations = [
  {
    name: 'Station n°1',
    type: 'mobile',
  },
  {
    name: 'Station n°2',
    type: 'mobile',
  },
  {
    name: 'Station n°3',
    type: 'fixed',
  },
]

const stationWithSensors = {
  name: 'Station with sensors',
  type: 'fixed',
  sensors: {
    create: [
      { identifier: 'AA333302' },
      { identifier: 'AS322122' }, 
    ],
  },
};

const sensors = [
  {
    identifier: 'AB123345',
  },
  {
    identifier: 'CD343344',
  },
  {
    identifier: 'ER344344',
  },
]

const getUsers = async () => {
  const password = await hash('hi123', 12)
  return [
    {
      name: 'Gabriel',
      password,
      email: 'gabriel@gmail.com',
    },
    {
      name: 'Emma',
      password,
      email: 'emma@gmail.com',
    },
    {
      name: 'Felipe', 
      password: (await hash('123', 12)).toString(), 
      email: 'felipelobato99@hotmail.com'},
  ]
}

module.exports = {
  stations,
  sensors,
  stationWithSensors,
  getUsers,
}
