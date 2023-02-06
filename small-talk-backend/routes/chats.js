require('dotenv').config()

const express = require('express')
const router = express.Router()
const Chat = require('../models/chat')

router.get('/', async (req, res) => {
  try {
    const chats = await Chat.find()
    res.json(chats)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const chats = await Chat.find({ users: req.params.id })
    res.json(chats)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
