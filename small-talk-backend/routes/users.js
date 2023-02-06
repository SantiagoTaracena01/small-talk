require('dotenv').config()

const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    password: req.body.password,
    contacts: [],
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
