require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const router = express.Router()
const Message = require('../models/message')
const User = require('../models/user')

router.get('/:uid/:id', async (req, res) => {
  try {
    const uid = mongoose.Types.ObjectId(req.params.uid)
    const id = mongoose.Types.ObjectId(req.params.id)

    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { $and: [ { 'sender': uid }, { 'receiver': id } ] },
            { $and: [ { 'receiver': uid }, { 'sender': id } ] }
          ]
        }
      },
      {
        $sort: {
          'content.date': -1
        }
      }
    ])

    res.json(messages)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:uid', async (req, res) => {
  try {
    const uid = req.params.uid
    const lastMessages = await User.aggregate([
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
      },
      {
        $lookup: {
          from: 'messages',
          localField: '_id',
          foreignField: 'sender',
          as: 'senderMessages'
        }
      },
      {
        $lookup: {
          from: 'messages',
          localField: '_id',
          foreignField: 'receiver',
          as: 'receiverMessages'
        }
      },
      {
        $addFields: {
          messages: {
            $concatArrays: ['$senderMessages', '$receiverMessages']
          }
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          firstname: 1,
          lastname: 1,
          picture: 1,
          sortedMessages: {
            $filter: {
              input: '$messages',
              as: 'message',
              cond: {
                $or: [
                  { $eq: ['$$message.sender', mongoose.Types.ObjectId(uid)] },
                  { $eq: ['$$message.receiver', mongoose.Types.ObjectId(uid)] }
                ]
              }
            }
          }
        }
      },
      {
        $addFields: {
          lastMessage: {
            $arrayElemAt: ['$sortedMessages', -1]
          }
        }
      },
      {
        $project: {
          senderMessages: 0,
          receiverMessages: 0
        }
      },
      {
        $sort: {
          'lastMessage.content.date': -1
        }
      }
    ])
    res.json(lastMessages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  const message = new Message({
    sender: mongoose.Types.ObjectId(req.body.sender),
    receiver: mongoose.Types.ObjectId(req.body.receiver),
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

router.patch('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
    if (message === null) {
      return res.status(404).json({ message: 'Cannot find message' })
    }
    if (req.body.content !== null) {
      message.content.text = req.body.content.text
    }
    console.log('Message', message)
    const updatedMessage = await message.save()
    res.json(updatedMessage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
    if (message === null) {
      return res.status(404).json({ message: 'Cannot find message' })
    }
    await message.remove()
    res.json({ message: 'Deleted message' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
