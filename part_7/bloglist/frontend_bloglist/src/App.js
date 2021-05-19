import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, isSuccessful: true })



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    // Search for token in local storage
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Using async/await allows to get the outcome of the request 
  // before moving forward
  // e.g. login or show error message
  const handleLogin = async (userObject) => {
    try {
      // server response (inc. token & user details) is saved to user
      const user = await loginService.login(userObject)

      // Save token in local storage
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {
      setNotification({ message: 'Wrong credentials', isSuccessful: false })
      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)
    }
  }


  const addBlog = async (newBlog) => {

    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
      setNotification({ message: `A new blog: ${newBlog.title} by ${newBlog.author}`, isSuccessful: true })
      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)
    } catch (exception) {
      setNotification({ message: `Title and Url are necessary`, isSuccessful: false })
      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)
    }

  }

  //The useRef hook is used to create a blogFormRef ref, 
  // that is assigned to the Togglable component containing the creation blog form. 
  // The blogFormRef variable acts as a reference to the component. 
  // This hook ensures the same reference (ref) is kept throughout re-renders of the component. 

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef} id="new-blog">
      <BlogForm createBlog={addBlog} id="new-blog" />
    </Togglable>
  )

  const addLike = async (blogId) => {
    const blog = blogs.find(b => b.id === blogId)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(blogId, updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== blogId ? blog : returnedBlog))
    } catch (exception) {
      console.log('error_ :', exception)
    }
  }

  const removeBlog = async (blogId) => {
    const blogToRemove = blogs.find(b => b.id === blogId)
    console.log('blogToRemove', blogToRemove);

    if (window.confirm(`Delete ${blogToRemove.title} ?`)) {
      try {
        await blogService.remove(blogId)
        setBlogs(blogs.filter(b => b.id !== blogId))
        setNotification({ message: `${blogToRemove.title} has been deleted`, isSuccessful: true })
        setTimeout(() => {
          setNotification({ message: null })
        }, 5000)
      } catch (exception) {
        console.log('error_ :', exception)
        setNotification({ message: 'An error occured', isSuccessful: false })
        setTimeout(() => {
          setNotification({ message: null })
        }, 5000)
      }
    }

  }
  // Alternative to two return
  // { user === null && loginForm() }
  // { user !== null && noteForm() }

  if (user === null) {
    return (
      <>
        <Notification message={notification} />
        <LoginForm handleLogin={handleLogin} />
        <Footer />
      </>
    )
  }

  const cleanCredentials = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <div>
      <Notification message={notification} />
      <h2>Blogs</h2>
      <p>{user.name} logged-in</p>
      <button onClick={cleanCredentials}>log out</button>
      {blogForm()}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={() => addLike(blog.id)}
            removeBlog={() => removeBlog(blog.id)}
          />
        )}
      <Footer />
    </div>
  )
}

export default App