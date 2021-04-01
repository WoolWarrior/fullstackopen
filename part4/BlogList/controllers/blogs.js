const blogsRouter = require('express').Router()
// const { response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const token = request.token
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog(request.body)

  blog.user = user._id

  const blogPosted = await blog.save()

  user.blogs = user.blogs.concat(blogPosted._id)
  await user.save()

  response.status(201).json(blogPosted)
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()){
    const blogToRemove = await Blog.findByIdAndRemove(request.params.id)
    blogToRemove ?
      response.status(204).end() :
      response.status(404).end()
  } else {
    return response.status(401).json({ error: 'token missing or invalid for delete' })
  }

  
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const objectId = mongoose.Types.ObjectId(body.id)
  const filter = { _id: objectId }
  const updated = { likes: body.likes }

  const opts = {
    runValidators: true,
    new: true
  }

  const updatedBlog = await Blog.findOneAndUpdate(filter, updated, opts)
  updatedBlog ?
    response.json(updated) :
    response.status(404).end()
})

module.exports = blogsRouter