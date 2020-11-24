const Blog = require('../models/bloglist')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Hobbit',
        author: 'Tolkien',
        url: 'hobbit_bit.org',
        likes: 100,
        id: '5f9bb3c249c1f25756a6b0ea'
    },
    {
        title: 'Avenger',
        author: 'Tolkien Or Maybe Not',
        url: 'hobbit_bit.org',
        likes: 25,
        id: '5f9bc5a82da8fc6f0f6129ab'
    },
    {
        title: 'Mamma mia',
        author: 'Someone',
        url: 'mammamia.org',
        likes: 175,
        id: '5f9bc7049874f27139420c06'
    }
]

const nonExistingTitle = async () => {
    const blog = new Blog(
        {
            author: 'Zanardi',
            url: 'zanardi.com',
            likes: 45,
        }
    )

    return blog
}

const nonExistingUrl = async () => {
    const blog = new Blog(
        {
            title: 'Aalto University?',
            author: 'Aalto The Architect',
            likes: 45,
        }
    )
    return blog
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    // return array of objects blogs 
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

// Create new user, save it, log it in, get token
const getNewUserToken = async (api) => {
    const user = {
        name: 'fakeUser',
        username: 'fakeUser',
        password: 'fakeUser'
    }

    const saveUserResponse = await api
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
    initialBlogs,
    blogsInDb,
    nonExistingTitle,
    nonExistingUrl,
    usersInDb,
    getNewUserToken
}