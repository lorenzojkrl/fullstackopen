// require('dotenv').config()
const app = require('./app') // The actual Express app is now here
const http = require('http')
// const express = require('express') // from app.js
// const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)
// const cors = require('cors')

// const mongoose = require('mongoose')
// const Blog = require('./models/bloglist')

// console.log('config.PORT in index: ', config.PORT)

// app.use(cors())
// app.use(express.json())

// const blogTest = new Blog({
//     title: 'howtocookcarbonara.com',
//     author: 'Lorenzo',
//     url: "https://www.carbonaraworld.com",
//     likes: 1000
// })

// Test
// blogTest.save()
//     .then(result => {
//         console.log(`Blog ${blogTest.title} saved`)
//         mongoose.connection.close()
//     })


// app.get('/', (request, response) => {
//     response.send(`<h1>Hello, World!</h1>`)
// })

// app.get('/api/blogs', (request, response) => {
//     Blog
//         .find({})
//         .then(blogs => {
//             response.json(blogs)
//         })
// })

// app.post('/api/blogs', (request, response) => {
//     const blog = new Blog(request.body)

//     blog
//         .save()
//         .then(result => {
//             response.status(201).json(result)
//         })
// })


// const PORT = process.env.PORT || 3003
server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})