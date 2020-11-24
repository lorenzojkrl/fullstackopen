const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')

const Blog = require('../models/bloglist')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))

    let promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('When there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    // To be reviewed because the array may contain a single undefined and pass the test
    test('all blogs have an id', async () => {
        const response = await api.get('/api/blogs')
        // console.log(response.body)
        // response.body.map(c => console.log((c.id)))
        expect(response.body.map(c => c.id)).toBeDefined()
    })
})

describe('Addition of a new blog', () => {
    // Step3: HTTP POST request creates a new blog post.
    test('succeed with valid data & auth', async () => {

        const token = await helper.getNewUserToken(api)
        const newBlog = {
            title: 'Jam and Pearls',
            author: 'Sineco',
            url: 'jampearls.com',
            likes: 50
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // Validate a new blog added
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        // Validate title added
        const title = blogsAtEnd.map(blog => blog.title)
        expect(title).toContain('Jam and Pearls')
    })

    // Step4: if request misses likes property, default to 0
    test('without likes property, it default to 0', async () => {
        const token = await helper.getNewUserToken(api)
        const newBlogNoLikes = {
            title: 'Zero Calcare',
            author: 'Calcare',
            url: 'zarocalcare.com',
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlogNoLikes)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        // Contains likes = 0?
        expect(response.body.likes).toBe(0)
    })

    // Step5: if title & url are missing, backend responds status 400
    test('fails with status 400 if title is missing', async () => {
        const newBlogNoTitle = await helper.nonExistingTitle()

        await api
            .post('/api/blogs')
            .send(newBlogNoTitle)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('fails with status 400 if url is missing', async () => {
        const newBlogNoUrl = await helper.nonExistingUrl()

        // console.log(newBlogNoUrl)
        await api
            .post('/api/blogs')
            .send(newBlogNoUrl)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('Deletion of a single blog', () => {
    // tests for removing an individual note
    test('succeed with status 204 if id is valid', async () => {
        const token = await helper.getNewUserToken(api)

        const blogsAtStart = await helper.blogsInDb()
        // console.log(blogsAtStart)

        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}/`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        // Validate the blog is removed
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    })
})

describe('Updating the information of an individual blog post', () => {
    test('succeed with valid data', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[2]

        const updatedBlog = {
            title: 'Mamma Mia Abba!',
            author: 'Abba',
            url: 'abba.com',
            likes: 250
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

describe('when there is initially one user in db', () => {
    // rm everyone & create new username: root sekret
    beforeEach(async () => {
        await User.deleteMany({})

        let passwordHash = await bcrypt.hash('sekret', 10)
        let user = new User({ username: 'root', passwordHash })
        await user.save()


    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // console.log('newUser', )

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        // console.log('usersAtEnd: ', usersAtEnd.length)

        const usernames = usersAtEnd.map(u => u.username)
        // console.log('usernames: ', usernames)

        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')
        // console.log(result.body) 

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if username is shorter than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mo',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        // console.log(result.body)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if password is shorter than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mommy',
            name: 'Superuser',
            password: 's',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        // console.log(result.body)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})