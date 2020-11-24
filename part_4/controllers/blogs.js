// Route handlers
`
The event handlers of routes are commonly referred to as controllers, 
and for this reason we have created the controllers directory. 
All of the routes related to blogs are now in the blogs.js module 
under the controllers directory.
`
const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blogReturned = await Blog.findById(request.params.id)
    response.json(blogReturned)
})

// Bearer scheme
// Bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW

// A new note can now be created using Postman if the authorization header is given the correct value, 
// the string bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ, 
// where the second value is the token returned by the login operation.
// login with userX & get auth token
// pass auth token as Authorization in Headers in Postman. Value bearer authTokenxxxxx
// body has to include userId

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }
//     return null
// }

blogsRouter.post('/', async (request, response, next) => {

    const body = request.body
    if (body.title === undefined || body.url === undefined) {
        return response.status(400).end()
    }
    // Before refactoring
    // const token = getTokenFrom(request)
    // const decodedToken = jwt.verify(token, process.env.SECRET)
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)

        // Before token auth
        // const user = await User.findById(body.userId)
        // console.log('body in blogs:', body)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            user: user._id,
            url: body.url,
            likes: body.likes || 0
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(savedBlog)
    } catch (error) {
        // response.status(400).json(error)
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    try {
        const blog = await Blog.findById(request.params.id)

        if (blog.user.toString() === decodedToken.id.toString()) {
            await blog.remove()
            response.status(204).end()
        } else {
            response.status(401).end()
        }
    } catch (e) {
        next(e)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog.toJSON())
        })
        .catch(error => next(error))
})

module.exports = blogsRouter