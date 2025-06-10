const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { tokenExtractor, userExtractor } = require('../utils/middleware');


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes || 0,
    comments: []
  })

  const savedBlog = await blog.save()
  const populatedBlog = await savedBlog.populate('user', { name: 1, username: 1 })
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()
  response.status(201).json(populatedBlog)
})

blogsRouter.post('/:id', async (request, response) => {
  const { comments } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!comments) {
    return response.status(400).json({ error: 'comment field missing' })
  }

  blog.comments = [...comments]

  const savedBlog = await blog.save()
  response.json(savedBlog)
})

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(400).json({ error: 'unauthorize request' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) return response.status(404).end()

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const savedBlog = await blog.save()
  const populatedBlog = await savedBlog.populate('user', { name: 1, username: 1 })

  response.json(populatedBlog)
})

module.exports = blogsRouter
