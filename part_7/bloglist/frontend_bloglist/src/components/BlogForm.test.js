import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm>', () => {
    const createBlog = jest.fn()

    // mock function will mock the functionality of createBlog
    const component = render(<BlogForm createBlog={createBlog} />)

    test('create a new blog', () => {
        const inputTitle = component.container.querySelector('#title')
        const inputAuthor = component.container.querySelector('#author')
        const inputUrl = component.container.querySelector('#url')

        const form = component.container.querySelector('form')

        fireEvent.change(inputTitle, {
            target: { value: 'Jest Created A New Blog' }
        })
        fireEvent.change(inputAuthor, {
            target: { value: 'Jesti' }
        })
        fireEvent.change(inputUrl, {
            target: { value: 'https://www.jest.com' }
        })

        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('Jest Created A New Blog')
        expect(createBlog.mock.calls[0][0].author).toBe('Jesti')
        expect(createBlog.mock.calls[0][0].url).toBe('https://www.jest.com')

    })

})