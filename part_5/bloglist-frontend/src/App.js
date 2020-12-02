import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Footer from './components/Footer'
import Notification from './components/Notification'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)
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
      setNotificationMsg('Wrong credentials')
      setTimeout(() => {
        setNotificationMsg(null)
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

  const logoutFunction = () => {
    // window.localStorage.removeItem('loggedBlogAppUser')
    window.localStorage.clear()
    setUser(null)
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMsg} />

      {
        user === null
          ? <div>
            <p>Log in</p>
            {loginForm()}
          </div>
          : <div>
            <p>{user.username} logged-in</p>
            <button onClick={logoutFunction}> log out</button>
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setNotificationMsg={setNotificationMsg}
            />
            <h2>Blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}


          </div>
      }

      <Footer />
    </div>
  )
}

export default App