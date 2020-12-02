import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Footer from './components/Footer'
import Notification from './components/Notification'
import loginService from './services/login'

const App = () => {
  const [newBlog, setNewBlog] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newBlog,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: blogs.length + 1,
    }

    blogService
      .create(noteObject)
      .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
        setNewBlog('')
      })
  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h2>Create New Blog</h2>
      <label>
        Title:
        <input
          name='title'
          value={newBlog}
          onChange={handleBlogChange}
        />
      </label>
      <label>
        Author:
        <input
          name='author'
          value={newBlog}
          onChange={handleBlogChange}
        />
      </label>
      <label>
        Url:
        <input
          name='url'
          value={newBlog}
          onChange={handleBlogChange}
        />
      </label>
      <button type="submit">Create</button>
    </form>
  )

  const logoutFunction = () => {
    // window.localStorage.removeItem('loggedBlogAppUser')
    window.localStorage.clear()
    setUser(null)
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />

      {
        user === null
          ? <div>
            <p>Log in</p>
            {loginForm()}
          </div>
          : <div>
            <p>{user.username} logged-in</p>
            <button onClick={logoutFunction}> log out</button>
            <h2>Blogs</h2>

            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
            {blogForm()}

          </div>
      }

      <Footer />
    </div>
  )
}

export default App