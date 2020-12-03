import React from 'react'
import Togglable from './Togglable'

const viewMoreBtn = (blog) => {
  return (
    <Togglable buttonLabel='view' back='Close'>
      <div><strong>Url: </strong>{blog.url}</div>
      <div><strong>Likes: </strong>{blog.likes}</div>
      <div><strong>Author: </strong>{blog.author}</div>
    </Togglable>
  )
}

const styles = {
  blogContainer: {
    // border: '1px solid black',
    margin: '15px'
  }
}

const Blog = ({ blog }) => (
  <div style={styles.blogContainer}>
    {blog.title} by {blog.author}
    {viewMoreBtn(blog)}
  </div>
)

export default Blog
