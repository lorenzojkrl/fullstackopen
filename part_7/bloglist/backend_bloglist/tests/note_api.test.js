const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const apiHelper = require('../utils/note_api_helper')

const Blog = require('../models/blog')
const User = require('../models/user')


// In order to make our tests more robust, we have to reset the database and
// generate the needed test data in a controlled manner before we run the tests.
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = apiHelper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArrayBlogs = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArrayBlogs)

  // Use
  // for (let note of helper.initialNotes) {
  //   let noteObject = new Note(note)
  //   await noteObject.save()
  // }
  // when the promises should be executed in a particular order
})

describe('When there are some blogs saved', () => {
  // step 4.8
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(apiHelper.initialBlogs.length)
  })

  test('one of them is about browsers', async () => {
    const response = await api.get('/api/blogs')

    // The next line requires promises to be executed withing for...of
    // expect(response.body[0].title).toBe('HTML is easy')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'Browser can execute only Javascript'
    )
  })

  // step 4.9
  test('the unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('Addition of a new blog', () => {
  // Step 4.10: HTTP POST request creates a new blog post.
  test('succeeds with valid data & auth', async () => {

    const token = await apiHelper.getNewUserToken(api)

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

    // Validate length + 1
    const blogsAtEnd = await apiHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(apiHelper.initialBlogs.length + 1)
    // Validate title added
    const title = blogsAtEnd.map(blog => blog.title)
    expect(title).toContain('Jam and Pearls')
  })

  // Step 4.11
  test('without likes property, it defaults to 0', async () => {

    const token = await apiHelper.getNewUserToken(api)

    const newBlogNoLikes = {
      title: 'Zero Calcare',
      author: 'Calcare',
      url: 'zarocalcare.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlogNoLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await apiHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(apiHelper.initialBlogs.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  // Step 4.12
  test('fails with status 400 if title is missing', async () => {

    const token = await apiHelper.getNewUserToken(api)

    const newBlogNoTitle = {
      author: 'Calcare',
      url: 'calcare.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlogNoTitle)
      .expect(400)

    const blogsAtEnd = await apiHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(apiHelper.initialBlogs.length)
  })

  test('fails with status 400 if url is missing', async () => {

    const token = await apiHelper.getNewUserToken(api)

    const newBlogNoUrl = {
      title: 'Zero Calcare',
      author: 'Calcare',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlogNoUrl)
      .expect(400)

    const blogsAtEnd = await apiHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(apiHelper.initialBlogs.length)
  })

  test('fails with status 401 if token is missing', async () => {

    const newBlogNoUrl = {
      title: 'Zero Calcare',
      author: 'Calcare',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlogNoUrl)
      .expect(401)

  })
})

describe('An existing blog', () => {
  let result
  let token

  beforeEach(async () => {
    token = await apiHelper.getNewUserToken(api)
    const newBlog = {
      title: 'Jest is nice but Cypress is better',
      author: 'Some dude',
      url: 'url.com',
      likes: 5
    }

    result = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
  })
  // Step 4.13
  test('can be deleted', async () => {

    const blogsAtStart = await apiHelper.blogsInDb()
    const blogToDelete = result.body

    await api
      .delete(`/api/blogs/${blogToDelete.id}/`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    // Validate the blog is removed
    const blogsAtEnd = await apiHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

  // Step 4.14
  test('can be updated', async () => {

    const blogsAtStart = await apiHelper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.title = 'Latest version of my blog'
    blogToUpdate.likes = 2

    await api
      .put(`/api/blogs/${blogToUpdate.id}/`)
      .set('Authorization', `bearer ${token}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await apiHelper.blogsInDb()
    const title = blogsAtEnd.map(blog => blog.title)
    expect(title).toContain('Latest version of my blog')
  })
})

// Step 4.16
describe('Creating a new user', () => {
  test('is successful with HTTP POST', async () => {
    const usersAtStart = await apiHelper.usersInDb()
    const newUser = {
      "username": "birch63",
      "name": "Antti",
      "password": "secret"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Validate length + 1
    const usersAtEnd = await apiHelper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    // Validate username added
    const username = usersAtEnd.map(user => user.username)
    expect(username).toContain(newUser.username)
  })

  test('fails when username is undefined', async () => {
    const newUser = {
      "name": "Antti",
      "password": "Secret"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('The username is missing')
  })

  test('fails when username is taken', async () => {
    const newUser = {
      "username": "birch63",
      "name": "Antti",
      "password": "secret"
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

  })

  test('fails when password is undefined', async () => {
    const newUser = {
      "username": "Birch64",
      "name": "Antti",
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('The password is missing')
  })
  test('fails when password is shorter than 3 chars', async () => {
    const newUser = {
      "username": "Birch64",
      "name": "Antti",
      "password": 'se'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('The password must have at least 3 characters')
  })

})

afterAll(() => {
  mongoose.connection.close()
})

