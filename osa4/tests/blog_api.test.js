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

after(async () => {
    await mongoose.connection.close()
})