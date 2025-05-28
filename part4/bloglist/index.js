const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

const app = express()

const mongoUrl = 'mongodb+srv://fullstack:learningmongo@cluster0.mrk1y3h.mongodb.net/blogListApp?retryWrites=true&w=majority&appName=Cluster0'
mongoose
  .connect(mongoUrl)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.error(`error connecting to MongoDB ${error.message}`))

app.use(express.json())

app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
