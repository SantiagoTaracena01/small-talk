require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Chat = require('../models/chat')
const User = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const chats = await Chat.find()
    res.json(chats)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:uid', async (req, res) => {
  try {
    const uid = req.params.uid
    console.log(uid)
    // userid
    // User.contacts = [...]
    // Match User donde User.contacts contiene userid
    const users = await User.aggregate([
      {
        '$match': {
          '$expr': {
            '$in': [mongoose.Types.ObjectId(uid), '$contacts']
          }
        }
      }
    ])
    console.log(users)
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
