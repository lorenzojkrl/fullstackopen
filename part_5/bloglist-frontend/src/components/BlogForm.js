import React, { useState } from 'react';

const BlogForm = ({ createBlogFunc, setNotificationMsg }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const styles = {
    blogFormContainer: {
      border: '1px solid black',
      margin: '10px',
      padding: '10px',

    }
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlogFunc({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      date: new Date().toISOString(),
    })

    setNotificationMsg(`A new blog: ${newTitle}`)
    setTimeout(() => {
      setNotificationMsg(null)
    }, 5000)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div style={styles.blogFormContainer}>
      <div>
        <h2>Create New Blog</h2>
        <form onSubmit={addBlog}>
          <label>
            Title:
                <input
              name='title'
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
          </label><br />
          <label>
            Author:
                <input
              name='author'
              value={newAuthor}
              onChange={e => setNewAuthor(e.target.value)}
            />
          </label><br />
          <label>
            Url:
                <input
              name='url'
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
            />
          </label> <br />
          <button type="submit">Create</button>
        </form>
      </div>

    </div>
  );
};

export default BlogForm;