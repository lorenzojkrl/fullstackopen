import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog }) => {
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

    return (
      <Togglable buttonLabel='view' back='Close'>
        <div><strong>Url: </strong>{blog.url}</div>
        <div><strong>Likes: </strong>{blog.likes}
          <button onClick={() => updateLikes(blog)}>
            Like
          </button>
        </div>
        <div><strong>Author: </strong>{blog.author}</div>
      </Togglable>
    )
  }

  return (
    <div style={styles.blogContainer}>
      {blog.title} by {blog.author}
      {viewMoreBtn(blog)}
    </div>
  )
}

export default Blog
