require('dotenv').config()

const express = require('express')
const router = express.Router()
const Message = require('../models/message')
const User = require('../models/user')

router.get('/:uid/:id', async (req, res) => {
  try {
    const uid = req.params.uid
    const id = req.params.id

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

    console.log('Messages', messages)
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

    // const lastMessage = await Message.find({
    //   $or: [
    //     { $and: [ { 'sender': uid }, { 'receiver': { $in: userIds } } ] },
    //     { $and: [ { 'receiver': uid }, { 'sender': { $in: userIds } } ] }
    //   ]
    // }).sort({ 'content.date': -1 }).limit(1)
    
    // console.log('Ids de contactos')
    // console.log(userIds)

    const lastMessageIds = []
    for (const userId of userIds) {
      const message = await Message.find({
        $or: [
          { sender: uid, receiver: userId },
          { sender: userId, receiver: uid }
        ]
      }).sort({ "content.date": -1 }).limit(1);
      
      lastMessageIds.push(message[0]._id);
    } 

    console.log('Ultimos Ids mensajes de cada contacto')
    console.log(lastMessageIds)

    const lastMessage = await Message.find({
      '_id': { $in:  lastMessageIds} 
      })
    
    console.log('Ultimos mensajes de cada contacto')
    console.log(lastMessage)

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
    // console.log('Mensajes')
    // console.log(lastMessageResponse)
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

router.patch('/:id', async (req, res) => {
  try {
    console.log('So yeah request is happening')
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
