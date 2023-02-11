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
    picture: req.body.picture,
    logged: false,
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

router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (req.body.firstname !== null) {
      user.firstname = req.body.firstname
    }
    if (req.body.lastname !== null) {
      user.lastname = req.body.lastname
    }
    if (req.body.password !== null) {
      user.password = req.body.password
    }
    if (req.body.picture !== null) {
      user.picture = req.body.picture
    }
    if (req.body.logged !== null) {
      user.logged = req.body.logged
    }
    const updatedUser = await user.save()
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
