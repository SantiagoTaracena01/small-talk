require('dotenv').config()

const express = require('express')
const router = express.Router()

users = [
  {
    _id: 1,
    username: 'Hollow',
    tag: '0001',
    firstName: 'Santiago',
    lastName: 'Taracena',
    password: '1234',
  },
  {
    _id: 2,
    username: 'Gjandi',
    tag: '0007',
    firstName: 'Gabriel',
    lastName: 'Vicente',
    password: 'miguate',
  },
  {
    _id: 3,
    username: 'Mxrk122',
    tag: '6666',
    firstName: 'Marco',
    lastName: 'Orozco',
    password: 'jpegmafia',
  },
]

router.get('/', (req, res) => {
  res.json(users)
})

router.get('/:id', (req, res) => {
  const user = users.find((user) => (user._id === parseInt(req.params.id)))
  if (!user) res.status(404).send('The user with the given ID was not found.')
  res.send(user)
})

module.exports = router
