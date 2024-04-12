const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app