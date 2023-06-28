import bcrypt from 'bcryptjs'

import User from '../database/models/userModels.js'     

User.create({
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'password123',
  false: false,
  location: 'New York'
})

User.create({
  name: 'Jane Doe',
  email: 'janedoe@example.com',
  password:bcrypt.hashSync( 'password456'),
  false: true,
  location: 'Los Angeles'
})

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10)
  }
]

export default users
