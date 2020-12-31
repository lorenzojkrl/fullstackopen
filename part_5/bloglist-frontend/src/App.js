import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Footer from './components/Footer'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LogInForm from './components/LogInForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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

  const logoutFunction = () => {
    // window.localStorage.removeItem('loggedBlogAppUser')
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login' >
        <LogInForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          setNotificationMsg={setNotificationMsg}
        />
      </Togglable>
    )
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const updateBlog = async (blog) => {
    let blogObject = {
      user: blog.id,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
    }
    try {
      await blogService
        .update(blogObject)
        .then(returnedBlog => {
          let originals = [...blogs]
          blogs.map((b, i) => {
            if (b.id === returnedBlog.id) {
              originals[i] = returnedBlog
            }
            return originals
          })
          setBlogs(originals)
        })
    } catch (e) {
      setNotificationMsg(`Error: ${e}`)
      setTimeout(() => {
        setNotificationMsg(null)
      }, 3000)
    }
  }

  const removeBlog = async (blogObject) => {
    try {
      await blogService
        .remove(blogObject)
      setBlogs(blogs.filter(it => it.id !== blogObject.user))
      setNotificationMsg(`Canceled: ${blogObject.title}`)
      setTimeout(() => {
        setNotificationMsg(null)
      }, 3000)
    } catch (e) {
      setNotificationMsg(`Something went wrong while deleting: ${blogObject.title}. Error: ${e}`)
      setTimeout(() => {
        setNotificationMsg(null)
      }, 3000)
      const originBlogs = await blogService.getAll()
      setBlogs(originBlogs)
    }
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm
          setNotificationMsg={setNotificationMsg}
          createBlogFunc={addBlog}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMsg} />
      {
        user === null
          ? loginForm()
          : <div>
            <p>
              {user.username} logged-in
              <button onClick={logoutFunction}>
                log out
              </button>
            </p>
            {blogForm()}
            <h2>Blogs</h2>
            {blogs
              .sort((a, b) => {
                return parseFloat(b.likes) - parseFloat(a.likes)
              })
              .map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={() => updateBlog(blog)}
                  removeBlog={removeBlog}
                />
              )}
          </div>
      }

      <Footer />
    </div>
  )
}

export default App