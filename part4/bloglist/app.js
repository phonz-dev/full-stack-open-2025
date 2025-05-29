require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')

const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error(`error connecting to MongoDB ${error.message}`))

app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
