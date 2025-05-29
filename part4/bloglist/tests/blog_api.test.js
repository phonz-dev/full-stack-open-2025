const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
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
  const blog = {
    title: "How to learn fullstack development",
    author: "Alphonzo Escolar",
    url: "https://computernerds.com/",
    likes: 101,
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  let response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  const titles = response.body.map(({ title }) => title)
  assert(titles.includes('How to learn fullstack development'))
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

test.only('responds with 400 status code if the title or url properties are missing', async () => {
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

after(() => {
  mongoose.connection.close()
})
