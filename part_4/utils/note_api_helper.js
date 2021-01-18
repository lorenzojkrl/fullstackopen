const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Everyone',
    url: 'HTML.com',
    likes: 20
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'mluukkai',
    url: 'luk.com',
    likes: 21
  },
  {
    likes: 11,
    title: "GitHub is Useful",
    author: "Lorenzo",
    url: "https://github.com/lorenzojkrl",
    id: "5ffd6930d385404afd9e2774"
  },
  {
    likes: 95,
    title: "Inrupt & Tim Berners-Lee",
    author: "Tim",
    url: "https://www.inrupt.com/",
    id: "5ffd6978d385404afd9e2775"
  }
]

const initialUsers = [
  {
    username: "MelindaG",
    name: "Melinda Gates",
    password: "Secret"
  },
  {
    username: "BillG",
    name: "Bill Gates",
    password: "Secret"
  },
  {
    username: "root",
    name: "root",
    password: "Secret"
  },

]
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  // return array of blog objects
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  // return array of blog objects
  return users.map(u => u.toJSON())
}

const getNewUserToken = async (api) => {
  const user = {
    name: 'testUser',
    username: 'testUser',
    password: 'testUser'
  }

  await api
    .post('/api/users')
    .send(user)

  const loginResponse = await api
    .post('/api/login')
    .send({
      username: user.username,
      password: user.password
    })

  return loginResponse.body.token
}

module.exports = {
  blogsInDb, usersInDb, initialBlogs, initialUsers, getNewUserToken
}