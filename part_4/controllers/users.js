const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.username === undefined) {
    return response.status(400).json({ error: 'The username is missing' })
  }
  if (body.password === undefined) {
    return response.status(400).json({ error: 'The password is missing' })
  }

  if (body.username.length < 3) {
    return response.status(400).json({ error: 'The username must have at least 3 characters' })
  }
  if (body.password.length < 3) {
    return response.status(400).json({ error: 'The password must have at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  console.log(savedUser)
  response.json(savedUser)
})

module.exports = usersRouter