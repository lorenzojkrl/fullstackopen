import React, { useState } from 'react';
import blogService from '../services/blogs'


const BlogForm = ({ setBlogs, blogs, setNotificationMsg }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            date: new Date().toISOString(),
        }

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
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
    );
};

export default BlogForm;