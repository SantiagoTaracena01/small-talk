require('dotenv').config()

const express = require('express')
const router = express.Router()
const Message = require('../models/message')
const User = require('../models/user')

router.get('/:uid/:id', async (req, res) => {
  try {
    const uid = req.params.uid
    const id = req.params.id

    const messages = await Message.find({
      $or: [
        { $and: [ { 'sender': uid }, { 'receiver': id } ] },
        { $and: [ { 'receiver': uid }, { 'sender': id } ] }
      ]
    }).sort({ 'content.date': -1 })

    console.log(messages)
    res.json(messages)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:uid', async (req, res) => {
  try {
    const uid = req.params.uid
    const users = await User.aggregate([
      {
        $match: {
          $expr: {
            $in: [uid, '$contacts']
          }
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          firstname: 1,
          lastname: 1,
          picture: 1
        }
      }
    ])
    
    const userIds = users.map(user => user._id)

    const lastMessage = await Message.find({
      $or: [
        { $and: [ { 'sender': uid }, { 'receiver': { $in: userIds } } ] },
        { $and: [ { 'receiver': uid }, { 'sender': { $in: userIds } } ] }
      ]
    }).sort({ 'content.date': -1 }).limit(1)

    const lastMessageResponse = users.map(user => {
      const message = lastMessage.find(m => m.sender === user._id.toString() || m.receiver === user._id.toString());
      return {
        _id: user._id,
        picture: user.picture,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        message: message || {}
      }
    })
    res.json(lastMessageResponse)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  const message = new Message({
    sender: req.body.sender,
    receiver: req.body.receiver,
    content: {
      text: req.body.content.text,
      date: new Date()
    }
  })
  try {
    const newMessage = await message.save()
    res.status(201).json(newMessage)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
