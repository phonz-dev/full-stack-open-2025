const loginRouter = require('express').Router()
const config = require('../utils/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(400).end({ error: 'invalid username or password' })
  }

  const userForToken = {
    name: user.name,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.SECRET)
  response.status(200).json({ token, name: user.name, username: user.username })
})

module.exports = loginRouter
