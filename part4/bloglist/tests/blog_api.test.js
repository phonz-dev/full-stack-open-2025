const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('chiklet', 10)
  const user = new User({ username: 'fonzeus', name: 'Alphonzo Escolar', passwordHash })
  await user.save()
})

test('all blogs are returned', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('all blogs has an \'id\' parameter', async () => {
  const response = await api.get('/api/blogs')

  assert(response.body.every((blog) => blog.id !== undefined))
  assert(response.body.every((blog) => blog._id === undefined))
})

test('successfully creates a valid blog', async () => {
  const loginResponse = await api.post('/api/login').send({ username: 'fonzeus', password: 'chiklet' })

  const blog = {
    title: "How to learn fullstack development",
    author: "Alphonzo Escolar",
    url: "https://computernerds.com/",
    likes: 101,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${loginResponse.body.token}`)
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')
  assert.strictEqual(blogsAtEnd.body.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.body.map(({ title }) => title)
  assert(titles.includes('How to learn fullstack development'))
})

test('creation fails and returns 401 status code if token was not provided', async () => {
  const blog = {
    title: "How to learn fullstack development",
    author: "Alphonzo Escolar",
    url: "https://computernerds.com/",
    likes: 101,
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  let blogsAtEnd = await api.get('/api/blogs')
  assert.strictEqual(blogsAtEnd.body.length, helper.initialBlogs.length)
})

test('if likes property is missing, likes\' value default to zero', async () => {
  const blog = {
    title: "How to be a millionaire",
    author: "Grant Cardone",
    url: "https://grantcardone.com/",
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.post('/api/blogs').send(blog)

  assert.strictEqual(response.body.likes, 0)
})

test('responds with 400 status code if the title or url properties are missing', async () => {
  let blog = {
    author: "Grant Cardone",
    url: "https://grantcardone.com/",
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

  blog = {
    title: "How to be a millionaire",
    author: "Grant Cardone",
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('deletes a specific blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(({ title }) => title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('updates a specific blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatedBlog = {
    ...blogToUpdate,
    author: 'Chloe San Jose'
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const authors = blogsAtEnd.map(({ author }) => author)
  assert(authors.some((author) => author === updatedBlog.author))
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'super user', passwordHash })
    await user.save()
  })

  test('creation fails with proper status code and error message if the username is invalid', async () => {
    const usersAtStart = await User.find({})

    const userWithInvalidUsername = {
      username: 'je',
      name: 'Gerald',
      password: 'random'
    }

    const response = await api
      .post('/api/users')
      .send(userWithInvalidUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    assert(response.body.error.includes(`Path \`username\` (\`${userWithInvalidUsername.username}\`) is shorter than the minimum allowed length`))
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('creation fails with proper status code and error message if the name is invalid', async () => {
    const usersAtStart = await User.find({})

    const userWithInvalidName = {
      username: 'jejemon',
      name: 'Ge',
      password: 'random'
    }

    const response = await api
      .post('/api/users')
      .send(userWithInvalidName)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    assert(response.body.error.includes(`Path \`name\` (\`${userWithInvalidName.name}\`) is shorter than the minimum allowed length`))
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })
})


after(() => {
  mongoose.connection.close()
})
