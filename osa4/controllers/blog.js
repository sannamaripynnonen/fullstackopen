const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogRouter.post('/', (request, response) => {
    const body = request.body

    if (!body.title) {
      return response.status(400).json({error: 'Title is required'})
    } else if (!body.url) {
      return response.status(400).json({error: 'Url is required'})
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    })
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogRouter