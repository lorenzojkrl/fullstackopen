import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const [view, setView] = useState('View')

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))

  const blogStyle = {
    border: '1px solid black',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginBottom: 2,
  }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    view === 'View' ? setView('Hide') : setView('View')
  }

  return (
    <div style={blogStyle} className='noDetails'>
      {blog.title} by {blog.author}
      <button onClick={toggleVisibility} id='btn-view'>{view}</button>
      <div></div>
      <div style={showWhenVisible} className='details'>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={() => updateBlog(blog.id)}>like</button>
        </div>
        <div>{blog.author ?? `DON'T KNOW`}</div>

        {
          blog.user
            ? blog.user.username === loggedUser.username && <button onClick={removeBlog}>remove</button>
            : <></>
        }
      </div>

    </div>
  )
}

export default Blog
