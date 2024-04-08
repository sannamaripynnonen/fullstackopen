const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test.only('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test.only('blogs are identified by id', async () => {
    const response = await api.get('/api/blogs')

    if (response.body.length > 0) {
        assert.ok(response.body[0].id != undefined)
    } else {
        assert.fail('No blogs returned')
    }
})

test.only('new blog is added', async () => {
    const newBlog = {
        title: 'New blog title',
        author: 'New blog author',
        url: 'https://example.com/',
        likes: 2
    }

    const initialBlogs = (await api.get('/api/blogs')).body

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length +1)
})


after(async () => {
    await mongoose.connection.close()
})