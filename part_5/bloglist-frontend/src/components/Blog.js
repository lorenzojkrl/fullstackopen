import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const styles = {
    blogContainer: {
      // border: '1px solid black',
      margin: '15px'
    }
  }

  const viewMoreBtn = blog => {

    const updateLikes = (blog) => {
      updateBlog({
        user: blog.id,
        likes: blog.likes + 1,
        title: blog.title,
        author: blog.author,
        url: blog.url,
      })
    }

    const handleRemoveBlog = (blog) => {
      if (window.confirm(`Remove ${blog.title} ?`)) {
        removeBlog({
          user: blog.id,
          likes: blog.likes + 1,
          title: blog.title,
          author: blog.author,
          url: blog.url,
        })
      }

    }
    return (
      <Togglable buttonLabel='view' back='Close' className='blogDetails'>
        <div><strong>Url: </strong>{blog.url}</div>
        <div><strong>Likes: </strong>{blog.likes}
          <button onClick={() => updateLikes(blog)}>
            Like
          </button>
        </div>
        <div><strong>Author: </strong>{blog.author}</div>
        <button onClick={() => handleRemoveBlog(blog)} >Remove</button>
      </Togglable>
    )
  }

  return (
    <div style={styles.blogContainer} className='blogNoDetails'>
      {blog.title} by {blog.author}
      {viewMoreBtn(blog)}
    </div>
  )
}

export default Blog
